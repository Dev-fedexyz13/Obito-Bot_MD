import yts from 'yt-search'
import fs from 'fs'

const handler = async (m, { conn, text}) => {
  if (!text) throw '🌑 𝖮𝖻𝗂𝗍𝗈-𝖡𝗈𝗍_𝖬𝖣 » Por favor, indica qué deseas buscar en YouTube.'

  const results = await yts(text)
  const tes = results.all

  const teks = tes
.map((v) => {
      if (v.type === 'video') {
        return `╭─❖─「 🌑 𝖮𝖻𝗂𝗍𝗈-𝖡𝗈𝗍_𝖬𝖣 」─❖─╮

𖣐 𝖳𝖨𝖳𝖴𝖫𝖮     ⬭ *${v.title}*
𖣐 𝖤𝖭𝖫𝖠𝖢𝖤     ⬭ ${v.url}
𖣐 𝖣𝖴𝖱𝖠𝖢𝖨𝖮𝖭 ⬭ *${v.timestamp}*
𖣐 𝖲𝖴𝖡𝖨𝖣𝖮     ⬭ *${v.ago}*
𖣐 𝖵𝖨𝖲𝖳𝖠𝖲     ⬭ *${v.views}*

╰─◇───────────────◇─╯`
}
})
.filter((v) => v)
.join('\n\n••••••••••••••••••••••••••••••••••••\n\n')

  await conn.sendMessage(m.chat, {
    image: { url: tes[0].thumbnail},
    caption: teks
}, { quoted: m})
}

handler.help = ['ytsearch *<texto>*']
handler.tags = ['search']
handler.command = ['ytsearch', 'yts']
export default handler
