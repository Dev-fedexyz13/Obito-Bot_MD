import { createHash} from 'crypto'
import fetch from 'node-fetch'

const handler = async (m, { conn, usedPrefix, command, args, isOwner, isAdmin, isROwner}) => {
  const chat = global.db.data.chats[m.chat]
  const bot = global.db.data.settings[conn.user.jid] || {}
  const type = command.toLowerCase()
  let isEnable = chat[type] || false
  let isGlobal = false

  // Activar / Desactivar
  if (args[0] === 'on' || args[0] === 'enable') {
    isEnable = true
} else if (args[0] === 'off' || args[0] === 'disable') {
    isEnable = false
} else {
    const estado = isEnable? '✓ 𝖠𝖼𝗍𝗂𝗏𝖺𝖽𝗈': '✗ 𝖣𝖾𝗌𝖺𝖼𝗍𝗂𝗏𝖺𝖽𝗈'
    return conn.reply(m.chat, `╭─「 𝖮𝖻𝗂𝗍𝗈-𝖡𝗈𝗍_𝖬𝖣 」\n│ ˚🌑｡ Un admin puede usar:\n│ ➤ *${usedPrefix}${command} on*\n│ ➤ *${usedPrefix}${command} off*\n│\n│ ✧ Estado actual: *${estado}*\n╰───────────────`, m)
}

  // Validación por comando
  switch (type) {
    case 'welcome':
      if (!m.isGroup ||!isAdmin) return global.dfail(m.isGroup? 'admin': 'group', m, conn)
      chat.welcome = isEnable
      break

    case 'antiprivado':
      if (!isOwner) return global.dfail('rowner', m, conn)
      bot.antiPrivate = isEnable
      isGlobal = true
      break

    case 'antibot':
      if (!m.isGroup ||!(isAdmin || isOwner)) return global.dfail(m.isGroup? 'admin': 'group', m, conn)
      chat.antiBot = isEnable
      break

    case 'modoadmin':
      if (!m.isGroup ||!(isAdmin || isOwner)) return global.dfail(m.isGroup? 'admin': 'group', m, conn)
      chat.modoadmin = isEnable
      break

    case 'reaccion':
    case 'reaction':
      if (!m.isGroup ||!isAdmin) return global.dfail(m.isGroup? 'admin': 'group', m, conn)
      chat.reaction = isEnable
      break

    case 'antilink':
      if (!m.isGroup ||!(isAdmin || isOwner)) return global.dfail(m.isGroup? 'admin': 'group', m, conn)
      chat.antiLink = isEnable
      break

    case 'antispam':
      if (!m.isGroup ||!(isAdmin || isOwner)) return global.dfail(m.isGroup? 'admin': 'group', m, conn)
      chat.antispam = isEnable
      break

    case 'restrict':
    case 'restringir':
      if (!isOwner) return global.dfail('rowner', m, conn)
      bot.restrict = isEnable
      isGlobal = true
      break

    default:
      return conn.reply(m.chat, `✘ 𝖢𝗈𝗆𝖺𝗇𝖽𝗈 *${type}* 𝗇𝗈 𝖾𝗌 𝗏𝖺́𝗅𝗂𝖽𝗈 𝗉𝖺𝗋𝖺 𝖾𝗌𝗍𝖾 𝗆𝖾𝗇𝗎`, m)
}

  conn.reply(m.chat, `╭─「 𝖮𝖻𝗂𝗍𝗈-𝖡𝗈𝗍_𝖬𝖣 」\n│ ˚🌑｡ Función: *${type}*\n│ ✧ Estado: *${isEnable? '𝖠𝖼𝗍𝗂𝗏𝖺𝖽𝗈': '𝖣𝖾𝗌𝖺𝖼𝗍𝗂𝗏𝖺𝖽𝗈'}*\n│ ✐ Aplicado ${isGlobal? 'al Bot completo': 'al chat actual'}\n╰───────────────`, m)
}

handler.help = ['welcome', 'antiprivado', 'antibot', 'modoadmin', 'reaccion', 'antilink', 'antispam', 'restringir']
handler.tags = ['nable']
handler.command = ['welcome', 'antiprivado', 'antibot', 'modoadmin', 'reaccion', 'reaction', 'antilink', 'antispam', 'restrict', 'restringir']

export default handler
