import { execSync} from 'child_process';

let handler = async (m, { conn, args}) => {
  try {
    const output = execSync('git pull' + (args.length? ' ' + args.join(' '): '')).toString();
    const now = new Date();
    const fecha = now.toLocaleDateString('es-ES', { day: '2-digit', month: '2-digit', year: 'numeric'});
    const hora = now.toLocaleTimeString('es-ES', { hour: '2-digit', minute: '2-digit'});

    const branch = execSync('git rev-parse --abbrev-ref HEAD').toString().trim();
    const lastCommit = execSync('git log -1 --pretty=format:"%h - %s"').toString();
    const emojis = ['✨', '🛠️', '🚀', '🔧', '📦', '🧩'];
    const emoji = emojis[Math.floor(Math.random() * emojis.length)];

    const response = output.includes('Already up to date')
? `${emoji} *Obito-Bot_MD ya está actualizado.*`
: `*${emoji} ACTUALIZACIÓN COMPLETADA*\n\n` +
        `🗓️ *Fecha:* ${fecha}\n🕒 *Hora:* ${hora}\n🌿 *Rama:* ${branch}\n📝 *Último commit:*\n> ${lastCommit}\n\n` +
        `\`\`\`\n${output}\n\`\`\``;

    await conn.sendMessage(m.chat, {
      text: response,
      image: { url: 'https://files.cloudkuimages.guru/images/wn5uChxB.jpg'}
}, { quoted: m});

} catch (error) {
    const errorMsg = `❌ *Error al actualizar:*\n${error.message || 'Error desconocido.'}`;
    await conn.sendMessage(m.chat, {
      text: errorMsg,
      image: { url: 'https://files.cloudkuimages.guru/images/wn5uChxB.jpg'}
}, { quoted: m});
}
};

handler.customPrefix = /^(fix|update|up)$/i;
handler.command = new RegExp;
handler.owner = true;
handler.register = true;

export default handler;
