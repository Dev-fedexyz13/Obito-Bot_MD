let handler = async (m, { conn, text}) => {
  if (!text ||!text.endsWith('@g.us')) {
    return m.reply(
      `⚠️ *Formato incorrecto*\n\n` +
      `📌 Uso correcto:\n> *.delprimary 12345xxxxxx@g.us*\n\n` +
      `🧩 *𝖮𝖻𝗂𝗍𝗈-𝖡𝗈𝗍_𝖬𝖣*`
);
}

  const groupId = text.trim();

  try {
    const metadata = await conn.groupMetadata(groupId);
    const participants = metadata.participants;
    const userInGroup = participants.find(p => p.id === m.sender);

    if (!userInGroup) {
      return m.reply(`🚫 *No estás en el grupo:* ${groupId}`);
}

    const isAdmin = userInGroup.admin || userInGroup.role === 'admin' || userInGroup.role === 'superadmin';
    if (!isAdmin) {
      return m.reply(`🔒 *No tienes permisos de administrador en:* ${metadata.subject}`);
}

    if (!global.db.data.chats[groupId]) global.db.data.chats[groupId] = {};

    if (!global.db.data.chats[groupId].primaryBot) {
      return m.reply(`📭 *El grupo* ${metadata.subject} *no tiene un bot primario asignado.*`);
}

    delete global.db.data.chats[groupId].primaryBot;
    global.db.data.chats[groupId].allBots = true;

    m.reply(
      `✅ *Bot primario eliminado del grupo:*\n` +
      `📍 *${metadata.subject}*\n\n` +
      `🤖 Ahora todos los bots pueden responder libremente.\n\n` +
      `🧩 *𝖮𝖻𝗂𝗍𝗈-𝖡𝗈𝗍_𝖬𝖣*`
);
} catch (e) {
    console.error(e);
    m.reply(
      `❌ *No se pudo acceder al grupo.*\n` +
      `🔍 Verifica que el bot esté dentro del grupo y que el ID sea correcto.\n\n` +
      `📎 Ejemplo válido:\n> *.delprimary 120363xxxxxx@g.us*`
);
}
};

handler.help = ['delprimary <IDgrupox12345@g.us>'];
handler.tags = ['jadibot'];
handler.command = ['delprimary'];

export default handler;
