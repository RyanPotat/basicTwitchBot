import { client } from './src/client.js';
import { changeColor } from './src/utils.js';
import config from './config.json' with { type: 'json' };

/**
 * @typedef {import('@kararty/dank-twitch-irc').PrivmsgMessage} PrivmsgMessage
 *
 * Reference of common properties you might want to use, not all.
 * @property {string} msg.channelID - - Twitch id where the message was sent.
 * @property {string} msg.channelName - Twitch login where the message was sent.
 * @property {string} msg.colorRaw - The chat color of the user.
 * @property {string} msg.displayName - Twitch user's display name.
 * @property {string} msg.messageID - The message id, used for reply threads.
 * @property {string} msg.messageText - The actual message.
 * @property {string} msg.senderUserID - Twitch id of message sender.
 * @property {string} msg.senderUsername - Twitch login of message sender.
 *
 * Further documentation:
 * https://kararty.github.io/dank-twitch-irc/
 */

/**
 * Twitch event listener for standard chat messages in joined chats.
 * @param {PrivmsgMessage} msg - The message object.
 */
client.on('PRIVMSG', async (msg) => {
  // Change colors when you send a message
  if (msg.senderUserID === config.id) changeColor(msg.colorRaw);

  // Basic chatbot response example
  if (
    msg.channelName === 'channel_to_farm_in' && 
    msg.senderUsername === 'DeepDankDungeonBot'
  ) {
    return client.say(msg.channelName, '+join');
  }

  // Ignore messages from non-whitelisted channels, to run commands
  if (!config.whitelist_channels.includes(msg.senderUsername.toLowerCase())) {
    return;
  }

  // Example possible usage for a command
  if (msg.messageText.startsWith('!info')) {
    // Get arguments from message (all words split by spaces)
    const args = msg.messageText
      .slice('!info'.length) // <- slice() removes the first n characters from a string
      .trim() // <- trim() removes whitespace from both ends of a string
      .split(' '); // <- split() splits a string into an array of substrings

    // If there are no arguments, (no values in the args array), return an error message
    if (!args.length) {
      return client.say(
        msg.channelName,
        'No channel provided, please provide a channel to get info for.'
      );
    }

    // Perform some action on those args, such as:
    const response = await fetch(
      `https://api.ivr.fi/v2/twitch/user?login=${encodeURIComponent(args[0])}`
    );

    // Return error to console if unsuccessful
    if (!response.ok) {
      console.error(`HTTP error! status: ${response.status}`);
    }

    // Parse the response as JSON
    const data = await response.json();

    // If the response is empty, return an error message
    if (!data.length) {
      return client.say(
        msg.channelName,
        `No data found for channel: ${args[0]}`
      );
    }

    // Build a nice message from the response
    const message = `ID: ${data[0].id}, Followers: ${data[0].followers.toLocaleString()}`;

    // Send the very cool response to chat
    return client.say(
      msg.channelName,
      `OpieOP Clap ${message}`
    );
  }
});

// Basic loop for farming chatbots
setInterval(() => {
  client.say('<farming_channel>', '<farming_message>');
}, 24 * 60 * 60 * 1000); // interval: hours, minutes, seconds, milliseconds

// Example: farm cookies every 2 hours
setInterval(() => {
  client.say('<your_channel>', '!cookie');
}, 2 * 60 * 60 * 1000);
