import { sticker} from '../lib/sticker.js'
import axios from 'axios'

const deco = '𖣣ֶㅤ֯⌗ 🌑 ׄ'
const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms))

const fetchSticker = async (text, attempt = 1) => {
  try {
    const response = await axios.get(`https://api.nekorinn.my.id/maker/brat-v2`, {
      params: { text},
      responseType: 'arraybuffer',
})
    return response.data
} catch (error) {
    if (error.response?.status === 429 && attempt <= 3) {
      const retryAfter = error.response.headers['retry-after'] || 5
      await delay(retryAfter * 1000)
      return fetchSticker(text, attempt + 1)
}
    throw error
}
}

let handler = async (m, { conn, text}) => {
  if (m.quoted && m.quoted.text) {
    text = m.quoted.text
} else if (!text) {
    return conn.sendMessage(m.chat, {
      text: `${deco} ✧ 𝖯𝗈𝗋 𝖿𝖺𝗏𝗈𝗋, 𝗋𝖾𝗌𝗉𝗈𝗇𝖽𝖾 𝖺 𝗎𝗇 𝗆𝖾𝗇𝗌𝖺𝗃𝖾 𝗈 𝖾𝗌𝖼𝗋𝗂𝖻𝖾 𝗎𝗇 𝗍𝖾𝗑𝗍𝗈 𝗉𝖺𝗋𝖺 𝖼𝗋𝖾𝖺𝗋 𝖾𝗅 𝖲𝗍𝗂𝖼𝗄𝖾𝗋.`,
}, { quoted: m})
}

  try {
    const buffer = await fetchSticker(text)
    const userId = m.sender
    const packstickers = global.db.data.users[userId] || {}
    const texto1 = packstickers.text1 || global.packsticker
    const texto2 = packstickers.text2 || global.packsticker2

    const stiker = await sticker(buffer, false, texto1, texto2)

    if (stiker) {
      return conn.sendFile(m.chat, stiker, 'sticker.webp', '', m)
} else {
      throw new Error(`${deco} ✧ 𝖭𝗈 𝗌𝖾 𝗉𝗎𝖽𝗈 𝗀𝖾𝗇𝖾𝗋𝖺𝗋 𝖾𝗅 𝗌𝗍𝗂𝖼𝗄𝖾𝗋.`)
}
} catch (error) {
    return conn.sendMessage(m.chat, {
      text: `${deco} ⚠︎ 𝖤𝗋𝗋𝗈𝗋 𝖽𝖾𝗍𝖾𝖼𝗍𝖺𝖽𝗈:\n${error.message}`,
}, { quoted: m})
}
}

handler.command = ['brat']
handler.tags = ['sticker']
handler.help = ['brat *<texto>*']

export default handler
