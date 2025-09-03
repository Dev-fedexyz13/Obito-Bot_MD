let handler = async (m, { args, usedPrefix, command}) => {
  const target = m.mentionedJid?.[0] || m.chat;
  const username = target.split('@')[0];

  const steps = [
    `🟢 Iniciando hackeo a @${username}...`,
    '🔍 Escaneando redes sociales...',
    '💾 Descargando historial de chats comprometedores...',
    '📂 Buscando memes prohibidos en carpetas ocultas...',
    '🧠 Analizando patrones de comportamiento sospechosos...',
    '✅ Hackeo completado con éxito. ¡Demasiado fácil!'
  ];

  const message = steps.join('\n');
  m.reply(message, null, { mentions: [target]});
};

handler.command = ['hackear'];
export default handler;
