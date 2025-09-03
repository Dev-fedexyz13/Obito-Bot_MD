const handler = async (m, { isOwner, isAdmin, conn, text, participants, args, command, usedPrefix}) => {
  if (usedPrefix.toLowerCase() === 'a') return;

  const customEmoji = global.db.data.chats[m.chat]?.customEmoji || '˚🌑｡';
  await m.react(customEmoji);

  if (!(isAdmin || isOwner)) {
    global.dfail('admin', m, conn);
    throw false;
}

  const mensaje = args.join` `;
  const info = mensaje? `*» 𝖨𝖭𝖥𝖮:* ${mensaje}`: '*» 𝖬𝖤𝖭𝖲𝖠𝖩𝖤: *';

  let texto = `
╭─❖ 𝖮𝖻𝗂𝗍𝗈-𝖡𝗈𝗍_𝖬𝖣 ❖─╮
🗣️ *𝖬𝖤𝖭𝖢𝖨𝖮𝖭 𝖦𝖤𝖭𝖤𝖱𝖠𝖫:* ${participants.length}
${info}
╰─╼────────────╾─╯

`;

  for (const user of participants) {
    texto += `┊${customEmoji} @${user.id.split('@')[0]}\n`;
}

  texto += `\n╰─⸼ ˚🌑｡ *𝖮𝖻𝗂𝗍𝗈-𝖡𝗈𝗍_𝖬𝖣* ˚🌑｡`;

  await conn.sendMessage(m.chat, {
    text: texto,
    mentions: participants.map(p => p.id)
});
};

handler.help = ['todos *<mensaje opcional>*'];
handler.tags = ['group'];
handler.command = ['todos', 'invocar', 'tagall'];
handler.admin = true;
handler.group = true;

export default handler;
