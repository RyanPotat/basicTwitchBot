# basicTwitchBot

A tiny personal chatbot to change your color every message.

## Prerequisites

Before you begin, ensure you have the following installed:

- [Node.js](https://nodejs.org/) (LTS version recommended)
- [npm](https://www.npmjs.com/) (Node Package Manager)

## Installation

Open Command Prompt, Windows Powershell, or a similar terminal to enter the following commands to install the bot:

1. **Clone the Repository**: Start by cloning the bot's repository to your local machine.

    ```bash
    git clone https://github.com/RyanPotat/basicTwitchBot.git
    ```
    
2. **Install Dependencies**: Install the required Node.js packages by running:

    ```bash
    npm install
    ```

## Configuration

You'll need to configure the bot before you can use it. Open `example-config.json`:

```bash
nano config.json
```

And then enter the following:

- `id` - Your Twitch user ID.
- `username` - Your Twitch user login. Remember it must be lowercase!
- `twitch_token` - [Twitch OAuth Token](https://twitchapps.com/tmi/) to generate an OAuth token for Twitch.
- `helix_id` and `helix_token` - [Twitch Helix API Access](https://twitchtokengenerator.com/) to generate your Twitch Helix API access token and client ID.
- `channels` - A list of channels to join. Keep in mind the usernames must be lowercase!
- `color_set` - Choose from the `colors.json` list to find a color set to your liking, or create your own unique set of colors. Defaults to the standard Twitch colors. Keep in mind you must have Turbo or Prime to use anything other than the standard Twitch colors.

Available color sets:
1. twitch_basic
2. pastels
3. longPastels
4. rainbow
5. longRainbow
6. earthTones
7. neon
8. grayscale
9. coolBlues
10. warmReds
11. vibrantGreens
12. deepPurples
13. candyShop
14. sunsetShades
15. autumnTones
16. oceanBlues
17. burger
18. christmas
19. halloween

Available color sets:
1. twitch_basic
2. pastels
3. longPastels
4. rainbow
5. longRainbow
6. earthTones
7. neon
8. grayscale
9. coolBlues
10. warmReds
11. vibrantGreens
12. deepPurples
13. candyShop
14. sunsetShades
15. autumnTones
16. oceanBlues
17. burger
18. christmas
19. halloween

Now, just rename `example-config.json` to `config.json`

## Usage

Once the installation and configuration are complete, you can start using the bot. Run the following command:

```bash
npm start
```
Optionally you can use PM2 to run this process in the background, here's some basic instructions to set it up. First, run this code to install:

```bash
npm install -g pm2
```

Now if you are still in the same directory as the repository you just cloned, simply run:

```bash
pm2 start index.js
```

You can check the status of the application by running: 

```bash
pm2 list
```

And check logs with:

```bash
pm2 logs
```

To stop the application:

```bash
pm2 start index.js
```


