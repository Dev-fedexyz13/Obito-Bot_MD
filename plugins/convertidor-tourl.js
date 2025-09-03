// ✠ Código creado por Dev-Fedexyz13 
// No quites créditos, 

import { writeFile, unlink, readFile} from 'fs/promises'
import { join} from 'path'
import { fileTypeFromBuffer} from 'file-type'

let handler = async (m, { conn}) => {
  await conn.sendMessage(m.chat, { react: { text: '🌑', key: m.key}})

  try {
    const q = m.quoted? m.quoted: m
    const mime = (q.msg || q).mimetype || ''
    if (!mime) return m.reply('🌫️ *𝖮𝖻𝗂𝗍𝗈 necesita que respondas a un archivo o media para convertirlo.*')

    const media = await q.download()
    if (!media) return m.reply('🕸️ *No se pudo descargar el archivo. Reenvíalo, shinobi.*')

    const uploads = []

    const cloud1 = await uploaderCloudStack(media).catch(() => null)
    if (cloud1) uploads.push({ name: '☁️ CloudStack', url: cloud1})

    const cloud2 = await uploaderCloudGuru(media).catch(() => null)
    if (cloud2) uploads.push({ name: '🌀 CloudGuru', url: cloud2})

    const cloud3 = await uploaderCloudCom(media).catch(() => null)
    if (cloud3) uploads.push({ name: '🌐 CloudImages', url: cloud3})

    if (uploads.length === 0)
      throw '⛈️ *Ninguna nube aceptó tu archivo... El camino del ninja es duro.*'

    let texto = `⚔️ *Archivo subido con éxito por 𝖮𝖻𝗂𝗍𝗈-𝖡𝗈𝗍_𝖬𝖣*\n\n`
    for (const up of uploads) {
      texto += `🌑 *${up.name}*\n🔗 ${up.url}\n\n`
}

    await conn.sendMessage(m.chat, {
      text: texto.trim(),
      contextInfo: {
        externalAdReply: {
          title: '☁️ Uploader de 𝖮𝖻𝗂𝗍𝗈-𝖡𝗈𝗍_𝖬𝖣',
          body: '🌀 Tus archivos están protegidos por el Mangekyō',
          thumbnailUrl: 'https://files.cloudkuimages.guru/images/wn5uChxB.jpg',
          mediaType: 1,
          renderLargerThumbnail: true,
          sourceUrl: 'https://whatsapp.com/channel/0029VajUPbECxoB0cYovo60W'
}
}
}, { quoted: m})

} catch (e) {
    await conn.sendMessage(m.chat, {
      text: typeof e === 'string'
? e
: '💔 *Algo salió mal en la subida. El camino del Uchiha continúa...*',
      quoted: m
})
} finally {
    await conn.sendMessage(m.chat, { react: { text: '⚡', key: m.key}})
}
}

handler.help = ['tourl']
handler.tags = ['tools']
handler.command = ['tourl', 'url']
handler.limit = true
handler.register = true

export default handler

// ⚙️ Función para subir el buffer a la nube
async function uploadTo(url, buffer) {
  const { ext, mime} = await fileTypeFromBuffer(buffer) || {}
  if (!ext ||!mime) throw new Error('🔒 *𝖮𝖻𝗂𝗍𝗈 no reconoce el tipo de archivo...*')

  const tempPath = join('./tmp', `upload.${ext}`)
  await writeFile(tempPath, buffer)
  const fileData = await readFile(tempPath)

  const form = new FormData()
  form.append('file', new File([fileData], `upload.${ext}`, { type: mime}))

  try {
    const res = await fetch(url, { method: 'POST', body: form})
    const json = await res.json()
    await unlink(tempPath).catch(() => null)

    if (json?.status!== 'success' ||!json?.data?.url)
      throw new Error('☁️ *La nube se desvaneció... no se logró subir.*')

    return json.data.url
} catch (err) {
    console.error(`💥 Error en la nube (${url}):`, err)
    await unlink(tempPath).catch(() => null)
    return null
}
}

// 🌐 Servidores disponibles
const uploaderCloudStack = buffer =>
  uploadTo('https://phpstack-1487948-5667813.cloudwaysapps.com/upload.php', buffer)

const uploaderCloudGuru = buffer =>
  uploadTo('https://cloudkuimages.guru/upload.php', buffer)

const uploaderCloudCom = buffer =>
  uploadTo('https://cloudkuimages.com/upload.php', buffer)
