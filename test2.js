// @ts-nocheck
const data = await fetch("https://gql.twitch.tv/gql", {
  "headers": {
    "client-id": "kimne78kx3ncx6brgo4mv6wki5h1ko",
    "content-type": "text/plain; charset=UTF-8",
  },
  "referrer": "https://www.twitch.tv/",
  "referrerPolicy": "strict-origin-when-cross-origin",
  "body": "{\"operationName\":\"PlaybackAccessToken_Template\",\"query\":\"query PlaybackAccessToken_Template($login: String!, $isLive: Boolean!, $vodID: ID!, $isVod: Boolean!, $playerType: String!) {  streamPlaybackAccessToken(channelName: $login, params: {platform: \\\"web\\\", playerBackend: \\\"mediaplayer\\\", playerType: $playerType}) @include(if: $isLive) {    value    signature    __typename  }  videoPlaybackAccessToken(id: $vodID, params: {platform: \\\"web\\\", playerBackend: \\\"mediaplayer\\\", playerType: $playerType}) @include(if: $isVod) {    value    signature    __typename  }}\",\"variables\":{\"isLive\":true,\"login\":\"bogush\",\"isVod\":false,\"vodID\":\"\",\"playerType\":\"site\"}}",
  "method": "POST",
  "mode": "cors",
  "credentials": "include"
});

console.log(await data.json())