import axios from 'axios'
import FormData from 'form-data'

// Función para traducir texto automáticamente al inglés (requerido por la API)
async function traducirAlIngles(texto) {
    try {
        const url = "https://translate.googleapis.com/translate_a/single"
        const params = {
            client: "gtx",
            sl: "auto", // idioma detectado automáticamente
            tl: "en",   // traducir al inglés
            dt: "t",
            q: texto,
        }
        const res = await axios.get(url, { params })
        return res.data[0][0][0]
    } catch (err) {
        return texto
    }
}

// Generar imagen desde texto
async function creartTextoAImagen(prompt) {
    try {
        const promptTraducido = await traducirAlIngles(prompt)
        const form = new FormData()
        form.append("prompt", promptTraducido)
        form.append("input_image_type", "text2image")
        form.append("aspect_ratio", "4x5")
        form.append("guidance_scale", "9.5")
        form.append("controlnet_conditioning_scale", "0.5")
        
        const response = await axios.post(
            "https://api.creartai.com/api/v2/text2image",
            form,
            {
                headers: form.getHeaders(),
                responseType: "arraybuffer",
            }
        )
        return Buffer.from(response.data)
    } catch (err) {
        throw new Error(err?.message || err)
    }
}

// Generar imagen desde otra imagen + texto
async function creartImagenAImagen(prompt, bufferImagen) {
    try {
        const promptTraducido = await traducirAlIngles(prompt)
        const form = new FormData()
        form.append("prompt", promptTraducido)
        form.append("input_image_type", "image2image")
        form.append("aspect_ratio", "4x5")
        form.append("guidance_scale", "9.5")
        form.append("controlnet_conditioning_scale", "0.5")
        form.append("image_file", bufferImagen, "imagen.png")
        
        const response = await axios.post(
            "https://api.creartai.com/api/v2/image2image",
            form,
            {
                headers: form.getHeaders(),
                responseType: "arraybuffer",
            }
        )
        return Buffer.from(response.data)
    } catch (err) {
        throw new Error(err?.message || err)
    }
}

// Handler de comandos
let handler = async (m, { conn, command, args }) => {
    try {
        const prompt = args.join(' ')
        if (!prompt) return m.reply(`Ejemplo: .creart Paisaje del Volcán de Fuego`)

        switch (command.toLowerCase()) {
            case 'creart':
                m.reply('🎨 Generando imagen, espera un momento...')
                const bufferTexto = await creartTextoAImagen(prompt)
                await conn.sendMessage(m.chat, {
                    image: bufferTexto,
                }, { quoted: m })
                break

            case 'img2img':
                const q = m.quoted ? m.quoted : m
                const mime = (q.msg || q).mimetype || ''
                if (!mime.startsWith('image/')) return m.reply('⚠️ Debes responder a una imagen')
                
                m.reply('🎨 Generando nueva imagen a partir de la original...')
                const bufferImagen = await q.download()
                const bufferResultado = await creartImagenAImagen(prompt, bufferImagen)
                await conn.sendMessage(m.chat, {
                    image: bufferResultado,
                }, { quoted: m })
                break
        }
    } catch (e) {
        m.reply(`⚠️ Error: ${e.message}`)
    }
}

handler.help = ['crearimg', 'imagia']
handler.command = ['crearimg', 'imagia']
handler.tags = ['ia']

export default handler
