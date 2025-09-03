import { igdl} from 'ruhend-scraper';

let handler = async (m, { args, conn}) => {
  const rwait = '🕒';
  const done = '✅';
  const error = '⚠️';

  if (!args[0]) {
    return conn.reply(m.chat, '🚩 *𝖨𝗇𝗀𝗋𝖾𝗌𝖺 𝗎𝗇 𝗅𝗂𝗇𝗄 𝖽𝖾 𝖨𝗇𝗌𝗍𝖺𝗀𝗋𝖺𝗆 𝗉𝖺𝗋𝖺 𝖽𝖾𝗌𝖼𝖺𝗋𝗀𝖺𝗋.*', m);
}

  try {
    await m.react(rwait);

    conn.reply(m.chat, '📥 *𝖤𝗇 𝗉𝗋𝗈𝗈𝗌𝖾𝗌𝗈 𝖽𝖾 𝖾𝗑𝗍𝗋𝖺𝖼𝖼𝗂𝗈𝗇 𝖽𝖾 𝗆𝖾𝖽𝗂𝖺...*', m, {
      contextInfo: {
        externalAdReply: {
          mediaUrl: null,
          mediaType: 1,
          showAdAttribution: true,
          title: '✦ 𝖮𝖻𝗂𝗍𝗈-𝖡𝗈𝗍_𝖬𝖣 ✦',
          body: '𝖣𝖾𝗌𝖼𝖺𝗋𝗀𝖺 𝖽𝖾 𝖨𝗀 𝖾𝗇 𝖾𝗌𝗍𝗂𝗅𝗈 𝖭𝗂𝗇𝗃𝖺',
          previewType: 0,
          thumbnail: null,
          sourceUrl: null
}
}
});

    const res = await igdl(args[0]);
    const data = res.data;

    if (!data || data.length === 0) throw new Error('𝖭𝗈 𝗌𝖾 𝖾𝗇𝖼𝗈𝗇𝗍𝗋𝖺𝗋𝗈𝗇 𝗆𝖾𝖽𝗂𝗈𝗌 𝗏𝖺𝗅𝗂𝖽𝗈𝗌.');

    const media = data.sort((a, b) => {
      const resA = parseInt(a.resolution) || 0;
      const resB = parseInt(b.resolution) || 0;
      return resB - resA;
})[0];

    if (!media) throw new Error('𝖭𝗈 𝗌𝖾 𝖾𝗇𝖼𝗈𝗇𝗍𝗋𝗈́ 𝗎𝗇 𝗏𝗂𝖽𝖾𝗈 𝖺𝖽𝖾𝖼𝗎𝖺𝖽𝗈.');

    await conn.sendMessage(
      m.chat,
      {
        video: { url: media.url},
        caption: `🎬 *𝖵𝗂𝖽𝖾𝗈 𝖽𝖾 𝖨𝗇𝗌𝗍𝖺𝗀𝗋𝖺𝗆 𝖾𝗑𝗍𝗋𝖺𝗂́𝖽𝗈 𝖼𝗈𝗇 𝖾́𝗑𝗂𝗍𝗈.*`
},
      { quoted: m}
);

    await m.react(done);

} catch (err) {
    console.error(err);
    await m.react(error);
    return conn.reply(m.chat, `🛑 *𝖤𝗋𝗋𝗈𝗋 𝖽𝖾 𝖾𝗑𝗍𝗋𝖺𝖼𝖼𝗂𝗈𝗇: ${err.message}*`, m);
}
};

handler.command = ['instagram', 'ig'];
handler.tags = ['descargas'];
handler.help = ['instagram', 'ig'];
handler.register = true;

export default handler;
