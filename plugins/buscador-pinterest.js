import axios from 'axios'
import baileys from '@whiskeysockets/baileys'

let handler = async (m, { conn, text}) => {
  const deco = '𖣣ֶㅤ֯⌗ 🌑 ׄ'
  const botname = '𝖮𝖻𝗂𝗍𝗈-𝖡𝗈𝗍_𝖬𝖣'

  if (!text) {
    return conn.sendMessage(m.chat, {
      text: `${deco} ✧ 𝖯𝗈𝗋 𝖿𝖺𝗏𝗈𝗋, 𝗂𝗇𝗀𝗋𝖾𝗌𝖺 𝗅𝗈 𝗊𝗎𝖾 𝖽𝖾𝗌𝖾𝖺𝗌 𝖻𝗎𝗌𝖼𝖺𝗋 𝖾𝗇 𝖯𝗂𝗇𝗍𝖾𝗋𝖾𝗌𝗍.`,
}, { quoted: m})
}

  try {
    await conn.sendMessage(m.chat, { react: { text: '🕒', key: m.key}})

    const results = await pins(text)
    if (!results.length) {
      return conn.sendMessage(m.chat, {
        text: `${deco} ✧ 𝖭𝗈 𝗌𝖾 𝖾𝗇𝖼𝗈𝗇𝗍𝗋𝖺𝗋𝗈𝗇 𝗋𝖾𝗌𝗎𝗅𝗍𝖺𝖽𝗈𝗌 𝗉𝖺𝗋𝖺: *"${text}"*`,
}, { quoted: m})
}

    const medias = results.slice(0, 10).map(img => ({
      type: 'image',
      data: { url: img.hd}
}))

    await conn.sendSylphy(m.chat, medias, {
      caption: `╭─·˚₊· ꒰📌꒱ *「 𝖡𝖴𝖲𝖢𝖠 𝖤𝖭 𝖯𝖨𝖭𝖳𝖤𝖱𝖤𝖲𝖳 」*\n\n𖣣ֶㅤ֯⌗ 🌑 ׄ *𝖡𝖴𝖲𝖠𝖭𝖣𝖮:* "${text}"\n𖣣ֶㅤ֯⌗ 🌑 ׄ *𝖱𝖤𝖲𝖴𝖫𝖳𝖠𝖣𝖮𝖲:* ${medias.length}\n𖣣ֶㅤ֯⌗ 🌑 ׄ *𝖡𝖮𝖳:* ${botname}`,
      quoted: m
})

    await conn.sendMessage(m.chat, { react: { text: '✅', key: m.key}})

} catch (error) {
    console.error(error)
    await conn.sendMessage(m.chat, {
      text: `${deco} ⚠︎ 𝖤𝗋𝗋𝗈𝗋 𝖽𝖾𝗍𝖾𝖼𝗍𝖺𝖽𝗈:\n${error.message}`,
}, { quoted: m})
}
}

handler.help = ['pinterest']
handler.command = ['pinterest', 'pin']
handler.tags = ['dl']

export default handler

const pins = async (query) => {
  try {
    const { data} = await axios.get(`https://api.stellarwa.xyz/search/pinterest?query=${query}`)

    if (data?.status && data?.data?.length) {
      return data.data.map(item => ({
        hd: item.hd,
        mini: item.mini
}))
}

    return []
} catch (error) {
    console.error("𖣣ֶㅤ֯⌗ 🌑 ׄ 𝖤𝗋𝗋𝗈𝗋 𝖺𝗅 𝗈𝖻𝗍𝖾𝗇𝖾𝗋 𝗂𝗆𝖺𝗀𝖾𝗇𝖾𝗌 𝖽𝖾 𝖯𝗂𝗇𝗍𝖾𝗋𝖾𝗌𝗍:", error)
    return []
}
}
