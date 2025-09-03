import { googleImage} from '@bochilteam/scraper';
import baileys from '@whiskeysockets/baileys';

// 🔧 Personalización del bot
const packname = '𝖳𝗁𝖾-𝖿𝖾𝖽𝖾_𝖨𝖠';
const dev = '𝖥𝖾𝖽𝖾';
const icono = 'https://i.imgur.com/JP52fdP.jpeg';
const redes = 'https://instagram.com/thefede_ia';

async function sendAlbumMessage(jid, medias, options = {}) {
  if (typeof jid!== 'string') throw new TypeError(`jid debe ser string, recibido: ${typeof jid}`);
  if (medias.length < 2) throw new RangeError('Se necesitan al menos 2 imágenes para crear un álbum');

  const caption = options.caption || '';
  const delay = Number(options.delay) || 500;

  const album = baileys.generateWAMessageFromContent(
    jid,
    { messageContextInfo: {}, albumMessage: { expectedImageCount: medias.length}},
    {}
);

  await conn.relayMessage(album.key.remoteJid, album.message, { messageId: album.key.id});

  for (let i = 0; i < medias.length; i++) {
    const { type, data} = medias[i];
    const img = await baileys.generateWAMessage(
      album.key.remoteJid,
      { [type]: data,...(i === 0? { caption}: {})},
      { upload: conn.waUploadToServer}
);
    img.message.messageContextInfo = {
      messageAssociation: { associationType: 1, parentMessageKey: album.key}
};
    await conn.relayMessage(img.key.remoteJid, img.message, { messageId: img.key.id});
    await baileys.delay(delay);
}

  return album;
}

const handler = async (m, { conn, text}) => {
  if (!text) return conn.reply(m.chat, '🌑 Ingresa un texto para buscar imágenes.', m);

  await m.react('⌛');
  conn.reply(m.chat, '✧ *Buscando imágenes...*', m, {
    contextInfo: {
      externalAdReply: {
        mediaUrl: null,
        mediaType: 1,
        showAdAttribution: true,
        title: packname,
        body: dev,
        previewType: 0,
        thumbnail: icono,
        sourceUrl: redes
}
}
});

  try {
    const res = await googleImage(text);
    const images = [];

    for (let i = 0; i < 10; i++) {
      const img = await res.getRandom();
      if (img) images.push({ type: 'image', data: { url: img}});
}

    if (images.length < 2) return conn.reply(m.chat, '✧ No se encontraron suficientes imágenes para crear un álbum.', m);

    const caption = `🍁 Resultados de: ${text}`;
    await sendAlbumMessage(m.chat, images, { caption, quoted: m});

    await m.react('✅');
} catch (error) {
    await m.react('❌');
    conn.reply(m.chat, `⚠︎ Error al obtener imágenes: ${error.message}`, m);
}
};

handler.help = ['imagen <texto>'];
handler.tags = ['buscador', 'tools', 'descargas'];
handler.command = ['imagen', 'image', 'img'];
handler.register = true;

export default handler;
