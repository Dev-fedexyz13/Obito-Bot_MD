const handler = async (m, { conn, participants}) => {
  const deco = '⌗ 🌑 ׄ';

  if (!m.mentionedJid[0] &&!m.quoted) {
    return conn.reply(m.chat, `
╭─❖「 ${deco} 𝖤𝗑𝗉𝗎𝗅𝗌𝗂𝗈́𝗇 𝖥𝖺𝗅𝗅𝗂𝖽𝖺 」❖─╮
│ ${deco} Debes *mencionar* o *responder* a un usuario.
│ ${deco} El vacío no puede ser expulsado.
╰───────────────────────────❖`, m);
}

  const user = m.mentionedJid[0] || m.quoted.sender;
  const groupInfo = await conn.groupMetadata(m.chat);
  const ownerGroup = groupInfo.owner || m.chat.split`-`[0] + '@s.whatsapp.net';
  const ownerBot = global.owner[0][0] + '@s.whatsapp.net';

  if (user === conn.user.jid) {
    return conn.reply(m.chat, `
╭─❖「 ${deco} 𝖤𝗋𝗋𝗈𝗋 」❖─╮
│ ${deco} No puedo expulsarme a mí mismo.
│ ${deco} La sombra no se destruye a sí misma.
╰───────────────────────────❖`, m);
}

  if (user === ownerGroup) {
    return conn.reply(m.chat, `
╭─❖「 ${deco} 𝖤𝗋𝗋𝗈𝗋 」❖─╮
│ ${deco} El líder del grupo es intocable.
│ ${deco} Su poder está por encima del juicio.
╰───────────────────────────❖`, m);
}

  if (user === ownerBot) {
    return conn.reply(m.chat, `
╭─❖「 ${deco} 𝖤𝗋𝗋𝗈𝗋 」❖─╮
│ ${deco} Es mi creador... no puedo tocarlo.
│ ${deco} La oscuridad responde solo ante él.
╰───────────────────────────❖`, m);
}

  await conn.groupParticipantsUpdate(m.chat, [user], 'remove');
  conn.reply(m.chat, `
╭─❖「 ${deco} 𝖤𝗑𝗉𝗎𝗅𝗌𝗂𝗈́𝗇 𝖤𝗃𝖾𝖼𝗎𝗍𝖺𝖽𝖺 」❖─╮
│ ${deco} El miembro ha sido *desterrado* del reino.
│ ${deco} 𝖮𝖻𝗂𝗍𝗈-𝖡𝗈𝗍_𝖬𝖣 ha ejecutado el juicio.
╰───────────────────────────❖`, m);
};

handler.help = ['kick'];
handler.tags = ['grupo'];
handler.command = ['kick', 'ban'];
handler.admin = true;
handler.group = true;
handler.register = true;
handler.botAdmin = true;

export default handler;
