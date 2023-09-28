import config from './config.json' assert { type: 'json' };
import colors from './colors.json' assert { type: 'json' };

let cooldown = false;
// listen for your messages to trigger next color change
export const changeColor = async (colorRaw) => {
  if (cooldown) return;
  cooldown = true;
  const
    hexColor = config.color_set === 'twitch_basic'
      ? colors.hexToColor[colorRaw]
      : colorRaw;
  const colorArray = colors[config.color_set];
  const colorIndex = colorArray.findIndex((setColor) => setColor === hexColor);
  const finalIndex = colorIndex !== -1 ? colorIndex : 0;
  const newColor = colorArray[(finalIndex + 1) % colorArray.length];
  try {
    const
      encodedColor = encodeURIComponent(newColor === null ? '#FF69B4' : newColor);
    const options = {
      method: 'PUT',
      headers: {
        'Client-ID': config.helix_id,
        authorization: `Bearer ${config.helix_token}`
      }
    };
    const url = `chat/color?user_id=${config.id}&color=${encodedColor}`;
    const response = await fetch('https://api.twitch.tv/helix/' + url, options);
    if (response.status !== 204) { console.error(await response.json()); }
  } catch (e) {
    console.error(e);
  } finally {
    cooldown = false;
  }
};
