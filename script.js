document.getElementById("search").addEventListener("keypress", function(e) {
  if (e.key === "Enter") {
    searchGoogle();
  }
});

let loaderInterval;

const messages = [
  "🤔 Thinking hard...",
  "🐢 Slow network... chill bro",
  "🚀 Launching search...",
  "😴 Internet is waking up...",
  "📡 Finding signal..."
];

// 🔥 loader animation
function showLoader() {
  let loader = document.getElementById("loader");
  let i = 0;

  loader.style.display = "block";
  loader.innerText = messages[i];

  loaderInterval = setInterval(() => {
    i = (i + 1) % messages.length;
    loader.innerText = messages[i];
  }, 1000);
}

function hideLoader() {
  document.getElementById("loader").style.display = "none";
  clearInterval(loaderInterval);
}

// 🔥 MAIN FUNCTION (no popup block)
function openWithLoader(url) {
  let q = document.getElementById("search").value;

  if (q === "") {
    alert("Enter something first!");
    return;
  }

  showLoader();

  let newTab = window.open("about:blank", "_blank");

  if (!newTab) {
    alert("Popup blocked!");
    hideLoader();
    return;
  }

  // 🔥 FULL SCREEN LOADING PAGE (centered)
  newTab.document.write(`
    <html>
    <head>
      <title>Loading...</title>
      <style>
        body {
          margin: 0;
          background: #0b1320;
          color: #00d4ff;
          display: flex;
          justify-content: center;
          align-items: center;
          height: 100vh;
          font-family: Arial;
          flex-direction: column;
        }

        .msg {
          font-size: 20px;
          animation: fade 1s infinite alternate;
        }

        @keyframes fade {
          from { opacity: 0.5; }
          to { opacity: 1; }
        }
      </style>
    </head>
    <body>

      <div class="msg" id="msg">🤔 Thinking hard...</div>

      <script>
        const messages = [
          "🤔 Thinking hard...",
          "🐢 Slow network... chill bro",
          "🚀 Launching search...",
          "😴 Internet is waking up...",
          "📡 Finding signal..."
        ];

        let i = 0;
        setInterval(() => {
          i = (i + 1) % messages.length;
          document.getElementById("msg").innerText = messages[i];
        }, 2000);
      </script>

    </body>
    </html>
  `);

  // 🔥 actual site load
  setTimeout(() => {
    newTab.location.href = url + encodeURIComponent(q);
    hideLoader();
  }, 12000); // tu change kar sakta hai
}

// ✅ ALL SEARCH FUNCTIONS

function searchGoogle() {
  openWithLoader("https://www.google.com/search?q=");
}

function searchYouTube() {
  openWithLoader("https://www.youtube.com/results?search_query=");
}

function searchInstagram() {
  openWithLoader("https://www.instagram.com/explore/tags/");
}

function searchFacebook() {
  openWithLoader("https://www.google.com/search?q=site:facebook.com ");
}

function searchTwitter() {
  openWithLoader("https://twitter.com/search?q=");
}

function searchLinkedIn() {
  openWithLoader("https://www.google.com/search?q=site:linkedin.com ");
}