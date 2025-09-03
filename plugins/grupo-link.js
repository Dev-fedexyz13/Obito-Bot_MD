let handler = async (m, { conn}) => {
  if (!m.isGroup) {
    return conn.reply(m.chat, `❌ 𝖤𝗌𝗍𝖾 𝖼𝗈𝗆𝖺𝗇𝖽𝗈 𝗌𝗈𝗅𝗈 𝗉𝗎𝖾𝖽𝖾 𝗎𝗌𝖺𝗋𝗌𝖾 𝖾𝗇 𝗀𝗋𝗎𝗉𝗈𝗌.`, m)
}

  try {
    const groupMetadata = await conn.groupMetadata(m.chat)
    const groupName = groupMetadata.subject

    let link = '🔒 *No tengo permisos para obtener el enlace del grupo.*'
    try {
      const inviteCode = await conn.groupInviteCode(m.chat)
      link = `🔗 *Enlace:* https://chat.whatsapp.com/${inviteCode}`
} catch (e) {
      // Silenciosamente ignora si no puede obtener el enlace
}

    const message = `*乂 𝖫𝖨𝖭𝖪 - 𝖣𝖤 𝖦𝖱𝖴𝖯𝖮乂*\n\n` +
      `📍 *Nombre:* ${groupName}\n` +
      `${link}\n\n` +
      `🧩 *𝖮𝖻𝗂𝗍𝗈-𝖡𝗈𝗍_𝖬𝖣 | 𝖣𝖾𝗏-𝖿𝖾𝖽𝖾𝗑𝗒𝗓`

    conn.reply(m.chat, message, m)
} catch (e) {
    conn.reply(m.chat, `⚠️ *No se pudo obtener la información del grupo.*`, m)
}
}

handler.help = ['link']
handler.tags = ['grupo']
handler.command = ['link']
handler.group = true

export default handler
