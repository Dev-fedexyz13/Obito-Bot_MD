// 🕷️ Código creado por 𝒇𝒆𝒅𝒆𝒙𝒚𝒛 🍁
// 𝖭𝗈 𝗊𝗎𝗂𝗍𝖾𝗌 𝗅𝗈𝗌 𝖼𝗋𝖾𝖽𝗂𝗍𝗈𝗌 🍂

const channelRD = '🌑 𝖦𝗋𝗎𝗉𝗈 𝖢𝗈𝗇𝗍𝗋𝗈𝗅𝖺𝖽𝗈𝗋'

const handler = async (m, { conn, isAdmin, isBotAdmin, command}) => {
  if (!m.isGroup)
    return m.reply('🚫 *𝖤𝗌𝗍𝖾 𝖼𝗈𝗆𝖺𝗇𝖽𝗈 𝗌𝗈𝗅𝗈 𝗉𝗎𝖾𝖽𝖾 𝗎𝗌𝖺𝗋𝗌𝖾 𝖾𝗇 𝗀𝗋𝗎𝗉𝗈𝗌.*')

  if (!isAdmin)
    return m.reply('🛡️ *𝖲𝗈𝗅𝗈 𝗅𝗈𝗌 𝖺𝖽𝗆𝗂𝗇𝗂𝗌𝗍𝗋𝖺𝖽𝗈𝗋𝖾𝗌 𝗉𝗎𝖾𝖽𝖾𝗇 𝖾𝗃𝖾𝖼𝗎𝗍𝖺𝗋 𝖾𝗌𝗍𝖾 𝖼𝗈𝗆𝖺𝗇𝖽𝗈.*')

  if (!isBotAdmin)
    return m.reply('🤖 *𝖭𝖾𝖼𝖾𝗌𝗂𝗍𝗈 𝗉𝖾𝗋𝗆𝗂𝗌𝗈𝗌 𝖽𝖾 𝖺𝖽𝗆𝗂𝗇 𝗉𝖺𝗋𝖺 𝗆𝗈𝖽𝗂𝖿𝗂𝖼𝖺𝗋 𝗅𝖺 𝖼𝗈𝗇𝖿𝗂𝗀𝗎𝗋𝖺𝖼𝗂𝗈́𝗇 𝖽𝖾𝗅 𝗀𝗋𝗎𝗉𝗈.*')

  const abrir = ['abrir', 'open'].includes(command)
  const cerrar = ['cerrar', 'close'].includes(command)

  if (abrir) {
    await conn.groupSettingUpdate(m.chat, 'not_announcement')
    return m.reply(`🔓 *${channelRD} ha sido abierto*\n💬 *Todos los miembros pueden enviar mensajes.*\n\n🌑 *𝖮𝖻𝗂𝗍𝗈-𝖡𝗈𝗍_𝖬𝖣 𝗅𝗂𝖻𝖾𝗋𝖺 𝗅𝖺 𝗏𝗈𝗓 𝖽𝖾𝗅 𝗀𝗋𝗎𝗉𝗈.*`)
}

  if (cerrar) {
    await conn.groupSettingUpdate(m.chat, 'announcement')
    return m.reply(`🔒 *${channelRD} ha sido cerrado*\n🕷️ *Solo los administradores pueden enviar mensajes.*\n\n🌑 *𝖮𝖻𝗂𝗍𝗈-𝖡𝗈𝗍_𝖬𝖣 𝗂𝗆𝗉𝗈𝗇𝖾 𝗌𝗎 𝖽𝗂𝗌𝖼𝗂𝗉𝗅𝗂𝗇𝖺.*`)
}

  m.reply('⚠️ *𝖢𝗈𝗆𝖺𝗇𝖽𝗈 𝗇𝗈 𝗋𝖾𝖼𝗈𝗇𝗈𝖼𝗂𝖽𝗈. 𝖴𝗌𝖺 ".abrir" 𝗈 ".cerrar" 𝗉𝖺𝗋𝖺 𝖼𝗈𝗇𝗍𝗋𝗈𝗅𝖺𝗋 𝖾𝗅 𝗀𝗋𝗎𝗉𝗈.*')
}

handler.command = ['abrir', 'cerrar', 'close', 'open']
handler.help = ['abrir', 'cerrar', 'close', 'open']
handler.tags = ['grupo']
handler.group = true
handler.botAdmin = true
handler.admin = true

export default handler
