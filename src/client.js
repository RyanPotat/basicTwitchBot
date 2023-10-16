import config from '../config.json' assert { type: 'json' };
import {
  ChatClient,
  AlternateMessageModifier,
  SlowModeRateLimiter
} from '@kararty/dank-twitch-irc';

// init dank-twitch-irc client
const client = new ChatClient({
  username: config.username,
  password: config.twitch_token
});
client.use(new AlternateMessageModifier(client));
client.use(new SlowModeRateLimiter(client, 10));
client.connect();
for (const channel of config.channels) {
  await new Promise((resolve) => setTimeout(resolve, 600))
  client.join(channel);
}

client.on('JOIN', ({ channelName }) => {
  console.log(`Joined #${channelName}`)
});


export { client };
