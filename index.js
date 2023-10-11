import { client } from './src/client.js';
import { changeColor } from './src/changeColor.js';
import config from './config.json' assert { type: 'json' };

/**
 * @typedef {Object} TwitchMessage
 * @property {string} channelID - - Twitch id where the message was sent.
 * @property {string} channelName - Twitch login where the message was sent.
 * @property {string} colorRaw - The chat color of the user.
 * @property {string} displayName - Twitch user's display name.
 * @property {string} messageID - The message id, used for reply threads.
 * @property {string} messageText - The actual message.
 * @property {string} senderUserID - Twitch id of message sender.
 * @property {string} senderUsername - Twitch login of message sender.
 * Reference of common properties you might want to use, not all.
 * Further documentation:
 * https://robotty.github.io/dank-twitch-irc/classes/privmsgmessage.html
 */

/** Twitch event listener for messages in joined chats.
 * @type {TwitchMessage}
 */
client.on('PRIVMSG', async (msg) => {
  // change colors when you send a message
  if (msg.senderUserID === config.id) {
    changeColor(msg.colorRaw);
  }

  // basic chatbot response example
  if (msg.channelName === 'channel_to_farm_in'
        && msg.senderUsername === 'DeepDankDungeonBot') {
    client.say(msg.channelName, '+join');
  }
});

// basic loop for farming chatbots
setInterval(() => {
  client.say('<farming_channel>', '<farming_message>');
}, 24 * 60 * 60 * 1000); // interval: hours, minutes, seconds, milliseconds

// example: farm cookies every 2 hours
setInterval(() => {
  client.say('<your_channel>', '!cookie');
}, 2 * 60 * 60 * 1000);
