import ws from 'ws'
import fetch from 'node-fetch'

async function handler(m, { conn: _envio, usedPrefix}) {
    const uniqueUsers = new Map()

    // Filtra conexiones activas
    global.conns.forEach((conn) => {
        if (conn.user && conn.ws?.socket?.readyState!== ws.CLOSED) {
            const jid = conn.user.jid.replace(/[^0-9]/g, '')
            uniqueUsers.set(jid, conn.user)
}
})

    // Construye el mensaje de lista
    const message = Array.from(uniqueUsers.values()).map((user, index) => {
        const jid = user.jid.replace(/[^0-9]/g, '')
        const name = user.name || '☘︎ Ｏｂｉｔｏ-Ｂｏｔ ☘︎'
        return `┌  ☘︎  *${index + 1}*: @${jid}\n│  ☘︎  *Link*: http://wa.me/${jid}\n└  ☘︎  *Nombre*: ${name}\n`
}).join('\n')

    const totalUsers = uniqueUsers.size
    const replyMessage = message.length === 0
? '⚠️ No hay subbots activos en este momento.'
: `『 𝖮𝖻𝗂𝗍𝗈-𝖡𝗈𝗍_𝖬𝖣 』⟶ 𝙇𝙄𝙎𝙏𝘼 𝘿𝙀 𝙎𝙐𝘽𝘽𝙊𝙏𝙎 ☘︎\n\n${message.trim()}\n\n📌 *Total activos:* ${totalUsers}`

    // Imagen decorativa
    const img = await (await fetch('https://files.cloudkuimages.guru/images/XvVUewpa.jpg')).buffer()

    await _envio.sendFile(m.chat, img, 'thumbnail.jpg', replyMessage, m, false, {
        mentions: _envio.parseMention(replyMessage)
})
}

handler.command = ['listjadibot', 'bots']
handler.help = ['bots']
handler.tags = ['serbot']

export default handler
