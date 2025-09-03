// código creado por Dev-fedexyz13 
let handler = async (m, { conn}) => {
  const start = Date.now();
  const uptime = process.uptime() * 1000; // en milisegundos
  const latency = Date.now() - start;

  const formatTime = (ms) => {
    let h = Math.floor(ms / 3600000);
    let m = Math.floor(ms % 3600000 / 60000);
    let s = Math.floor(ms % 60000 / 1000);
    return `${h}h ${m}m ${s}s`;
};

  const response = `*乂 𝖨𝖭𝖥𝖮 - 𝖯𝖨𝖭𝖦 乂*\n\n` +
    `📡 *𝖫𝖺𝗍𝖾𝗇𝖼𝗂𝖺:* ${latency} ms\n` +
    `⏱️ *𝖳𝗂𝖾𝗆𝗉𝗈 𝖺𝖼𝗍𝗂𝗏𝗈:* ${formatTime(uptime)}\n` +
    `🤖 *𝖡𝗈𝗍:* 𝖮𝖻𝗂𝗍𝗈-𝖡𝗈𝗍_𝖬𝖣\n` +
    `📅 *𝖥𝖾𝖼𝗁𝖺:* ${new Date().toLocaleDateString('es-ES')}\n` +
    `🕒 *𝖧𝗈𝗋𝖺:* ${new Date().toLocaleTimeString('es-ES')}`;

  m.reply(response);
};

handler.help = ['ping', 'p'];
handler.tags = ['info'];
handler.command = ['ping', 'p'];

export default handler;
