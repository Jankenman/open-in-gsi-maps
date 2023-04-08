(() => {
  const openGSImaps = (latitude, longitude, zoom) => {
    if (latitude && longitude && zoom) {
      window.open(`https://maps.gsi.go.jp/#${zoom}/${latitude}/${longitude}/`);
    } else {
      window.open("https://maps.gsi.go.jp/");
    }
  };

  const main = () => {
    const URL = location.href;

    // Google Maps
    if (/https:\/\/www\.google\..+\/maps/.test(URL)) {
      const [latitude, longitude, zoom] = URL.split("@")[1]
        .split("z")[0]
        .split(",");
      openGSImaps(latitude, longitude, zoom);
    }

    // Bing Maps
    else if (URL.startsWith("https://www.bing.com/maps")) {
      const parms = new URLSearchParams(URL);

      const zoom = parms.get("lvl");
      const [latitude, longitude] = parms.get("cp").split("~");

      openGSImaps(latitude, longitude, zoom);
    }

    // GSI Maps
    else if (URL.startsWith("https://maps.gsi.go.jp/#")) {
      // "#"を取る
      const urlHash = location.hash.slice(1);
      const [zoom, latitude, longitude] = urlHash.split("/");

      window.open(
        `https://www.google.com/maps/@?api=1&map_action=map&center=${latitude},${longitude}&zoom=${zoom}`
      );
    }

    // その他
    else {
      openGSImaps();
    }
  };

  main();
})();
