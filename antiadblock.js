(function () {
  function createBlockScreen(reason) {
    // Blur background
    document.body.style.filter = "blur(8px)";
    document.body.style.pointerEvents = "none";

    // Buat layer gelap
    const blocker = document.createElement("div");
    blocker.style = `
      position: fixed;
      top: 0; left: 0;
      width: 100vw; height: 100vh;
      background: rgba(0, 0, 0, 0.85);
      color: white;
      z-index: 999999;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      font-family: sans-serif;
      text-align: center;
    `;
    blocker.innerHTML = `
      <h2 style="font-size: 28px; margin-bottom: 16px;">🚫 ${reason}</h2>
      <p style="font-size: 18px;">Silakan nonaktifkan AdBlock atau Brave Shield untuk melanjutkan.</p>
    `;

    document.body.appendChild(blocker);
  }

  function randomClass(length = 8) {
    return 'ad_' + Math.random().toString(36).substring(2, 2 + length);
  }

  const baitClass = randomClass();
  const bait = document.createElement("div");
  bait.className = baitClass;
  bait.style.cssText = `
    width: 1px !important;
    height: 1px !important;
    position: absolute !important;
    left: -9999px !important;
    top: -9999px !important;
    background: url('https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js');
  `;
  document.body.appendChild(bait);

  function cekAdblock() {
    let detected = false;

    if (bait.offsetHeight === 0 || bait.offsetParent === null) {
      detected = true;
    }

    fetch("https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js", {
      method: "HEAD",
      mode: "no-cors"
    })
      .then(() => {
        if (detected) createBlockScreen("AdBlock Terdeteksi");
      })
      .catch(() => {
        createBlockScreen("AdBlock Terdeteksi");
      });
  }

  async function cekBrave() {
    if (navigator.brave && await navigator.brave.isBrave()) {
      createBlockScreen("Brave Browser Terdeteksi");
    }
  }

  // Jalankan awal
  window.addEventListener("load", () => {
    cekAdblock();
    cekBrave();
  });

  // Cek ulang setiap 10 detik
  setInterval(() => {
    cekAdblock();
    cekBrave();
  }, 10000);
})();
