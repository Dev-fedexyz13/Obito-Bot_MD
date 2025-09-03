import fs from 'fs';
import path from 'path';

let handler = async (m, { text, mentionedJid}) => {
  const number = (mentionedJid?.[0]?.replace('@s.whatsapp.net', '')) || text?.replace(/[^0-9]/g, '');

  if (!number) {
    return m.reply(`⚠️ 𝖣𝖾𝖻𝖾𝗌 𝖾𝗍𝗂𝗊𝗎𝖾𝗍𝖺𝗋 𝗈 𝖾𝗌𝖼𝗋𝗂𝖻𝗂𝗋 𝖾𝗅 𝗇𝗎́𝗆𝖾𝗋𝗈 𝖽𝖾𝗅 𝖻𝗈𝗍 𝗊𝗎𝖾 𝗊𝗎𝗂𝖾𝗋𝖾𝗌 𝗌𝖾𝗍𝖾𝖺𝗋 𝖼𝗈𝗆𝗈 𝗉𝗋𝗂𝗇𝖼𝗂𝗉𝖺𝗅.`, m);
}

  const botJid = number + '@s.whatsapp.net';
  const isMainBot = global.conn.user?.jid === botJid;
  const subbotPath = path.join('./JadiBots', number, 'creds.json');
  const isSubbot = fs.existsSync(subbotPath);

  if (!isSubbot &&!isMainBot) {
    return m.reply(`❌ 𝖤𝗅 𝗇𝗎́𝗆𝖾𝗋𝗈 *${number}* 𝗇𝗈 𝖼𝗈𝗋𝗋𝖾𝗌𝗉𝗈𝗇𝖽𝖾 𝖺 𝗇𝗂𝗇𝗀𝗎𝗇 𝖻𝗈𝗍 𝗏𝖺́𝗅𝗂𝖽𝗈.`, m);
}

  const isConnected = isMainBot || global.conns.some(conn => conn.user?.jid === botJid);
  if (!isConnected) {
    return m.reply(`📡 𝖤𝗅 𝖻𝗈𝗍 *${botJid}* 𝗇𝗈 𝖾𝗌𝗍𝖺́ 𝖼𝗈𝗇𝖾𝖼𝗍𝖺𝖽𝗈 𝖺𝗅 𝗌𝗂𝗌𝗍𝖾𝗆𝖺.`, m);
}

  if (!global.db.data.chats[m.chat]) global.db.data.chats[m.chat] = {};
  global.db.data.chats[m.chat].primaryBot = botJid;

  if (global.db.write) await global.db.write();

  m.reply(`✅ *𝖡𝗈𝗍 𝗉𝗋𝗂𝗇𝖼𝗂𝗉𝖺𝗅 𝖺𝗌𝗂𝗀𝗇𝖺𝖽𝗈 𝖾𝗑𝗂𝗍𝗈𝗌𝖺𝗆𝖾𝗇𝗍𝖾*\n\n📍 *Grupo:* ${m.chat}\n🤖 *Bot principal:* ${botJid}\n\n🧩 *𝖮𝖻𝗂𝗍𝗈-𝖡𝗈𝗍_𝖬𝖣*`);
};

handler.help = ['setprimary @bot'];
handler.tags = ['jadibot'];
handler.command = ['setprimary'];
handler.admin = true;

export default handler;
