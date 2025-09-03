import { generateWAMessageFromContent} from '@whiskeysockets/baileys'

let handler = async (m, { conn, text, participants}) => {
  if (!m.quoted &&!text) {
    return conn.reply(m.chat, `˚🌑｡ 𝖣𝖾𝖻𝖾𝗌 𝖾𝗇𝗏𝗂𝖺𝗋 𝗎𝗇 𝗍𝖾𝗑𝗍𝗈 𝗉𝖺𝗋𝖺 𝗁𝖺𝖼𝖾𝗋 𝗎𝗇 𝗍𝖺𝗀.`, m)
}

  const users = participants.map(u => conn.decodeJid(u.id))
  const quoted = m.quoted || m
  const mime = (quoted.msg || quoted)?.mimetype || ''
  const isMedia = /image|video|sticker|audio/.test(mime)
  const invisible = String.fromCharCode(8206).repeat(850)
  const mensaje = text || '*¡¡¡𝖧𝗈𝗅𝖺!!!*'

  try {
    if (isMedia) {
      const media = await quoted.download?.()
      const options = { mentions: users, quoted: null}

      if (quoted.mtype === 'imageMessage') {
        return conn.sendMessage(m.chat, { image: media, caption: mensaje,...options})
}
      if (quoted.mtype === 'videoMessage') {
        return conn.sendMessage(m.chat, { video: media, caption: mensaje, mimetype: 'video/mp4',...options})
}
      if (quoted.mtype === 'audioMessage') {
        return conn.sendMessage(m.chat, { audio: media, mimetype: 'audio/mp4', fileName: '𝖧𝗂𝖽𝖾𝗍𝖺𝗀.mp3',...options})
}
      if (quoted.mtype === 'stickerMessage') {
        return conn.sendMessage(m.chat, { sticker: media,...options})
}
}

    // Si no es media, enviar texto oculto
    await conn.relayMessage(m.chat, {
      extendedTextMessage: {
        text: `${invisible}\n${mensaje}`,
        contextInfo: { mentionedJid: users}
}
}, {})
} catch (e) {
    conn.reply(m.chat, `❌ 𝖤𝗋𝗋𝗈𝗋 𝖺𝗅 𝖾𝗇𝗏𝗂𝖺𝗋 𝗍𝖺𝗀:\n${e.message}`, m)
}
}

handler.help = ['hidetag']
handler.tags = ['grupo']
handler.command = ['hidetag', 'tag']
handler.group = true
handler.admin = true

export default handler
