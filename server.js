const express = require('express');
const axios = require('axios');
const app = express();
const PORT = process.env.PORT || 3000;

// InvidiousインスタンスのURL（例: us.invidious.io など信頼できるものを選んでください）
const INVIDIOUS_INSTANCE = 'https://invidious.f5.si',
'https://cal1.iv.ggtyler.dev',
'https://eu-proxy.poketube.fun',
'https://iv.melmac.space',
'https://pol1.iv.ggtyler.dev',
'https://lekker.gay',
'https://invidious.materialio.us',
'https://invidious.lunivers.trade',
'https://invidious.reallyaweso.me',
'https://invidious.dhusch.de',
'https://yewtu.be',
'https://usa-proxy2.poketube.fun',
'https://nyc1.iv.ggtyler.dev',
'https://id.420129.xyz',
'https://invidious.darkness.service',
'https://iv.datura.network',
'https://invidious.jing.rocks',
'https://invidious.private.coffee',
'https://youtube.mosesmang.com',
'https://invidious.projectsegfau.lt',
'https://invidious.perennialte.ch',
'https://invidious.einfachzocken.eu',
'https://invidious.adminforge.de',
'https://yt.artemislena.eu',
'https://iv.duti.dev',
'https://invid-api.poketube.fun',
'https://inv.nadeko.net',
'https://invidious.schenkel.eti.br',
'https://invidious.esmailelbob.xyz',
'https://youtube.privacyplz.org',
'https://invidious.0011.lt',
'https://invidious.ducks.party',
'https://invidious.privacyredirect.com'

// ストリームURL取得API
app.get('/api/:videoId', async (req, res) => {
  const videoId = req.params.videoId;
  try {
    // Invidious APIで動画情報取得
    const apiUrl = `${INVIDIOUS_INSTANCE}/api/v1/videos/${videoId}`;
    const response = await axios.get(apiUrl);
    const data = response.data;

    // ストリームURL抽出（例: 一番高品質な動画URLを返す）
    let streamUrl = null;
    if (data.formatStreams && data.formatStreams.length > 0) {
      // 映像と音声が一体型の最高品質を選択
      streamUrl = data.formatStreams[0].url;
    } else if (data.adaptiveFormats && data.adaptiveFormats.length > 0) {
      // 映像・音声分離型の場合も対応
      streamUrl = data.adaptiveFormats[0].url;
    }

    if (streamUrl) {
      res.json({ url: streamUrl });
    } else {
      res.status(404).json({ error: 'Stream URL not found.' });
    }
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch video info.', details: err.message });
  }
});

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
