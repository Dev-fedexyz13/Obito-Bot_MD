import fs from 'fs';
import fetch from 'node-fetch';
import moment from 'moment-timezone';
import { join} from 'path';

let handler = async (m, { conn, text, command, usedPrefix}) => {
  try {
    await m.react('🌑');

    const deco = '𖣣ֶㅤ֯⌗ 🌑 ׄ';
    const loading = `${deco} 𝖤𝖭𝖵𝖨𝖠𝖭𝖣𝖮 𝖬𝖤𝖭𝖴́ 𝖣𝖤 𝖮𝖡𝖨𝖳𝖮-𝖡𝖮𝖳_𝖬𝖣...`;
    await conn.sendMessage(m.chat, { text: loading}, { quoted: m});

    const who = m.mentionedJid?.[0] || (m.fromMe? conn.user.jid: m.sender);
    const perfil = await conn.profilePictureUrl(who, 'image').catch(() => 'https://qu.ax/QGAVS.jpg');
    const fecha = moment().tz('America/Lima').format('DD/MM/YYYY');
    const hora = moment().tz('America/Lima').format('HH:mm:ss');
    const saludo = ucapan();
    const taguser = '@' + m.sender.split('@')[0];
    const video = ['https://files.cloudkuimages.guru/videos/9yNRmc4K.mp4'].getRandom();
    
    const menu = `
˚🌑｡ *𝖮𝖻𝗂𝗍𝗈-𝖡𝗈𝗍-𝖬𝖣* te saluda...
${taguser}, ${saludo}

╭─〔 *𝖤𝖲𝖳𝖠𝖣𝖮 𝖣𝖤𝖫 𝖡𝖮𝖳* 〕─╮
│ 🤖 *𝖡𝖮𝖳:* ${(conn.user.jid == global.conn.user.jid ? '𝖯𝖱𝖨𝖭𝖢𝖨𝖯𝖠𝖫 🅥' : '𝖲𝖴𝖡‐𝖡𝖮𝖳 🅑')}
│ 🧠 *𝖵𝖤𝖱𝖲𝖨𝖮𝖭:* 2.4.0 *(𝖡𝖤𝖳𝖠)*
│ 🕰️ *𝖧𝖮𝖱𝖠:* ${hora}
│ 📆 *𝖥𝖤𝖢𝖧𝖠:* ${fecha}
│ 👤 *𝖢𝖱𝖤𝖠𝖣𝖮𝖱:* _𝖣𝖾𝗏-𝖿𝖾𝖽𝖾𝗑𝗒𝗓_
╰────────────────────╯

- *𝖤𝖲𝖳𝖠𝖣𝖮: 𝖮𝗉𝖾𝗋𝖺𝗍𝗂𝗏𝗈*
- *𝖢𝖫𝖠𝖭: 𝖴𝖼𝗁𝗂𝗁𝖺 𝖯𝗋𝗈𝗍𝗈𝖼𝗈𝗅*
- *𝖬𝖮𝖣𝖮: 𝖲𝗂𝗅𝖾𝗇𝖼𝗂𝗈 𝖤𝗌𝗍𝗋𝖺𝗍𝖾𝗀𝗂𝖼𝗈*


 乂 *𝖫𝖨𝖲𝖳𝖠 𝖣𝖤 𝖢𝖮𝖬𝖠𝖭𝖣𝖮𝖲* 乂


╭──「 𝖨𝖭𝖥𝖮 」──╮
˚🌑｡ ${usedPrefix}menu
˚🌑｡ ${usedPrefix}help
˚🌑｡ ${usedPrefix}ping | ${usedPrefix}p
˚🌑｡ ${usedPrefix}creador
˚🌑｡ ${usedPrefix}owner
˚🌑｡ ${usedPrefix}unreg
˚🌑｡ ${usedPrefix}reg
╰──────────────╯

╭──「 𝖲𝖤𝖠𝖱𝖢𝖧 」──╮
˚🌑｡ ${usedPrefix}tiktoks
˚🌑｡ ${usedPrefix}tiktoksearch
˚🌑｡
╰──────────────╯

╭──「 𝖣𝖤𝖲𝖢𝖠𝖱𝖦𝖠𝖲 」──╮
˚🌑｡ ${usedPrefix}facebook | ${usedPrefix}fb
˚🌑｡ ${usedPrefix}instagram | ${usedPrefix}ig
˚🌑｡ ${usedPrefix}modapk
˚🌑｡ ${usedPrefix}apk
˚🌑｡ ${usedPrefix}playaudio
˚🌑｡ ${usedPrefix}ytmp3
˚🌑｡ ${usedPrefix}play
╰──────────────╯

╭──「 𝖡𝖴𝖲𝖢𝖠𝖣𝖮𝖱 」──╮
˚🌑｡ ${usedPrefix}ytmp4 | ${usedPrefix}ytvideo
˚🌑｡ ${usedPrefix}imagen | ${usedPrefix}img
˚🌑｡ ${usedPrefix}pinterest | ${usedPrefix}pin
˚🌑｡ ${usedPrefix}tiktok
˚🌑｡ ${usedPrefix}tt
╰──────────────╯

╭───「 𝖥𝖴𝖭 」───╮
˚🌑｡ ${usedPrefix}sticker
˚🌑｡ ${usedPrefix}s
˚🌑｡ ${usedPrefix}bratvid
˚🌑｡ ${usedPrefix}brat
╰──────────────╯

╭──「 𝖦𝖱𝖴𝖯𝖮𝖲 」──╮
˚🌑｡ ${usedPrefix}invocar
˚🌑｡ ${usedPrefix}tagall
˚🌑｡ ${usedPrefix}todos
˚🌑｡ ${usedPrefix}cerrar
˚🌑｡ ${usedPrefix}abrir
˚🌑｡ ${usedPrefix}kick | ${usedPrefix}link
˚🌑｡ ${usedPrefix}hidetag | ${usedPrefix}tag
˚🌑｡ ${usedPrefix}link
╰──────────────╯

╭──「 𝖮𝖭 / 𝖮𝖥𝖥 」──╮
˚🌑｡ ${usedPrefix}antiprivado
˚🌑｡ ${usedPrefix}modoadmin
˚🌑｡ ${usedPrefix}antilink
˚🌑｡ ${usedPrefix}antispam
╰──────────────╯

╭──「 𝖢𝖮𝖭𝖵𝖤𝖱𝖳𝖨𝖣𝖮𝖱 」──╮
˚🌑｡ ${usedPrefix}tourl2
˚🌑｡ ${usedPrefix}catbox
˚🌑｡ ${usedPrefix}tourl
╰──────────────╯

╭───「  𝖨𝖠  」───╮
˚🌑｡ ${usedPrefix}crearimg | ${usedPrefix}imagia
˚🌑｡ ${usedPrefix}imgtopix
╰──────────────╯

╭───「 𝖮𝖶𝖭𝖤𝖱 」───╮
˚🌑｡ update
˚🌑｡ fix
˚🌑｡ up
╰───────────╯

╭──「 𝖲𝖤𝖱-𝖡𝖮𝖳 」──╮
˚🌑｡ ${usedPrefix}deletebot
˚🌑｡ ${usedPrefix}bots
˚🌑｡ ${usedPrefix}code
˚🌑｡ ${usedPrefix}qr
╰──────────────╯
`.trim();

    await conn.sendMessage(m.chat, {
  video: { url: video},
  caption: menu,
  buttons: [
    {
      buttonId: `${usedPrefix}reg SINNOMBRE.17`,
      buttonText: { displayText: '🌑 𝖵𝖤𝖱𝖨𝖥𝖨𝖢𝖠𝖱'},
      type: 1
}
  ],
  contextInfo: {
    mentionedJid: [m.sender],
    isForwarded: true,
    forwardingScore: 999,
    externalAdReply: {
      title: '˚🌑｡ 𝖮𝖻𝗂𝗍𝗈-𝖡𝗈𝗍_𝖬𝖣 ˚⚔｡',
      body: '˚🌑｡ 𝖮𝖻𝗂𝗍𝗈-𝖡𝗈𝗍_𝖬𝖣 | 𝖣𝖾𝗏-𝖿𝖾𝖽𝖾𝗑𝗒𝗓',
      thumbnailUrl: 'https://files.cloudkuimages.guru/images/sS8gtI57.jpg',
      mediaType: 1,
      sourceUrl: 'https://whatsapp.com',
      renderLargerThumbnail: true
}
},
      gifPlayback: true,
      gifAttribution: 0
}, { quoted: null});

} catch (e) {
    await m.reply(`⚠️ *Error al enviar el menú.*\n\n${e}`);
}
};

handler.help = ['menu'];
handler.tags = ['main'];
handler.command = ['menu', 'help', 'menú', 'allmenú', 'allmenu', 'menucompleto'];
handler.register = false;

export default handler;

// 🕰️ Saludo contextual
function ucapan() {
  const time = moment.tz('America/Lima').format('HH');
  if (time>= 5 && time < 11) return 'Bᴜᴇɴᴀ Mᴀᴅʀᴜɢᴀᴅᴀ 🏙️';
  if (time>= 11 && time < 17) return 'Bᴜᴇɴ Dɪ́ᴀ 🏞️';
  if (time>= 17 && time < 20) return 'Hᴇʀᴍᴏsᴀ Tᴀʀᴅᴇ 🌆';
  return 'Lɪɴᴅᴀ Nᴏᴄʜᴇ 🌃';
}

const more = String.fromCharCode(8206);
const readMore = more.repeat(4001);

function clockString(ms) {
  let h = isNaN(ms)? '--': Math.floor(ms / 3600000);
  let m = isNaN(ms)? '--': Math.floor(ms / 60000) % 60;
  let s = isNaN(ms)? '--': Math.floor(ms / 1000) % 60;
  return [h, m, s].map(v => v.toString().padStart(2, 0)).join(':');
}
