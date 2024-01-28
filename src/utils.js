import config from '../config.json' assert { type: 'json' };
import colors from '../colors.json' assert { type: 'json' };

const hexToColor = {
  '#0000FF': 'blue',
  '#8A2BE2': 'blue_violet',
  '#5F9EA0': 'cadet_blue',
  '#D2691E': 'chocolate',
  '#FF7F50': 'coral',
  '#1E90FF': 'dodger_blue',
  '#B22222': 'firebrick',
  '#DAA520': 'golden_rod',
  '#008000': 'green',
  '#FF69B4': 'hot_pink',
  '#FF4500': 'orange_red',
  '#FF0000': 'red',
  '#2E8B57': 'sea_green',
  '#00FF7F': 'spring_green',
  '#9ACD32': 'yellow_green'
};

let cooldown = false;
// listen for your messages to trigger next color change
export const changeColor = async (colorRaw) => {
  if (cooldown) return;
  cooldown = true;
  const
    hexColor = config.color_set === 'twitch_basic'
      ? hexToColor[colorRaw] || config.color_set[0]
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
        authorization: `Bearer ${config.access_token}`
      }
    };
    const url = `chat/color?user_id=${config.id}&color=${encodedColor}`;
    const response = await fetch('https://api.twitch.tv/helix/' + url, options);

    // Return error to console if unsuccessful
    if (response.status !== 204) { console.error(await response.json()); }
  } catch (e) {
    console.error(e);
  } finally {
    cooldown = false;
  }
};

export const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));
