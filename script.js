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

// 🔥 loader
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

// 🔥 TAB SYSTEM (FIXED)
let tabCount = 0;

function openTab(name, url) {
  let tabs = document.querySelector(".tabs");
  let viewer = document.getElementById("viewer");

  tabCount++;

 let tab = document.createElement("div");
tab.className = "tab active";

// 🔥 get search text
let q = document.getElementById("search").value;

// short version (UI clean rakhne ke liye)
let shortQ = q.length > 12 ? q.substring(0, 12) + "..." : q;

// 🔥 tab text
tab.innerHTML = `
  <span class="tab-text">${name} • ${shortQ}</span>
  <span class="tab-close">❌</span>
`;

let closeBtn = tab.querySelector(".tab-close");

closeBtn.onclick = (e) => {
  e.stopPropagation(); // tab click trigger na ho

  tab.remove();

  // agar active tab delete hua → reset viewer
  if (tab.classList.contains("active")) {
    document.getElementById("viewer").src = "";
  }
};

// full text on hover
tab.title = q;

// remove active
document.querySelectorAll(".tab").forEach(t => t.classList.remove("active"));

tabs.appendChild(tab);

showLoader();

  // 🔥 try iframe load
  viewer.src = url;

  // ⏳ check if blocked
  setTimeout(() => {
    hideLoader();

    try {
      // अगर iframe block hua to error ayega
      let test = viewer.contentWindow.location.href;

      // agar blank ya about:blank hua → blocked
      if (!test || test === "about:blank") {
        window.open(url, "_blank");
      }

    } catch (e) {
      // 🔥 definitely blocked → open new tab
      window.open(url, "_blank");
    }

  }, 2000);

  // 🔁 tab switch
  tab.onclick = () => {
    document.querySelectorAll(".tab").forEach(t => t.classList.remove("active"));
    tab.classList.add("active");

    showLoader();

    setTimeout(() => {
      viewer.src = url;
      hideLoader();
    }, 1000);
  };
}

// 🔍 SEARCH FUNCTIONS

function searchGoogle() {
  let q = document.getElementById("search").value;
  if(q === "") return alert("Enter something first!");

  openTab("Google", "https://www.google.com/search?q=" + encodeURIComponent(q));
}

function searchYouTube() {
  let q = document.getElementById("search").value;
  if(q === "") return alert("Enter something first!");

  openTab("YouTube", "https://www.youtube.com/results?search_query=" + encodeURIComponent(q));
}

function searchTwitter() {
  let q = document.getElementById("search").value;
  if(q === "") return alert("Enter something first!");

  openTab("Twitter", "https://twitter.com/search?q=" + encodeURIComponent(q));
}

// ❌ ये block होते हैं → Google fallback
function searchFacebook() {
  let q = document.getElementById("search").value;
  openTab("Facebook", "https://www.google.com/search?q=site:facebook.com " + encodeURIComponent(q));
}

function searchInstagram() {
  let q = document.getElementById("search").value;
  openTab("Instagram", "https://www.google.com/search?q=site:instagram.com " + encodeURIComponent(q));
}

function searchLinkedIn() {
  let q = document.getElementById("search").value;
  openTab("LinkedIn", "https://www.google.com/search?q=site:linkedin.com " + encodeURIComponent(q));
}
