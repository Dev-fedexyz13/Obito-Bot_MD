// 🎀 Código creado por 𝖋𝖊𝖉𝖾𝗑𝗒𝗓 🍁
// 𝖭𝗈 𝗋𝖾𝗍𝗂𝗋𝖾𝗌 𝗅𝗈𝗌 𝖼𝗋𝖾𝖽𝗂𝗍𝗈𝗌

import fetch from 'node-fetch'
import axios from 'axios'

const MAX_FILE_SIZE = 280 * 1024 * 1024

const isValidYouTubeUrl = (url) =>
  /^(?:https?:\/\/)?(?:www\.|m\.|music\.)?youtu\.?be(?:\.com)?\/?.*(?:watch|embed)?(?:.*v=|v\/|\/)([\w\-_]+)\&?/.test(url)

function formatSize(bytes) {
  if (!bytes || isNaN(bytes)) return 'Desconocido'
  const units = ['B', 'KB', 'MB', 'GB', 'TB']
  let i = 0
  bytes = Number(bytes)
  while (bytes>= 1024 && i < units.length - 1) {
    bytes /= 1024
    i++
}
  return `${bytes.toFixed(2)} ${units[i]}`
}

async function ytdl(url) {
  const headers = {
    accept: '*/*',
    referer: 'https://id.ytmp3.mobi/',
    'referrer-policy': 'strict-origin-when-cross-origin'
}

  const initRes = await fetch(`https://d.ymcdn.org/api/v1/init?p=y&23=1llum1n471&_=${Date.now()}`, { headers})
  if (!initRes.ok) throw new Error('Fallo al inicializar la solicitud')
  const init = await initRes.json()

  const videoId = url.match(/(?:youtu\.be\/|youtube\.com\/(?:.*v=|.*\/|.*embed\/))([^&?/]+)/)?.[1]
  if (!videoId) throw new Error('ID de video no encontrado')

  const convertRes = await fetch(`${init.convertURL}&v=${videoId}&f=mp4&_=${Date.now()}`, { headers})
  if (!convertRes.ok) throw new Error('Fallo al convertir el video')
  const convert = await convertRes.json()

  let info
  for (let i = 0; i < 3; i++) {
    const progressRes = await fetch(convert.progressURL, { headers})
    if (!progressRes.ok) throw new Error('Fallo al obtener el progreso')
    info = await progressRes.json()
    if (info.progress === 3) break
    await new Promise(resolve => setTimeout(resolve, 1000))
}

  if (!info ||!convert.downloadURL) throw new Error('No se pudo obtener la URL de descarga')
  return { url: convert.downloadURL, title: info.title || 'Video sin título'}
}

async function getSize(url) {
  try {
    const response = await axios.head(url, { timeout: 10000})
    const size = parseInt(response.headers['content-length'], 10)
    if (!size) throw new Error('Tamaño no disponible')
    return size
} catch {
    throw new Error('No se pudo obtener el tamaño del archivo')
}
}

let handler = async (m, { conn, text, usedPrefix, command}) => {
  if (!text) {
    return conn.reply(m.chat, `🌑 Uso correcto:\n${usedPrefix}${command} https://youtube.com/watch?v=abc123`, m)
}

  if (!isValidYouTubeUrl(text)) {
    await m.react('❌')
    return m.reply('🚫 Enlace de YouTube inválido')
}

  await m.react('🕷️')
  try {
    const { url, title} = await ytdl(text)
    const size = await getSize(url)

    if (!size) throw new Error('No se pudo determinar el tamaño del video')
    if (size> MAX_FILE_SIZE) throw new Error('🌧️ El archivo supera el límite permitido para descarga')

    await m.react('📦')

    const caption = `
🎬 *${title}*
⚖️ *Tamaño:* ${formatSize(size)}
🔗 *Enlace:* ${text}
📁 *Formato:* Video normal
`.trim()

    const image = await fetch('https://files.cloudkuimages.guru/images/wn5uChxB.jpg').then(res => res.buffer())

    await conn.sendMessage(m.chat, {
      image,
      caption,
      footer: '🌑 𝖮𝖻𝗂𝗍𝗈-𝖡𝗈𝗍_𝖬𝖣 • Descarga completada desde las sombras',
      buttons: [
        { buttonId: '.code', buttonText: { displayText: '🕸️ 𝖢𝗈𝖽𝗂𝗀𝗈 𝖲𝖾𝗋𝖻𝗈𝗍'}, type: 1}
      ],
      headerType: 4
}, { quoted: m})

    const buffer = await (await fetch(url)).buffer()
    await conn.sendMessage(m.chat, {
      video: buffer,
      fileName: `${title}.mp4`,
      mimetype: 'video/mp4'
}, { quoted: m})

    await m.react('✅')
} catch (e) {
    await m.react('❌')
    await m.reply(`❌ 𝖤𝗋𝗋𝗈𝗋: ${e.message || 'No se pudo procesar la solicitud'}`)
}
}

handler.help = ['ytmp4 <url>', 'ytvideo']
handler.tags = ['downloader', 'youtube']
handler.command = ['ytmp4', 'ytvideo']
handler.register = true

export default handler
