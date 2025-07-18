(function(){
  // Generate class umpan acak
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

    // Cek via offset
    if (bait.offsetHeight === 0 || bait.offsetParent === null) {
      detected = true;
    }

    // Coba akses file JS yang sering diblok
    fetch("https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js", {method: "HEAD", mode: "no-cors"})
      .then(() => {
        if (detected) triggerBlocked("AdBlock Terdeteksi!");
      })
      .catch(() => {
        triggerBlocked("AdBlock Terdeteksi!");
      });
  }

  // Deteksi Brave
  async function cekBrave() {
    if (navigator.brave && await navigator.brave.isBrave()) {
      triggerBlocked("Brave Browser Terdeteksi!");
    }
  }

  // Trigger jika terdeteksi
  function triggerBlocked(reason) {
    console.log("[⚠️ Proteksi] " + reason);
    // Misalnya munculin layer blokir
    let blocker = document.createElement("div");
    blocker.style = `
      position: fixed; top: 0; left: 0; width: 100%; height: 100%;
      background: rgba(0,0,0,0.9); color: white; z-index: 999999;
      display: flex; align-items: center; justify-content: center; font-size: 24px;
    `;
    blocker.innerHTML = reason + "<br>Silakan matikan adblock untuk lanjut.";
    document.body.appendChild(blocker);
  }

  // Eksekusi awal & pengulangan
  cekAdblock();
  cekBrave();

  // Ulangi cek tiap 10 detik biar susah di bypass
  setInterval(() => {
    cekAdblock();
    cekBrave();
  }, 10000);
})();
