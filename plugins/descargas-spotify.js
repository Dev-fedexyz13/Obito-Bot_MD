import axios from 'axios'
import fetch from 'node-fetch'

let handler = async (m, { conn, text, usedPrefix, command}) => {

  if (!text) return conn.reply(m.chat, `🌑 𝖮𝖻𝗂𝗍𝗈-𝖡𝗈𝗍_𝖬𝖣 » Por favor, proporciona el nombre de una canción o artista.`, m)

  try {
    let songInfo = await spotifyxv(text)
    if (!songInfo.length) throw `🌑 𝖮𝖻𝗂𝗍𝗈-𝖡𝗈𝗍_𝖬𝖣 » No se encontró la canción.`

    let song = songInfo[0]
    const res = await fetch(`https://api.sylphy.xyz/download/spotify?url=${song.url}&apikey=sylph-96ccb836bc`)

    if (!res.ok) throw `🌑 𝖮𝖻𝗂𝗍𝗈-𝖡𝗈𝗍_𝖬𝖣 » Error al obtener datos de la API. Código: ${res.status}`

    const data = await res.json().catch((e) => {
      console.error('Error parsing JSON:', e)
      throw "🌑 𝖮𝖻𝗂𝗍𝗈-𝖡𝗈𝗍_𝖬𝖣 » Error al analizar la respuesta JSON."
})

    if (!data ||!data.data ||!data.data.dl_url) {
      console.log('Respuesta inesperada:', data)
      throw "🌑 𝖮𝖻𝗂𝗍𝗈-𝖡𝗈𝗍_𝖬𝖣 » No se pudo obtener el enlace de descarga. Verifica si el enlace de Spotify es válido."
}

    const info = `╭─❖─「 🌑 𝖮𝖻𝗂𝗍𝗈-𝖡𝗈𝗍_𝖬𝖣 」─❖─╮

𖣐 𝖳𝖨𝖳𝖴𝖫𝖮     ⬭ *${data.data.title}*
𖣐 𝖠𝖱𝖳𝖨𝖲𝖳𝖠   ⬭ *${data.data.artist}*
𖣐 𝖠𝖫𝖡𝖴𝖬     ⬭ *${data.data.album}*
𖣐 𝖣𝖴𝖱𝖠𝖢𝖨𝖮𝖭 ⬭ *${data.data.duration}*
𖣐 𝖤𝖭𝖫𝖠𝖢𝖤     ⬭ ${song.url}

╰─◇───────────────◇─╯`

    await conn.sendMessage(m.chat, {
      text: info,
      contextInfo: {
        forwardingScore: 9999999,
        isForwarded: false,
        externalAdReply: {
          showAdAttribution: true,
          containsAutoReply: true,
          renderLargerThumbnail: true,
          title: '˚🌑｡ 𝖮𝖻𝗂𝗍𝗈-𝖡𝗈𝗍_𝖬𝖣 ˚⚔',
          body: '˚🌑｡ 𝖮𝖻𝗂𝗍𝗈-𝖡𝗈𝗍_𝖬𝖣 | 𝖣𝖾𝗏-𝖿𝖾𝖽𝖾𝗑𝗒𝗓',
          mediaType: 1,
          thumbnailUrl: data.data.img,
          mediaUrl: song.url,
          sourceUrl: song.url
}
}
}, { quoted: m})

    await conn.sendMessage(m.chat, {
      audio: { url: data.data.dl_url},
      fileName: `${data.data.title}.mp3`,
      mimetype: 'audio/mp4',
      ptt: true
}, { quoted: m})

} catch (e1) {
    m.reply(`${e1.message || e1}`)
}
}

handler.help = ['spotify', 'music']
handler.tags = ['downloader']
handler.command = ['spotify', 'splay']
handler.group = true

export default handler

// Función para buscar en Spotify
async function spotifyxv(query) {
  let token = await tokens()
  let response = await axios({
    method: 'get',
    url: 'https://api.spotify.com/v1/search?q=' + query + '&type=track',
    headers: {
      Authorization: 'Bearer ' + token
}
})
  const tracks = response.data.tracks.items
  const results = tracks.map((track) => ({
    name: track.name,
    artista: track.artists.map((artist) => artist.name),
    album: track.album.name,
    duracion: timestamp(track.duration_ms),
    url: track.external_urls.spotify,
    imagen: track.album.images.length? track.album.images[0].url: ''
}))
  return results
}

// Token de acceso a Spotify
async function tokens() {
  const response = await axios({
    method: 'post',
    url: 'https://accounts.spotify.com/api/token',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
      Authorization: 'Basic ' + Buffer.from('acc6302297e040aeb6e4ac1fbdfd62c3:0e8439a1280a43aba9a5bc0a16f3f009').toString('base64')
},
    data: 'grant_type=client_credentials'
})
  return response.data.access_token
}

// Formato de duración
function timestamp(time) {
  const minutes = Math.floor(time / 60000)
  const seconds = Math.floor((time % 60000) / 1000)
  return minutes + ':' + (seconds < 10? '0': '') + seconds
}
