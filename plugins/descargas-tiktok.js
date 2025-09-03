import fg from 'api-dylux';

const handler = async (m, { conn, text, args, usedPrefix, command}) => {
  try {
    if (!args[0]) {
      return conn.sendMessage(m.chat, {
        text: `˚🌑｡ *𝖣𝖾𝖻𝖾𝗌 𝗂𝗇𝗀𝗋𝖾𝗌𝖺𝗋 𝗎𝗇 𝖾𝗇𝗅𝖺𝖼𝖾 𝖽𝖾 𝖳𝗂𝗄𝖳𝗈𝗄.*\n\n📚 *𝖤𝗃𝖾𝗆𝗉𝗅𝗈:* ${usedPrefix + command} https://vm.tiktok.com/ZMreHF2dC/`
}, { quoted: m});
}

    if (!/(?:https:?\/{2})?(?:w{3}|vm|vt|t)?\.?tiktok\.com\/([^\s&]+)/gi.test(text)) {
      return conn.sendMessage(m.chat, {
        text: `❎ *𝖤𝗇𝗅𝖺𝖼𝖾 𝗂𝗇𝗏𝖺́𝗅𝗂𝖽𝗈 𝖽𝖾 𝖳𝗂𝗄𝖳𝗈𝗄.*`
}, { quoted: m});
}

    if (typeof m.react === 'function') m.react('⌛');

    const data = await fg.tiktok(args[0]);
    const { title, play, duration} = data.result;
    const { nickname} = data.result.author;

    const caption = `
*✦ 𝖮𝖻𝗂𝗍𝗈-𝖡𝗈𝗍_𝖬𝖣 — 𝖣𝖾𝗌𝖼𝖺𝗋𝗀𝖺 𝖽𝖾 𝖳𝗂𝗄𝖳𝗈𝗄 ✦*

⚔️ *𝖠𝗎𝗍𝗈𝗋:* ${nickname}
📝 *𝖳𝗂́𝗍𝗎𝗅𝗈:* ${title}
⏱️ *𝖣𝗎𝗋𝖺𝖼𝗂𝗈𝗇:* ${duration}
`.trim();

    await conn.sendMessage(m.chat, {
      video: { url: play},
      caption,
      footer: '✨ 𝖮𝖻𝗂𝗍𝗈-𝖡𝗈𝗍_𝖬𝖣',
      buttons: [
        { buttonId: '.menu', buttonText: { displayText: '˚🌑｡ 𝖬𝖤𝖭𝖴'}, type: 1}
      ],
      headerType: 1
}, { quoted: m});

    if (typeof m.react === 'function') m.react('✅');
} catch (e) {
    await m.react('⚠️');
    return conn.sendMessage(m.chat, {
      text: `🛑 *𝖤𝗋𝗋𝗈𝗋 𝖽𝖾 𝖾𝗑𝗍𝗋𝖺𝖼𝖼𝗂𝗈𝗇:* ${e.message}`
}, { quoted: m});
}
};

handler.help = ['tiktok'];
handler.tags = ['descargas'];
handler.command = ['tt', 'tiktok'];

export default handler;
