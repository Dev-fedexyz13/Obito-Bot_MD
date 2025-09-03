import axios from 'axios'
const { generateWAMessageContent, generateWAMessageFromContent, proto} = (await import('@whiskeysockets/baileys')).default

let handler = async (m, { conn}) => {
  const deco = '𖣣ֶㅤ֯⌗ 🌑 ׄ'
  const loading = `${deco} 𝖮𝖻𝗂𝗍𝗈-𝖡𝗈𝗍_𝖬𝖣 está invocando los datos del creador desde la dimensión oculta...`
  await conn.sendMessage(m.chat, { text: loading}, { quoted: m})

  async function createImage(url) {
    const { imageMessage} = await generateWAMessageContent({ image: { url}}, {
      upload: conn.waUploadToServer
})
    return imageMessage
}

  const owners = [
    {
      name: '𝖣𝖾𝗏-𝖿𝖾𝖽𝖾𝗑𝗒𝗓',
      desc: `${deco} Creador Principal de  𝖮𝖻𝗂𝗍𝗈-𝖡𝗈𝗍_𝖬𝖣`,
      image: 'https://files.cloudkuimages.guru/images/sS8gtI57.jpg',
      buttons: [
        { name: 'WhatsApp', url: 'https://wa.me/549115678758'},
        { name: 'Instagram', url: 'https://www.instagram.com/Dev_fedexyz13'},
        { name: 'TikTok', url: 'https://www.tiktok.com/@frases_isagi'}
      ]
}
  ]

  let cards = []

  for (let owner of owners) {
    const imageMsg = await createImage(owner.image)

    let formattedButtons = owner.buttons.map(btn => ({
      name: 'cta_url',
      buttonParamsJson: JSON.stringify({
        display_text: btn.name,
        url: btn.url
})
}))

    cards.push({
      body: proto.Message.InteractiveMessage.Body.fromObject({
        text: `${deco} *${owner.name}*\n${owner.desc}`
}),
      footer: proto.Message.InteractiveMessage.Footer.fromObject({
        text: `${deco} Conecta con el creador de 𝖮𝖻𝗂𝗍𝗈-𝖡𝗈𝗍_𝖬𝖣. Explora sus redes, apóyalo y descubre el origen del código que da vida a las sombras.`
}),
      header: proto.Message.InteractiveMessage.Header.fromObject({
        hasMediaAttachment: true,
        imageMessage: imageMsg
}),
      nativeFlowMessage: proto.Message.InteractiveMessage.NativeFlowMessage.fromObject({
        buttons: formattedButtons
})
})
}

  const slideMessage = generateWAMessageFromContent(m.chat, {
    viewOnceMessage: {
      message: {
        messageContextInfo: {
          deviceListMetadata: {},
          deviceListMetadataVersion: 2
},
        interactiveMessage: proto.Message.InteractiveMessage.fromObject({
          body: proto.Message.InteractiveMessage.Body.create({
            text: `${deco} ✨️ 𝖢𝗋𝖾𝖺𝖽𝗈𝗋 𝖽𝖾 𝖮𝖻𝗂𝗍𝗈-𝖡𝗈𝗍_𝖬𝖣 ✨️`
}),
          footer: proto.Message.InteractiveMessage.Footer.create({
            text: `${deco} 𝖤𝗅 𝗈𝗋𝗂𝗀𝖾𝗇 𝖽𝖾 𝗅𝖺 𝗂𝗇𝗍𝖾𝗅𝗂𝗀𝖾𝗇𝖼𝗂𝖺 𝖺𝗎𝗍𝗈𝗇𝗈𝗆𝖺`
}),
          carouselMessage: proto.Message.InteractiveMessage.CarouselMessage.fromObject({
            cards
})
})
}
}
}, {})

  await conn.relayMessage(m.chat, slideMessage.message, { messageId: slideMessage.key.id})
}

handler.help = ['owner']
handler.tags = ['info']
handler.command = ['owner', 'creador', 'donar']

export default handler
