export async function before(m) {
  if (!m.text ||!global.prefix.test(m.text)) return;

  const usedPrefix = global.prefix.exec(m.text)[0];
  const command = m.text.slice(usedPrefix.length).trim().split(' ')[0].toLowerCase();

  if (!command || command === 'bot') return;

  const isValidCommand = (cmd, plugins) => {
    return Object.values(plugins).some(plugin => {
      const cmds = Array.isArray(plugin.command)? plugin.command: [plugin.command];
      return cmds.includes(cmd);
});
};

  if (isValidCommand(command, global.plugins)) {
    const chat = global.db.data.chats[m.chat];
    const user = global.db.data.users[m.sender];

    if (chat?.isBanned) {
      const aviso = `˚🌑｡ El bot *𝖮𝖻𝗂𝗍𝗈-𝖡𝗈𝗍_𝖬𝖣* está desactivado en este grupo.\n\n✦ Un *𝖺𝖽𝗆𝗂𝗇𝗂𝗌𝗍𝗋𝖺𝖽𝗈𝗋* puede activarlo con:\n» *${usedPrefix}bot on*`;
      await m.reply(aviso);
      return;
}

    user.commands = (user.commands || 0) + 1;
} else {
    const comando = m.text.trim().split(' ')[0];
    await m.reply(`˚🌑｡ El comando *${comando}* no existe.\nPara ver la lista de comandos usa:\n» *${usedPrefix}help*\n\n*𝖢𝗋𝖾𝖺𝖽𝗈 𝗉𝗈𝗋 𝖿𝖾𝖽𝖾𝗑𝗒𝗓*`);
}
}
