# Pokedex-bot

1) Read Pokecord messages
2) If message is a random encounter download the image.
3) Perform a reverse image search using the downloaded image in google.
4) Reply with a url to the reverse image search

```
npm install
screen chromium --headless --disable-gpu --remote-debugging-port=9222 &
screen node bot.js &
```
