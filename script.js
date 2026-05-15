// 🔍 ENTER PRESS → MULTI SEARCH
document.getElementById("search").addEventListener("keypress", function(e) {
  if (e.key === "Enter") {
    searchAll();
  }
});

// 🌙 THEME TOGGLE
const toggleBtn = document.getElementById("themeToggle");

toggleBtn.onclick = () => {
  document.body.classList.toggle("light-mode");

  toggleBtn.innerText = document.body.classList.contains("light-mode")
    ? "☀️"
    : "🌙";
};

const settingsBtn = document.getElementById("settingsBtn");
const settingsPanel = document.getElementById("settingsPanel");

// toggle panel
settingsBtn.onclick = () => {
  settingsPanel.classList.toggle("active");
};

// click outside → close
document.addEventListener("click", (e) => {
  if (!e.target.closest(".settings")) {
    settingsPanel.classList.remove("active");
  }
});

let seconds = 0;

function updateUsageTime() {

    seconds++;

    let hrs = String(Math.floor(seconds / 3600)).padStart(2, '0');
    let mins = String(Math.floor((seconds % 3600) / 60)).padStart(2, '0');
    let secs = String(seconds % 60).padStart(2, '0');

    document.getElementById("usageTime").innerText =
        `${hrs}:${mins}:${secs}`;
}

setInterval(updateUsageTime, 1000);

// 🔥 LOADER MESSAGES
let loaderInterval;

const messages = [
  "🤔 Thinking hard...",
  "🐢 Slow network... chill bro",
  "🚀 Launching search...",
  "😴 Internet is waking up...",
  "📡 Finding signal..."
];

// 🔥 SHOW LOADER
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

// 🔥 HIDE LOADER
function hideLoader() {
  document.getElementById("loader").style.display = "none";
  clearInterval(loaderInterval);
}

// ==========================
// 🔥 HISTORY SYSTEM
// ==========================

// SAVE
function saveHistory(q) {
  let history = JSON.parse(localStorage.getItem("searchHistory")) || [];

  history = history.filter(item => item !== q); // remove duplicate
  history.push(q);

  if (history.length > 10) history.shift();

  localStorage.setItem("searchHistory", JSON.stringify(history));
}

// LOAD
function loadHistory() {
  let history = JSON.parse(localStorage.getItem("searchHistory")) || [];
  let list = document.getElementById("historyList");

  if (!list) return;

  list.innerHTML = "";

  history.slice().reverse().forEach(item => {
    let li = document.createElement("li");
    li.innerText = item;

    li.onclick = () => {
      document.getElementById("search").value = item;
      searchAll();
    };

    list.appendChild(li);
  });
}

// CLEAR
function clearHistory() {
  localStorage.removeItem("searchHistory");
  loadHistory();
}

// LOAD ON START
loadHistory();

// ==========================
// 🔥 TAB SYSTEM
// ==========================

function openTab(name, url, isActive = true) {
  let tabs = document.querySelector(".tabs");
  let viewer = document.getElementById("viewer");

  let q = document.getElementById("search").value;
  let shortQ = q.length > 12 ? q.substring(0, 12) + "..." : q;

  let tab = document.createElement("div");
  tab.className = "tab";
  tab.dataset.url = url;

  tab.innerHTML = `
    <span class="tab-text">🌐 ${name} • ${shortQ}</span>
    <span class="tab-refresh">🔄</span>
    <span class="tab-close">❌</span>
  `;

  tab.title = q;
  tabs.appendChild(tab);

  // 🔄 REFRESH
  tab.querySelector(".tab-refresh").onclick = (e) => {
    e.stopPropagation();
    showLoader();
    viewer.src = tab.dataset.url;
    setTimeout(hideLoader, 800);
  };

  // ❌ CLOSE
  tab.querySelector(".tab-close").onclick = (e) => {
    e.stopPropagation();

    let wasActive = tab.classList.contains("active");
    tab.remove();

    if (wasActive) {
      let allTabs = document.querySelectorAll(".tab");

      if (allTabs.length > 0) {
        let last = allTabs[allTabs.length - 1];
        last.classList.add("active");
        viewer.src = last.dataset.url;
      } else {
        viewer.src = "";
      }
    }
  };

  // 🔁 SWITCH
  tab.onclick = () => {
    document.querySelectorAll(".tab").forEach(t => t.classList.remove("active"));
    tab.classList.add("active");

    showLoader();
    setTimeout(() => {
      viewer.src = tab.dataset.url;
      hideLoader();
    }, 800);
  };

  // 🔥 ACTIVE LOAD
  if (isActive) {
    document.querySelectorAll(".tab").forEach(t => t.classList.remove("active"));
    tab.classList.add("active");

    showLoader();
    viewer.src = url;

    setTimeout(() => {
      hideLoader();

      try {
        let test = viewer.contentWindow.location.href;
        if (!test || test === "about:blank") {
          window.open(url, "_blank");
        }
      } catch {
        window.open(url, "_blank");
      }
    }, 2000);
  }
}

