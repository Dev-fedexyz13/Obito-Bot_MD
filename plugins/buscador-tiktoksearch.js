import axios from 'axios';
const {
  proto,
  generateWAMessageFromContent,
  generateWAMessageContent
} = (await import("@whiskeysockets/baileys")).default;

// 🔧 Variables necesarias
const redes = 'https://tiktok.com'; // Puedes cambiarlo por tu enlace preferido
const dev = '𝖣𝖾𝗏-𝖿𝖾𝖽𝖾𝗑𝗒𝗓 '; // Nombre del bot o desarrollador
const avatar = 'https://i.imgur.com/JP52fdP.jpeg'; // Imagen de miniatura

let handler = async (message, { conn, text}) => {
  if (!text) {
    return conn.reply(message.chat, "🍁 Ingresa un texto para buscar en TikTok.", message);
}

  const createVideoMessage = async url => {
    const { videoMessage} = await generateWAMessageContent({ video: { url}}, { upload: conn.waUploadToServer});
    return videoMessage;
};

  const shuffleArray = arr => {
    for (let i = arr.length - 1; i> 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [arr[i], arr[j]] = [arr[j], arr[i]];
}
};

  try {
    conn.reply(message.chat, '✧ *Buscando en TikTok...*', message, {
      contextInfo: {
        externalAdReply: {
          mediaUrl: null,
          mediaType: 1,
          showAdAttribution: true,
          title: '✧ Resultados TikTok',
          body: dev,
          previewType: 0,
          thumbnail: avatar,
          sourceUrl: redes
}
}
});

    const { data} = await axios.get(`https://apis-starlights-team.koyeb.app/starlight/tiktoksearch?text=${text}`);
    const searchResults = data.data;
    shuffleArray(searchResults);
    const topResults = searchResults.slice(0, 7);

    const cards = await Promise.all(topResults.map(async result => ({
      body: proto.Message.InteractiveMessage.Body.fromObject({ text: null}),
      footer: proto.Message.InteractiveMessage.Footer.fromObject({ text: dev}),
      header: proto.Message.InteractiveMessage.Header.fromObject({
        title: result.title,
        hasMediaAttachment: true,
        videoMessage: await createVideoMessage(result.nowm)
}),
      nativeFlowMessage: proto.Message.InteractiveMessage.NativeFlowMessage.fromObject({ buttons: []})
})));

    const messageContent = generateWAMessageFromContent(message.chat, {
      viewOnceMessage: {
        message: {
          messageContextInfo: {
            deviceListMetadata: {},
            deviceListMetadataVersion: 2
},
          interactiveMessage: proto.Message.InteractiveMessage.fromObject({
            body: proto.Message.InteractiveMessage.Body.create({ text: `✧ RESULTADO DE: ${text}`}),
            footer: proto.Message.InteractiveMessage.Footer.create({ text: dev}),
            header: proto.Message.InteractiveMessage.Header.create({ hasMediaAttachment: false}),
            carouselMessage: proto.Message.InteractiveMessage.CarouselMessage.fromObject({ cards})
})
}
}
}, { quoted: message});

    await conn.relayMessage(message.chat, messageContent.message, {
      messageId: messageContent.key.id
});

} catch (error) {
    conn.reply(message.chat, `⚠︎ *OCURRIÓ UN ERROR:* ${error.message}`, message);
}
};

handler.help = ["tiktoksearch <texto>"];
handler.tags = ["buscador"];
handler.command = ["tiktoksearch", "ttss", "tiktoks"];
handler.group = true;

export default handler;
