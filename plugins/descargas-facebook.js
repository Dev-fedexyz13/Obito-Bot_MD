import { igdl} from 'ruhend-scraper';

const handler = async (m, { text, conn, args}) => {
  const rwait = '🕒';
  const done = '✅';
  const error = '⚠️';

  if (!args[0]) {
    return conn.reply(m.chat, '🚩 *𝖨𝗇𝗀𝗋𝖾𝗌𝖺 𝗎𝗇 𝖾𝗇𝗅𝖺𝖼𝖾 𝖽𝖾 𝖥𝖺𝖼𝖾𝖻𝗈𝗈𝗄 𝗉𝖺𝗋𝖺 𝖽𝖾𝗌𝖼𝖺𝗋𝗀𝖺.*', m);
}

  let res;
  try {
    await m.react(rwait);
    conn.reply(m.chat, '📥 *𝖤𝗇 𝗉𝗋𝗈𝗈𝗌𝖾𝗌𝗈 𝖽𝖾 𝖾𝗑𝗍𝗋𝖺𝖼𝖼𝗂𝗈𝗇 𝖽𝖾 𝗏𝗂𝖽𝖾𝗈...*', m);
    res = await igdl(args[0]);
} catch {
    await m.react(error);
    return conn.reply(m.chat, '*𝖤𝗋𝗋𝗈𝗋 𝖺𝗅 𝗈𝖻𝗍𝖾𝗇𝖾𝗋 𝗅𝗈𝗌 𝖽𝖺𝗍𝗈𝗌. 𝖵𝖾𝗋𝗂𝖿𝗂𝖼𝖺 𝖾𝗅 𝖾𝗇𝗅𝖺𝖼𝖾.*', m);
}

  const result = res.data;
  if (!result || result.length === 0) {
    return conn.reply(m.chat, '🚩 *𝖭𝗈 𝗌𝖾 𝖾𝗇𝖼𝗈𝗇𝗍𝗋𝖺𝗋𝗈𝗇 𝗋𝖾𝗌𝗎𝗅𝗍𝖺𝖽𝗈𝗌.*', m);
}

  let data;
  try {
    await m.react(rwait);
    data = result.find(i => i.resolution === "720p (HD)") || result.find(i => i.resolution === "360p (SD)");
} catch {
    await m.react(error);
    return conn.reply(m.chat, '🚩 *𝖤𝗋𝗋𝗈𝗋 𝖺𝗅 𝗉𝗋𝗈𝖼𝖾𝗌𝖺𝗋 𝗅𝗈𝗌 𝖽𝖺𝗍𝗈𝗌.*', m);
}

  if (!data) {
    return conn.reply(m.chat, '🚩 *𝖭𝗈 𝗌𝖾 𝖾𝗇𝖼𝗈𝗇𝗍𝗋𝗈́ 𝗎𝗇𝖺 𝗋𝖾𝗌𝗈𝗅𝗎𝖼𝗂𝗈𝗇 𝖺𝖽𝖾𝖼𝗎𝖺𝖽𝖺.*', m);
}

  const video = data.url;
  try {
    await m.react(rwait);
    await conn.sendMessage(
      m.chat,
      {
        video: { url: video},
        caption: `🎬 *𝖵𝗂𝖽𝖾𝗈 𝖽𝖾 𝖥𝖺𝖼𝖾𝖻𝗈𝗈𝗄 𝖾𝗑𝗍𝗋𝖺𝗂́𝖽𝗈 𝖼𝗈𝗇 𝖾́𝗑𝗂𝗍𝗈.*`,
        fileName: 'fb.mp4',
        mimetype: 'video/mp4',
        footer: '✨ 𝖮𝖻𝗂𝗍𝗈-𝖡𝗈𝗍_𝖬𝖣',
        buttons: [
          { buttonId: '.menu', buttonText: { displayText: '˚🌑｡ 𝖬𝖤𝖭𝖴'}, type: 1}
        ],
        headerType: 1
},
      { quoted: m}
);
    await m.react(done);
} catch {
    await m.react(error);
    return conn.reply(m.chat, '🚩 *𝖤𝗋𝗋𝗈𝗋 𝖺𝗅 𝖾𝗇𝗏𝗂𝖺𝗋 𝖾𝗅 𝗏𝗂𝖽𝖾𝗈.*', m);
}
};

handler.help = ['facebook', 'fb'];
handler.tags = ['descargas'];
handler.command = ['facebook', 'fb'];
handler.cookies = 1;
handler.register = true;

export default handler;
