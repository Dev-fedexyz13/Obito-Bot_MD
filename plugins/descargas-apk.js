import { search, download} from 'aptoide-scraper';

const handler = async (m, { conn, text}) => {
  if (!text) {
    return conn.reply(m.chat, '🚩 *𝖨𝗇𝗀𝗋𝖾𝗌𝖺 𝗅𝖾 𝗇𝗈𝗆𝖻𝗋𝖾 𝖽𝖾 𝗅𝖺 𝖠𝖯𝖪 𝗊𝗎𝖾 𝖽𝖾𝗌𝖾𝖺𝗌 𝖻𝗎𝗌𝖼𝖺𝗋.*', m);
}

  try {
    await m.react('⏳');
    conn.reply(m.chat, '📦 *𝖤𝗇 𝗉𝗋𝗈𝗈𝗌𝖾𝗌𝗈 𝖽𝖾 𝖽𝖾𝗌𝖼𝖺𝗋𝗀𝖺...*', m);

    const searchResults = await search(text);
    const apkData = await download(searchResults[0].id);

    const info = `
*乂 𝖠𝖯𝖳𝖮𝖨𝖣𝖤 - 𝖣𝖤𝖲𝖢𝖠𝖱𝖦𝖠𝖲 乂*

🍟 *𝖭𝗈𝗆𝖻𝗋𝖾*: ${apkData.name}
🚩 *𝖯𝖺𝖼𝗄𝖺𝗀𝖾*: ${apkData.package}
🪴 *𝖴𝗅𝗍𝗂𝗆𝖺 𝖠𝖼𝗍𝗎𝖺𝗅𝗂𝗓𝖺𝖼𝗂𝗈𝗇*: ${apkData.lastup}
⚖ *𝖯𝖾𝗌𝗈*: ${apkData.size}
`.trim();

    await conn.sendFile(m.chat, apkData.icon, 'thumbnail.jpg', info, m);
    await m.react('✅');

    if (apkData.size.includes('GB') || parseFloat(apkData.size.replace(' MB', ''))> 999) {
      return conn.reply(m.chat, '🛑 *𝖤𝗅 𝖺𝗋𝖼𝗁𝗂𝗏𝗈 𝖾𝗌 𝗆𝗎𝗒 𝗉𝖾𝗌𝖺𝖽𝗈 𝗉𝖺𝗋𝖺 𝖾𝗇𝗏𝗂𝖺𝗋.*', m);
}

    await conn.sendMessage(m.chat, {
      document: { url: apkData.dllink},
      mimetype: 'application/vnd.android.package-archive',
      fileName: `${apkData.name}.apk`,
      caption: `📥 *𝖣𝖾𝗌𝖼𝖺𝗋𝗀𝖺 𝖼𝗈𝗆𝗉𝗅𝖾𝗍𝖺 𝖽𝖾 ${apkData.name}*`,
      footer: '✨ 𝖮𝖻𝗂𝗍𝗈-𝖡𝗈𝗍_𝖬𝖣',
      buttons: [
        { buttonId: '.menu', buttonText: { displayText: '˚🌑｡ 𝖬𝖤𝖭𝖴'}, type: 1}
      ],
      headerType: 1
}, { quoted: m});

} catch {
    return conn.reply(m.chat, '🛑 *𝖮𝖼𝗎𝗋𝗋𝗂𝗈́ 𝗎𝗇 𝖿𝖺𝗅𝗅𝗈 𝖾𝗇 𝗅𝖺 𝖻𝗎𝗌𝗊𝗎𝖾𝖽𝖺.*', m);
}
};

handler.tags = ['descargas'];
handler.help = ['apk'];
handler.command = ['apk', 'modapk'];
handler.register = true;
handler.estrellas = 1;

export default handler;
