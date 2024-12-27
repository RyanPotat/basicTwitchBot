import config from '../config.json' with { type: 'json' };
import {
  ChatClient,
  AlternateMessageModifier,
  SlowModeRateLimiter
} from '@kararty/dank-twitch-irc';
import { sleep } from './utils.js';

if (!config.username || !config.access_token) {
  throw new Error('Missing username or access_token in config.json');
}

/**
 * @typedef {import('@kararty/dank-twitch-irc').ChatClient} ChatClient
 */
const client = new ChatClient({
  username: config.username.toLowerCase(),
  password: config.access_token,
  ignoreUnhandledPromiseRejections: true,
  rateLimits: 'default' // 'default or 'verifiedBot'
});

client.use(new AlternateMessageModifier(client));
client.use(new SlowModeRateLimiter(client, 10));
client.connect();

client.on('error', (err) => console.error(err.message));

/**
 * Notifications of JOINs sent to any connected client, upon successful
 * joining of a channel.
 *
 * @typedef {import('@kararty/dank-twitch-irc').JoinMessage} JoinMessage
 */
client.on('JOIN', (msg) => console.log(`Joined #${msg.channelName}`));

/**
 * Notifications of PARTs sent to any connected client, upon parting
 * of a channel.
 *
 * @typedef {import('@kararty/dank-twitch-irc').PartMessage} PartMessage
 */
client.on('PART', (msg) => console.log(`Parted #${msg.channelName}`));

async function joinChannels() {
  if (!config.channels?.length) {
    console.log('No channels to join in config.json');
  }

  for (const channel of config.channels) {
    await sleep(500).then(() => client.join(channel.toLowerCase()));
  }
}

client.on('ready', () => {
  console.log('Connected to Twitch');
  return joinChannels();
});

export { client };
