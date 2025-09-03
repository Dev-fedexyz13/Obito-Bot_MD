import fetch from 'node-fetch'
import { Sticker} from 'wa-sticker-formatter'

let handler = async (m, { conn, args}) => {
  const deco = '𖣣ֶㅤ֯⌗ 🌑 ׄ'
  await conn.sendMessage(m.chat, { react: { text: '⏳', key: m.key}})

  try {
    const texto = args.join(' ')
    if (!texto) {
      throw new Error(`${deco} 𝖤𝗃𝖾𝗆𝗉𝗅𝗈: *.bratv 𝖧𝗈𝗅𝖺 𝗆𝗎𝗇𝖽𝗈*`)
}

    const urlApi = `https://api.ypnk.dpdns.org/api/video/bratv?text=${encodeURIComponent(texto)}`
    const respuesta = await fetch(urlApi)
    if (!respuesta.ok) {
      throw new Error(`${deco} 𝖤𝗋𝗋𝗈𝗋 𝖺𝗅 𝗈𝖻𝗍𝖾𝗇𝖾𝗋 𝖾𝗅 𝗏𝗂𝖽𝖾𝗈 𝖽𝖾 𝗅𝖺 𝖥𝗎𝖾𝗇𝗍𝖾.`)
}

    const videoBuffer = await respuesta.buffer()
    const sticker = new Sticker(videoBuffer, {
      pack: '𝖮𝖻𝗂𝗍𝗈-𝖡𝗈𝗍_𝖬𝖣',
      author: '𝖣𝖾𝗏-𝖿𝖾𝖽𝖾𝗑𝗒',
      type: 'crop',
      quality: 50
})

    await conn.sendMessage(m.chat, {
      sticker: await sticker.toBuffer()
}, { quoted: m})

    await conn.sendMessage(m.chat, { react: { text: '✅', key: m.key}})

} catch (e) {
    console.error(e)
    await conn.sendMessage(m.chat, { react: { text: '❌', key: m.key}})
    await conn.sendMessage(m.chat, {
      text: `${deco} ⚠︎ 𝖮𝖼𝗎𝗋𝗋𝗂ó 𝗎𝗇 𝖾𝗋𝗋𝗈𝗋:\n${e.message}`
}, { quoted: m})
}
}

handler.help = ['bratvid *<texto>*'];
handler.tags = ['sticker']
handler.command = ['bratvid'];

export default handler
