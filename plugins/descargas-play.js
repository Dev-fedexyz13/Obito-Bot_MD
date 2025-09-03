// ✨ Código creado por Dev-fedexyz13 🍁
// 𝖭𝗈 𝗋𝖾𝗍𝗂𝗋𝖾𝗌 𝗅𝗈𝗌 𝖼𝗋𝖾𝖽𝗂𝗍𝗈𝗌 🍂

import fetch from 'node-fetch'
import yts from 'yt-search'

const channelRD = {
  id: '120363402097425674@newsletter',
  name: '🕷️ 𝖮𝖻𝗂𝗍𝗈_𝖡𝗈𝗍_𝖬𝖣 • 𝖭𝗈𝗍𝗂𝖼𝗂𝖺𝗌 𝖣𝖾𝗅 𝖲𝗎𝖻𝗆𝗎𝗇𝖽𝗈'
}

const youtubeRegexID = /(?:youtu\.be\/|youtube\.com\/(?:watch\?v=|embed\/))([a-zA-Z0-9_-]{11})/

const handler = async (m, { conn, text, command}) => {
  try {
    if (!text.trim()) {
      await m.react('📡')
      return conn.sendMessage(m.chat, {
        text: `🕸️ *𝖮𝖻𝗂𝗍𝗈 𝗇𝖾𝖼𝖾𝗌𝗂𝗍𝖺 𝗎𝗇 𝗍𝗂́𝗍𝗎𝗅𝗈 𝗉𝖺𝗋𝖺 𝗂𝗇𝗏𝗈𝖼𝖺𝗋 𝗅𝖺 𝗆𝗎́𝗌𝗂𝖼𝖺.*\n🎶 𝖤𝗃𝖾𝗆𝗉𝗅𝗈: *${command} 𝖤𝗅 𝖿𝗂𝗇 𝖽𝖾 𝗅𝖺 𝗇𝗈𝖼𝗁𝖾*`,
        quoted: m
})
}

    await m.react('🔍')

    const videoIdMatch = text.match(youtubeRegexID)
    const searchQuery = videoIdMatch? `https://youtu.be/${videoIdMatch[1]}`: text
    let result = await yts(searchQuery)

    result = videoIdMatch
? result.all.find(v => v.videoId === videoIdMatch[1]) || result.videos.find(v => v.videoId === videoIdMatch[1])
: result.videos?.[0] || result.all?.[0]

    if (!result) {
      return conn.sendMessage(m.chat, {
        text: '😿 *𝖮𝖻𝗂𝗍𝗈 𝗇𝗈 𝖾𝗇𝖼𝗈𝗇𝗍𝗋𝗈́ 𝗇𝖺𝖽𝖺 𝖼𝗈𝗇 𝖾𝗌𝖾 𝗇𝗈𝗆𝖻𝗋𝖾.*',
        quoted: m
})
}

    const { title, thumbnail, timestamp, views, ago, url, author} = result
    const thumb = (await conn.getFile(thumbnail)).data

    const infoMessage = `
🕷️ *𝖯𝖾𝗍𝗂𝖼𝗂𝗈́𝗇 𝖼𝗈𝗆𝗉𝗅𝖾𝗍𝖺:*
📺 *𝖢𝖺𝗇𝖺𝗅:* ${author.name || '𝖣𝖾𝗌𝖼𝗈𝗇𝗈𝖼𝗂𝖽𝗈'}
👁️ *𝖵𝗂𝗌𝗍𝖺𝗌:* ${formatViews(views)}
⏳ *𝖣𝗎𝗋𝖺𝖼𝗂𝗈́𝗇:* ${timestamp || '?'}
📆 *𝖯𝗎𝖻𝗅𝗂𝖼𝖺𝖽𝗈:* ${ago || '?'}
🔗 *𝖤𝗇𝗅𝖺𝖼𝖾:* ${url}`.trim()

    const contextoObito = {
      contextInfo: {
        forwardedNewsletterMessageInfo: {
          newsletterJid: channelRD.id,
          serverMessageId: 101,
          newsletterName: channelRD.name
},
        externalAdReply: {
          title: '🎧 𝖮𝖻𝗂𝗍𝗈 𝗍𝖾 𝗍𝗋𝖺𝖾 𝗅𝖺 𝗆𝗎́𝗌𝗂𝖼𝖺 𝖽𝖾𝗅 𝖺𝗇𝗎𝗇𝖼𝗂𝗈',
          body: `📻 ${author.name || '𝖠𝗋𝗍𝗂𝗌𝗍𝖺 𝖽𝖾𝗌𝖼𝗈𝗇𝗈𝖼𝗂𝖽𝗈'} • ✨ ${title}`,
          thumbnailUrl: 'https://files.cloudkuimages.guru/images/wn5uChxB.jpg',
          mediaUrl: url,
          sourceUrl: url,
          mediaType: 1,
          renderLargerThumbnail: true
}
}
}

    await conn.sendMessage(m.chat, {
      image: thumb,
      caption: infoMessage,
      footer: '𝖮𝖻𝗂𝗍𝗈_𝖡𝗈𝗍_𝖬𝖣 • 𝖣𝖾𝗌𝖼𝖺𝗋𝗀𝖺𝗌 𝖽𝖾𝗅 𝖠𝗇𝗎𝗇𝖼𝗂𝗈',
      buttons: [
        { buttonId: '.menu', buttonText: { displayText: '˚🌑｡ 𝖬𝖾𝗇𝗎'}, type: 1}
      ],
      headerType: 4,
...contextoObito
}, { quoted: m})

    if (['play', 'yta', 'ytmp3', 'playaudio'].includes(command)) {
      try {
        const api = await (await fetch(`https://api.vreden.my.id/api/ytmp3?url=${url}`)).json()
        const audioUrl = api.result?.download?.url
        if (!audioUrl) throw '⛔ 𝖤𝗋𝗋𝗈𝗋 𝖺𝗅 𝗀𝖾𝗇𝖾𝗋𝖺𝗋 𝖾𝗅 𝖺𝗎𝖽𝗂𝗈'

        await conn.sendMessage(m.chat, {
          audio: { url: audioUrl},
          fileName: `${api.result.title || '𝖽𝖾𝗌𝖼𝖺𝗋𝗀𝖺'}.mp3`,
          mimetype: 'audio/mpeg'
}, { quoted: m})
} catch {
        return conn.sendMessage(m.chat, {
          text: '💔 𝖭𝗈 𝗌𝖾 𝗉𝗎𝖽𝗈 𝖾𝗇𝗏𝗂𝖺𝗋 𝖾𝗅 𝖺𝗋𝖼𝗁𝗂𝗏𝗈. 𝖨𝗇𝗍𝖾𝗇𝗍𝖺 𝗈𝗍𝗋𝗈 𝗍𝗂́𝗍𝗎𝗅𝗈 𝗈 𝗋𝖾𝗏𝗂𝗌𝖺 𝗍𝖺𝗆𝖺𝗇𝗈.',
          quoted: m
})
}
}

    await m.react('🌸')
} catch (error) {
    await conn.sendMessage(m.chat, {
      text: `💥 𝖤𝗋𝗋𝗈𝗋 𝖾𝗇 𝗅𝖺 𝖿𝗎𝗇𝖼𝗂𝗈́𝗇:\n> \`${error.message || error}\``,
      quoted: m
})
    await m.react('💫')
}
}

handler.command = handler.help = ['play', 'ytmp3', 'playaudio']
handler.tags = ['descargas']
export default handler

// 🌼 𝖥𝗈𝗋𝗆𝖺𝗍𝗈 𝖽𝗎𝗅𝖼𝖾 𝗉𝖺𝗋𝖺 𝗏𝗂𝗌𝗍𝖺𝗌
function formatViews(views = 0) {
  if (views>= 1_000_000_000) return `${(views / 1_000_000_000).toFixed(1)}B (${views.toLocaleString()})`;
  if (views>= 1_000_000) return `${(views / 1_000_000).toFixed(1)}M (${views.toLocaleString()})`;
  if (views>= 1_000) return `${(views / 1_000).toFixed(1)}k (${views.toLocaleString()})`;
  return views.toString();
  }
