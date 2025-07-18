(function () {
  function showBlockPopup(reason) {
    // Blur all page
    document.body.style.filter = "blur(6px)";
    document.body.style.pointerEvents = "none";

    // Create popup container
    const overlay = document.createElement("div");
    overlay.style = `
      position: fixed;
      top: 0; left: 0;
      width: 100vw; height: 100vh;
      background: rgba(10, 10, 10, 0.9);
      color: white;
      z-index: 999999;
      display: flex;
      align-items: center;
      justify-content: center;
      flex-direction: column;
      font-family: 'Segoe UI', sans-serif;
    `;

    // Modal box
    const modal = document.createElement("div");
    modal.style = `
      background: #1e1e1e;
      padding: 30px 40px;
      border-radius: 12px;
      box-shadow: 0 0 20px rgba(0,0,0,0.4);
      text-align: center;
      max-width: 90%;
    `;
    modal.innerHTML = `
      <h2 style="font-size: 26px; margin-bottom: 10px;">🚫 ${reason}</h2>
      <p style="font-size: 17px; margin-bottom: 15px;">
        Please disable your AdBlock or Brave Shield and reload the page.
      </p>
    `;

    overlay.appendChild(modal);
    document.body.appendChild(overlay);
  }

  function generateBaitClass(length = 8) {
    return 'ad_' + Math.random().toString(36).substring(2, 2 + length);
  }

  const baitClass = generateBaitClass();
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

  function checkAdblock() {
    let blocked = bait.offsetHeight === 0 || bait.offsetParent === null;

    fetch("https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js", {
      method: "HEAD",
      mode: "no-cors"
    })
      .then(() => {
        if (blocked) showBlockPopup("AdBlock Detected");
      })
      .catch(() => {
        showBlockPopup("AdBlock Detected");
      });
  }

  async function checkBrave() {
    if (navigator.brave && await navigator.brave.isBrave()) {
      showBlockPopup("Brave Browser Detected");
    }
  }

  // Initial check
  window.addEventListener("load", () => {
    checkAdblock();
    checkBrave();
  });

  // Re-check every 15s
  setInterval(() => {
    checkAdblock();
    checkBrave();
  }, 15000);
})();