// ==========================
// 🔍 SEARCH FUNCTIONS
// ==========================

function searchGoogle() {
  let q = document.getElementById("search").value;
  if(q === "") return alert("Enter something first!");

  saveHistory(q);
  loadHistory();

  openTab("Google", "https://www.google.com/search?q=" + encodeURIComponent(q));
}

function searchYouTube() {
  let q = document.getElementById("search").value;
  if(q === "") return alert("Enter something first!");

  saveHistory(q);
  loadHistory();

  openTab("YouTube", "https://www.youtube.com/results?search_query=" + encodeURIComponent(q));
}

function searchTwitter() {
  let q = document.getElementById("search").value;
  if(q === "") return alert("Enter something first!");

  saveHistory(q);
  loadHistory();

  openTab("Twitter", "https://twitter.com/search?q=" + encodeURIComponent(q));
}

function searchFacebook() {
  let q = document.getElementById("search").value;
  if(q === "") return alert("Enter something first!");

  saveHistory(q);
  loadHistory();

  openTab("Facebook", "https://www.google.com/search?q=site:facebook.com " + encodeURIComponent(q));
}

function searchInstagram() {
  let q = document.getElementById("search").value;
  if(q === "") return alert("Enter something first!");

  saveHistory(q);
  loadHistory();

  if(q.startsWith("@")) {
    openTab("Instagram", "https://www.instagram.com/" + q.substring(1));
  } else {
    openTab("Instagram", "https://www.instagram.com/explore/tags/" + encodeURIComponent(q));
  }
}

function searchLinkedIn() {
  let q = document.getElementById("search").value;
  if(q === "") return alert("Enter something first!");

  saveHistory(q);
  loadHistory();

  openTab("LinkedIn", "https://www.google.com/search?q=site:linkedin.com " + encodeURIComponent(q));
}

// ==========================
// 🚀 MULTI SEARCH (MAIN)
// ==========================

function searchAll() {
  let q = document.getElementById("search").value;
  if(q === "") return alert("Enter something first!");

  saveHistory(q);
  loadHistory();

  openTab("Google", "https://www.google.com/search?q=" + encodeURIComponent(q), true);

  setTimeout(() => {
    openTab("YouTube", "https://www.youtube.com/results?search_query=" + encodeURIComponent(q), false);
  }, 300);

  setTimeout(() => {
    openTab("Twitter", "https://twitter.com/search?q=" + encodeURIComponent(q), false);
  }, 600);

  setTimeout(() => {
    openTab("Instagram", "https://www.instagram.com/explore/tags/" + encodeURIComponent(q), false);
  }, 900);

  setTimeout(() => {
    openTab("LinkedIn", "https://www.google.com/search?q=site:linkedin.com " + encodeURIComponent(q), false);
  }, 1200);

  setTimeout(() => {
    openTab("Facebook", "https://www.google.com/search?q=site:facebook.com " + encodeURIComponent(q), false);
  }, 1500);
}
