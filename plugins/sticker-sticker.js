import moment from 'moment-timezone'
import { sticker} from '../lib/sticker.js'
import uploadFile from '../lib/uploadFile.js'
import uploadImage from '../lib/uploadImage.js'
import { webp2png} from '../lib/webp2mp4.js'

// Firma visual del sticker
global.packname = `✠ 𝖮𝖻𝗂𝗍𝗈-𝖡𝗈𝗍_𝖬𝖣 ⚔`
global.author = `
୨ৎ 📆 ${moment.tz('America/Los_Angeles').format('DD/MM/YY')}
୨ৎ ⏰ ${moment.tz('America/Los_Angeles').format('HH:mm:ss')}
© 𝖣𝖾𝗏-𝖿𝖾𝖽𝖾𝗑𝗒𝗓 | 𝖮𝖻𝗂𝗍𝗈-𝖡𝗈𝗍_𝖬𝖣
♾━━━━━━━━━━━━━━━━━━━━♾
♾━━━━━✦ 𝖮𝖻𝗂𝗍𝗈-𝖡𝗈𝗍_𝖬𝖣 ✦━━━━━♾`

const isUrl = (text) => /^https?:\/\/.*\.(jpe?g|gif|png|webp)$/i.test(text)

let handler = async (m, { conn, args}) => {
  let stiker = null
  const quoted = m.quoted || m
  const mime = (quoted.msg || quoted).mimetype || quoted.mediaType || ''
  const pack = global.packname
  const author = global.author

  try {
    if (/webp|image|video/.test(mime)) {
      if (/video/.test(mime) && ((quoted.msg || quoted).seconds> 8)) {
        return m.reply('⚠️ El video no puede durar más de *8 segundos*.')
}

      const media = await quoted.download()
      if (!media) return m.reply('❌ No se pudo descargar el archivo. Asegúrate de responder a una imagen, video o gif.')

      try {
        stiker = await sticker(media, false, pack, author)
} catch (e) {
        console.warn('[Obito-Bot_MD] Sticker directo falló, intentando alternativo...')
        let out
        if (/webp/.test(mime)) out = await webp2png(media)
        else if (/image/.test(mime)) out = await uploadImage(media)
        else if (/video/.test(mime)) out = await uploadFile(media)
        if (typeof out!== 'string') out = await uploadImage(media)
        stiker = await sticker(false, out, pack, author)
}

} else if (args[0]) {
      if (isUrl(args[0])) {
        stiker = await sticker(false, args[0], pack, author)
} else {
        return m.reply('❎ El enlace proporcionado no es válido. Asegúrate de que sea una imagen directa.')
}
} else {
      return m.reply('🌑 𝖮𝖻𝗂𝗍𝗈-𝖡𝗈𝗍_𝖬𝖣 » Envía o responde a una *imagen*, *video corto* o *gif*, o proporciona un enlace válido para convertir en sticker.')
}

    if (stiker) {
      await conn.sendFile(m.chat, stiker, 'sticker.webp', '', m)
      await m.react('✨')
} else {
      m.reply('❌ No se pudo crear el sticker. Intenta con otro archivo o revisa el formato.')
}

} catch (e) {
    console.error('[Obito-Bot_MD] Error al crear sticker:', e)
    m.reply('⚠️ Ocurrió un error inesperado al intentar generar el sticker.')
}
}

handler.help = ['sticker', 'stiker', 's'].map(v => v + ' <imagen|video|gif|url>')
handler.tags = ['sticker', 'media', 'fun']
handler.command = ['s', 'sticker', 'stiker']
handler.group = false
handler.register = true

export default handler
