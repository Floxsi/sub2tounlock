(function () {
  function showBlockPopup(reason, detail) {
    // Blur background
    document.body.style.filter = "blur(6px)";
    document.body.style.pointerEvents = "none";

    // Overlay
    const overlay = document.createElement("div");
    overlay.style = `
      position: fixed;
      top: 0; left: 0;
      width: 100vw; height: 100vh;
      background: rgba(10, 10, 10, 0.92);
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
        ${detail}
      </p>
    `;

    overlay.appendChild(modal);
    document.body.appendChild(overlay);
  }

  function isNotChrome() {
    const ua = navigator.userAgent.toLowerCase();
    const isChrome = /chrome/.test(ua) && !/edge|edg|opr|brave/.test(ua);
    return !isChrome;
  }

  function checkBrowser() {
    if (isNotChrome()) {
      showBlockPopup("Browser Not Supported", "This website only works in Chrome. Please open in Google Chrome browser.");
    }
  }

  window.addEventListener("load", checkBrowser);
})();
