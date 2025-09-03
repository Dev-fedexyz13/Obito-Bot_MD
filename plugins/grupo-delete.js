let handler = async (m, { conn}) => {
  if (!m.quoted) {
    return conn.reply(m.chat, `⚠️ 𝖯𝗈𝗋 𝖿𝖺𝗏𝗈𝗋, 𝖼𝗂𝗍𝖺 𝗎𝗇 𝗆𝖾𝗇𝗌𝖺𝗃𝖾 𝗉𝖺𝗋𝖺 𝖾𝗅𝗂𝗆𝗂𝗇𝖺𝗋𝗅𝗈.\n📌 𝖤𝗃𝖾𝗆𝗉𝗅𝗈: *responde al mensaje y usa.del*`, m);
}

  try {
    const { participant, stanzaId} = m.message?.extendedTextMessage?.contextInfo || {};
    if (participant && stanzaId) {
      await conn.sendMessage(m.chat, {
        delete: {
          remoteJid: m.chat,
          fromMe: false,
          id: stanzaId,
          participant: participant
}
});
} else {
      await conn.sendMessage(m.chat, {
        delete: m.quoted?.vM?.key || m.quoted?.key
});
}

    // Confirmación de éxito
    await conn.reply(m.chat, `✅ 𝖬𝖾𝗇𝗌𝖺𝗃𝖾 𝖾𝗅𝗂𝗆𝗂𝗇𝖺𝖽𝗈 𝖼𝗈𝗇 𝖾𝗑𝗂𝗍𝗈.`, m);

} catch (err) {
    conn.reply(m.chat, `❌ 𝖤𝗋𝗋𝗈𝗋 𝖺𝗅 𝖾𝗅𝗂𝗆𝗂𝗇𝖺𝗋:\n${err.message}`, m);
}
};

handler.help = ['del', 'delete'];
handler.tags = ['grupo'];
handler.command = ['del', 'delete'];
handler.group = false;
handler.admin = true;
handler.botAdmin = true;

export default handler;

