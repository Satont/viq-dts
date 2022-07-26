// @ts-nocheck
import m3u8stream from 'm3u8stream'
import fs from 'fs'
import acrcloud from "acrcloud";

const acr = new acrcloud({
  host: "identify-eu-west-1.acrcloud.com",
  access_key: "2e0a09729af9db20e36f4b1bd16120d5",
  access_secret: "JHLi9RtkwlBLov6LGM8diawl3Ymps9DZPx2ucT9A"
});

const headers = {
  'Content-Type': 'text/plain;charset=UTF-8',
  'Client-ID': 'kimne78kx3ncx6brgo4mv6wki5h1ko',
  'X-Device-Id': 'twitch-web-wall-mason',
	'Device-ID': 'twitch-web-wall-mason',
  'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/86.0.4240.111 Safari/537.36',
}

const gqlRes = await fetch("https://gql.twitch.tv/gql", {
  headers,
  "body": JSON.stringify({
    "operationName": "PlaybackAccessToken",
    "extensions": {
      "persistedQuery": {
        "version": 1,
        "sha256Hash": "0828119ded1c13477966434e15800ff57ddacf13ba1911c129dc2200705b0712"
      }
    },
    "variables": {
      "isLive": true,
      "login": 'vs_code',
      "isVod": false,
      "vodID": "",
      "playerType": "embed"
    }
  }),
  "method": "POST",
  "mode": "cors",
  "credentials": "include"
});
const body = await gqlRes.json()

  const f = async () => {
    const params = new URLSearchParams({
      sig: body.data.streamPlaybackAccessToken.signature,
      token: body.data.streamPlaybackAccessToken.value,
      "player": "twitchweb",
      player_type: 'twitchweb',
      p: parseInt(Math.random() * 999999),
      "type": "any",
      "allow_source": "true",
      "allow_audio_only": "true",
      "allow_spectre": "false",
      'player_backend': 'mediaplayer',
      'fast_bread': true,
      'cdm': 'wv',
      'player_version': '1.2.0'
    });

    const hlsUrl = new URL(`https://usher.ttvnw.net/api/channel/hls/vs_code.m3u8?${params}`);
    const hlsRes = await fetch(hlsUrl.toString(), { headers });
    const data = (await hlsRes.text())
      .replace(/X-TV-TWITCH-AD-URL="[^"]+"/g, 'X-TV-TWITCH-AD-URL="javascript:alert(\'pogo\')"')
      .replace(
      /X-TV-TWITCH-AD-CLICK-TRACKING-URL="[^"]+"/g,
      'X-TV-TWITCH-AD-CLICK-TRACKING-URL="javascript:alert(\'pogo\')"'
      )
      .replace(/X-TV-TWITCH-AD-ADVERIFICATIONS="[^"]+"/g, `X-TV-TWITCH-AD-ADVERIFICATIONS="${Buffer.from('{}').toString('base64')}"`)
      .replace(/#EXT-X-DATERANGE.+CLASS=".*ad.*".+\n/g, '')
      .replace(/\n#EXTINF.+(?<!live)\nhttps:.+/g, '')
      .replace(/.*#.*\n?/gm, '')
      .split('\n')

    const m3stream = m3u8stream(data[data.length - 1], { begin : '25s' })

    m3stream.pipe(fs.createWriteStream('auio.mp3'));
    m3stream.on('end', () => console.log('end'))
  
    return m3stream
  }
  f()
  .then((stream) => {
    return new Promise((resolve) => {
      setTimeout(() => {
        console.log('5s passed')
        stream.end()
        resolve()
      }, 5000)
    })
  })
  .then(() => {
    const sample = fs.readFileSync("./auio.mp3");

    acr.identify(sample).then(metadata => {
      console.dir(metadata, { depth: null });
    });
  })
