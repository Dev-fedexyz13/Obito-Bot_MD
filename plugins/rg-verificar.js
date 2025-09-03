import db from '../lib/database.js';
import { createHash} from 'crypto';
import fetch from 'node-fetch';

const formato = /\|?(.*)([.|] *?)([0-9]*)$/i;

let handler = async function (m, { conn, text, usedPrefix, command}) {
  const user = global.db.data.users[m.sender];
  const nombreUsuario = conn.getName(m.sender);
  const avatar = await conn.profilePictureUrl(m.sender, 'image').catch(() => 'https://files.catbox.moe/r4w38m.jpg');

  if (user.registered) {
    return m.reply(`˚🌑｡ 𝖸𝖺 𝖾𝗌𝗍𝖺́𝗌 𝗋𝖾𝗀𝗂𝗌𝗍𝗋𝖺𝖽𝗈.\n𝗌𝗂 𝗊𝗎𝗂𝖾𝗋𝖾𝗌 𝗋𝖾𝗂𝗇𝗂𝖼𝗂𝖺𝗋, 𝗎𝗌𝖺: *${usedPrefix}unreg*`);
}

  if (!formato.test(text)) {
    return m.reply(`˚🌑｡ 𝖥𝗈𝗋𝗆𝖺𝗍𝗈 𝗂𝗇𝖼𝗈𝗋𝗋𝖾𝖼𝗍𝗈.\n𝗎𝗌𝗈: *${usedPrefix + command} nombre.edad*\n𝗲𝗷𝗲𝗺𝗽𝗹𝗼: *${usedPrefix + command} ${nombreUsuario}.18*`);
}

  let [_, nombre, __, edad] = text.match(formato);
  if (!nombre ||!edad) return m.reply(`˚🌑｡ 𝖤𝗅 𝗇𝗈𝗆𝖻𝗋𝖾 𝗒 𝗅𝖺 𝖾𝖽𝖺𝖽 𝗌𝗈𝗇 𝗈𝖻𝗅𝗂𝗀𝖺𝗍𝗈𝗋𝗂𝗈𝗌.`);
  if (nombre.length> 100) return m.reply(`˚🌑｡ 𝖤𝗅 𝗇𝗈𝗆𝖻𝗋𝖾 𝖾𝗌 𝗆𝗎𝗒 𝗅𝖺𝗋𝗀𝗈.`);

  edad = parseInt(edad);
  if (isNaN(edad)) return m.reply(`˚🌑｡ 𝖫𝖺 𝖾𝖽𝖺𝖽 𝖽𝖾𝖻𝖾 𝗌𝖾𝗋 𝗎𝗇 𝗇𝗎𝗆𝖾𝗋𝗈.`);
  if (edad> 1000) return m.reply(`˚🌑｡ 𝖤𝗅 𝖺𝖻𝗎𝖾𝗅𝗈 𝗊𝗎𝗂𝖾𝗋𝖾 𝗎𝗌𝖺𝗋 𝖾𝗅 𝖻𝗈𝗍...`);
  if (edad < 5) return m.reply(`˚🌑｡ 𝖴𝗇 𝖻𝖾𝖻𝖾 𝗁𝖺 𝗌𝗂𝗇𝗍𝗂𝗈 𝗅𝖺 𝗅𝗅𝖺𝗆𝖺𝖽𝖺 𝖽𝖾 𝖳𝗁𝖾-𝖿𝖾𝖽𝖾_𝖨𝖠.`);

  // Registro
  user.name = `${nombre}✓`;
  user.age = edad;
  user.regTime = Date.now();
  user.registered = true;
  user.coin += 40;
  user.exp += 300;
  user.joincount += 20;

  const serial = createHash('md5').update(m.sender).digest('hex').slice(0, 20);

  const mensaje = `
╭─『 ✅ REGISTRO COMPLETO 』─╮
🧿 Usuario: ${nombre}
📆 Edad: ${edad} años
🔐 ID: ${serial}
╰──────────────────╯
`.trim();

  await m.react('📩');

  await conn.sendMessage(m.chat, {
    text: mensaje,
    footer: '📩 𝖮𝖻𝗂𝗍𝗈-𝖡𝗈𝗍_𝖬𝖣',
    buttons: [
      { buttonId: '.menu', buttonText: { displayText: '˚🌑｡ 𝖬𝖤𝖭𝖴'}, type: 1}
    ],
    headerType: 1,
    contextInfo: {
      externalAdReply: {
        title: '˚📩｡ Usuario Verificado ˚📩｡',
        body: 'Bienvenido al sistema de Obito-Bot_MD',
        thumbnailUrl: avatar,
        sourceUrl: 'https://whatsapp.com/channel/0029VbApe6jG8l5Nv43dsC2N',
        mediaType: 1,
        showAdAttribution: true,
        renderLargerThumbnail: true
}
}
}, { quoted: m});
};

handler.help = ['reg','verificar', 'registrar'];
handler.tags = ['rg'];
handler.command = ['reg','verificar', 'registrar'];

export default handler;
