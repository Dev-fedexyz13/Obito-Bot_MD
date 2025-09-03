import { WAMessageStubType} from '@whiskeysockets/baileys';
import fetch from 'node-fetch';

// ✨ 𝖮𝖻𝗂𝗍𝗈-𝖡𝗈𝗍_𝖬𝖣: 𝖡𝗂𝖾𝗇𝗏𝖾𝗇𝗂𝖽𝖺𝗌 𝗒 𝖽𝖾𝗌𝗉𝖾𝖽𝗂𝖽𝖺𝗌 𝖼𝗈𝗇 𝖾𝗌𝗍𝗂𝗅𝗈 𝖭𝗂𝗇𝗃𝖺 ✨
export async function before(m, { conn, participants, groupMetadata}) {
  if (!m.isGroup ||!m.messageStubType) return true;

  const stubParams = m.messageStubParameters || [];
  if (!Array.isArray(stubParams) || stubParams.length === 0) return true;

  const chat = global.db.data.chats[m.chat] || {};
  if (typeof chat.welcome === 'undefined') chat.welcome = true;
  if (!chat.welcome) return true;

  const userJid = stubParams[0];
  const username = userJid.split('@')[0];
  const mention = '@' + username;
  const memberCount = groupMetadata.participants?.length || 0;

  let avatar;
  try {
    avatar = await conn.profilePictureUrl(userJid, 'image');
} catch {
    avatar = 'https://i.imgur.com/8B4QYQY.png';
}

  const guildName = encodeURIComponent(groupMetadata.subject);
  const backgroundUrl = encodeURIComponent('https://files.cloudkuimages.guru/images/ADSXpvRm.jpg');
  const apiBase = "https://api.siputzx.my.id/api/canvas";

  async function fetchImage(url) {
    try {
      const res = await fetch(url);
      if (!res.ok) throw new Error('𝖤𝗋𝗋𝗈𝗋 𝖺𝗅 𝗀𝖾𝗇𝖾𝗋𝖺𝗋 𝗂𝗆𝖺𝗀𝖾𝗇 𝖽𝖾 𝖻𝗂𝖾𝗇𝖾𝗇𝗂𝖽𝖺');
      return await res.buffer();
} catch (e) {
      console.error('[𝖮𝖻𝗂𝗍𝗈-𝖡𝗈𝗍_𝖬𝖣] 𝖤𝗋𝗋𝗈𝗋 𝖾𝗇 𝗅𝖺 𝖠𝖯𝖨 𝖽𝖾 𝗂𝗆𝖺𝗀𝖾𝗇:', e);
      const fallbackRes = await fetch(avatar);
      return await fallbackRes.buffer();
}
}

  // 🎉 𝖡𝗂𝖾𝗇𝗏𝖾𝗇𝗂𝖽𝖺
  if (
    m.messageStubType === WAMessageStubType.GROUP_PARTICIPANT_ADD ||
    m.messageStubType === WAMessageStubType.GROUP_PARTICIPANT_INVITE
) {
    const defaultWelcome = `
╭───────────────╮
│  👋 ¡𝖧𝗈𝗅𝖺 ${mention}!   │
╰───────────────╯
𝖡𝗂𝖾𝗇𝗏𝖾𝗇𝗂𝖽𝗈 𝖺 *${groupMetadata.subject}* ˚🌑｡

𝖲𝗈𝗒 *𝖮𝖻𝗂𝗍𝗈-𝖡𝗈𝗍_𝖬𝖣*, 𝗍𝗎 𝖼𝗈𝗆𝗉𝖺𝗇𝖾𝗋𝗈 𝗏𝗂𝗋𝗍𝗎𝖺𝗅 𝖾𝗇 𝖾𝗌𝗍𝖺 𝖼𝗈𝗆𝗎𝗇𝗂𝖽𝖺𝖽.


📌 𝖭𝗈 𝗈𝗅𝗏𝗂𝖽𝖾𝗇 𝗊𝗎𝖾 𝖾𝗅 𝖻𝗈𝗍 𝖺𝗎𝗇 𝖾𝗌𝗍𝖺́ 𝖾𝗇 𝖽𝖾𝗌𝖺𝗋𝗋𝗈𝗅𝗅𝗈. 𝖯𝗈𝗋 𝖿𝖺𝗏𝗈𝗋, 𝗇𝗈 𝖾𝗌𝖼𝗋𝗂𝖻𝖺𝗇 𝖺𝗅 𝗉𝗋𝗂𝗏𝖺𝖽𝗈.

🔗 𝖦𝖱𝖴𝖯𝖮 𝖮𝖥𝖨𝖢𝖨𝖠𝖫: https://chat.whatsapp.com/L7KaSk27pBX7LMZKaaT8HE
📣 𝖢𝖠𝖭𝖠𝖫 𝖮𝖥𝖨𝖢𝖨𝖠𝖫: https://whatsapp.com/channel/0029VbB0TV196H4QK21HLe29

`;

    const welcomeText = (chat.welcomeText || defaultWelcome)
.replace('@user', mention)
.replace('@subject', groupMetadata.subject)
.replace('@desc', groupMetadata.desc?.toString() || '𝖲𝗂𝗇 𝖽𝖾𝗌𝖼𝗋𝗂𝗉𝖼𝗂𝗈𝗇');

    const welcomeApiUrl = `${apiBase}/welcomev2?username=${username}&guildName=${guildName}&memberCount=${memberCount}&avatar=${encodeURIComponent(avatar)}&background=${backgroundUrl}`;
    const imgBuffer = await fetchImage(welcomeApiUrl);

    await conn.sendMessage(m.chat, {
      image: imgBuffer,
      caption: welcomeText,
      mentions: [userJid],
      footer: '˚🌑｡ 𝖣𝖾𝗏𝖥𝖾𝖽𝖾𝟣𝟥 | 𝖮𝖻𝗂𝗍𝗈-𝖡𝗈𝗍_𝖬𝖣',
      buttons: [
        { buttonId: '.menu', buttonText: { displayText: '˚📚｡ 𝖬𝖤𝖭𝖴'}, type: 1},
        { buttonId: '.reg SIN-NOMBRE 👻.17', buttonText: { displayText: '˚🌑｡ 𝖵𝖤𝖱𝖨𝖥𝖨𝖢𝖠𝖱'}, type: 1}
      ],
      headerType: 4
});
}

  // 👋 Despedida 
  else if (
    m.messageStubType === WAMessageStubType.GROUP_PARTICIPANT_LEAVE ||
    m.messageStubType === WAMessageStubType.GROUP_PARTICIPANT_REMOVE
) {
    const defaultBye = `
🌫️ *${mention} 𝗁𝖺 𝖽𝖾𝗃𝖺𝖽𝗈 𝖾𝗅 𝗀𝗋𝗎𝗉𝗈...*

𝖤𝗌𝗉𝖾𝗋𝖺𝗆𝗈𝗌 𝗊𝗎𝖾 𝗋𝖾𝗀𝗋𝖾𝗌𝖾𝗌 𝗉𝗋𝗈𝗇𝗍𝗈 𝖺 *${groupMetadata.subject}*.
𝖠𝗁𝗈𝗋𝖺 𝗌𝗈𝗆𝗈𝗌 ${memberCount} 𝗆𝗂𝖾𝗆𝖻𝗋𝗈𝗌. ¡𝖳𝖾 𝖾𝗑𝗍𝗋𝖺ñ𝖺𝗋𝖾𝗆𝗈𝗌!
`;

    const byeText = (chat.byeText || defaultBye)
.replace('@user', mention)
.replace('@subject', groupMetadata.subject);
    const goodbyeApiUrl = `${apiBase}/goodbyev2?username=${username}&guildName=${guildName}&memberCount=${memberCount}&avatar=${encodeURIComponent(avatar)}&background=${backgroundUrl}`;
    const imgBuffer = await fetchImage(goodbyeApiUrl);

    await conn.sendMessage(m.chat, {
      image: imgBuffer,
      caption: byeText,
      mentions: [userJid]
});
}

  return true;
    }
