import axios from "axios";
import FormData from "form-data";
import * as baileys from "@whiskeysockets/baileys";

// Función para buscar videos en TikTok
const ttSearch = async (query, count = 3) => {
    try {
        let d = new FormData();
        d.append("keywords", query);
        d.append("count", count);
        d.append("cursor", 0);
        d.append("web", 1);
        d.append("hd", 1);

        let h = { headers: {...d.getHeaders()}};
        let { data} = await axios.post("https://tikwm.com/api/feed/search", d, h);

        if (!data.data ||!data.data.videos) return [];

        const baseURL = "https://tikwm.com";
        return data.data.videos.map(video => ({
            play: baseURL + video.play
}));
} catch (e) {
        console.log(e);
        return [];
}
}

// Función para enviar álbum de videos por WhatsApp
async function sendVideoAlbum(conn, m, videos, caption) {
    const album = baileys.generateWAMessageFromContent(m.chat, {
        albumMessage: {
            expectedVideoCount: videos.length,
            contextInfo: m.quoted? {
                remoteJid: m.quoted.key.remoteJid,
                fromMe: m.quoted.key.fromMe,
                stanzaId: m.quoted.key.id,
                participant: m.quoted.key.participant || m.quoted.key.remoteJid,
                quotedMessage: m.quoted.message
}: {}
}
}, { quoted: m});

    await conn.relayMessage(album.key.remoteJid, album.message, {
        messageId: album.key.id
});

    for (const [index, video] of videos.entries()) {
        const msg = await baileys.generateWAMessage(album.key.remoteJid, {
            video: { url: video.play},
...(index === 0? { caption}: {})
}, {
            upload: conn.waUploadToServer
});

        msg.message.messageContextInfo = {
            messageAssociation: {
                associationType: 1,
                parentMessageKey: album.key
}
};
        await conn.relayMessage(msg.key.remoteJid, msg.message, {
            messageId: msg.key.id
});
}
}

// Handler principal del comando
let handler = async (m, { conn, text}) => {
    if (!text) return m.reply("Ingresa el título que quieras buscar.\n\n*Ejemplo:*.tiktoksearch Messi | 5");

    // Mensaje de inicio estilizado
    await m.reply("『 𝖮𝖻𝗂𝗍𝗈-𝖡𝗈𝗍_𝖬𝖣 』⟶ 𝙄𝙉𝙄𝘾𝙄𝘼𝙉𝘿𝙊 𝘽𝙐𝙎𝙌𝙐𝙀𝘿𝘼...\n⌛ Por favor espera mientras se recopilan los resultados...");

    let [query, cantidad] = text.split("|").map(v => v.trim());
    cantidad = parseInt(cantidad) || 5;

    let videos = await ttSearch(query, cantidad);
    if (!videos.length) return m.reply("No encontré videos, prueba con otra palabra clave.");

    await sendVideoAlbum(conn, m, videos, "📱 Resultados de búsqueda en TikTok:");
}

handler.help = ['tiktoksearch2', 'tiktoks2'];
handler.tags = ['buscador'];
handler.command = ['tiktoksearch2', 'tiktoks2'];

export default handler;
