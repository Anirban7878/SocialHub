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


function toggleHistory() {
    document.getElementById("historyList")
        .classList.toggle("active");
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

function updateTabCount() {
  let tabCount = document.querySelectorAll(".tab").length;
  document.getElementById("tabCount").innerText = tabCount;
}

document.getElementById("tabButton").onclick = () => {
  document.getElementById("tabs").classList.toggle("active");
};

function openTab(name, url, isActive = true) {
  let tabs = document.querySelector(".tabs");

  let q = document.getElementById("search").value;
  let shortQ = q.length > 12 ? q.substring(0, 12) + "..." : q;

  let tab = document.createElement("div");
  tab.className = "tab";
  tab.dataset.url = url;
  tab.dataset.name = name;

  tab.innerHTML = `
    <span class="tab-text">🌐 ${name} • ${shortQ}</span>
    <span class="tab-refresh">🔄</span>
    <span class="tab-close">❌</span>
  `;

  tab.title = q;
  tabs.appendChild(tab);
  updateTabCount();

  // 🔄 REFRESH
  tab.querySelector(".tab-refresh").onclick = (e) => {
    e.stopPropagation();
    showLoader();
    window.open(tab.dataset.url, tab.dataset.name);
    setTimeout(hideLoader, 800);
  };

  // ❌ CLOSE
  tab.querySelector(".tab-close").onclick = (e) => {
    e.stopPropagation();
    tab.remove();
    updateTabCount();
  };

  // 🔁 SWITCH
  tab.onclick = () => {
    document.querySelectorAll(".tab").forEach(t => t.classList.remove("active"));
    tab.classList.add("active");
    showLoader();
    setTimeout(() => {
      window.open(tab.dataset.url, tab.dataset.name);
      hideLoader();
    }, 800);
  };

  // 🔥 ACTIVE LOAD
  if (isActive) {
    document.querySelectorAll(".tab")
      .forEach(t => t.classList.remove("active"));

    tab.classList.add("active");

    showLoader();

    window.open(url, name);

    setTimeout(() => {
      hideLoader();
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

  // Open all tabs immediately to avoid popup blocker
  window.open("https://www.google.com/search?q=" + encodeURIComponent(q), "Google");
  
  setTimeout(() => {
    window.open("https://www.youtube.com/results?search_query=" + encodeURIComponent(q), "YouTube");
  }, 100);

  setTimeout(() => {
    window.open("https://twitter.com/search?q=" + encodeURIComponent(q), "Twitter");
  }, 200);

  setTimeout(() => {
    window.open("https://www.instagram.com/explore/tags/" + encodeURIComponent(q), "Instagram");
  }, 300);

  setTimeout(() => {
    window.open("https://www.google.com/search?q=site:linkedin.com " + encodeURIComponent(q), "LinkedIn");
  }, 400);

  setTimeout(() => {
    window.open("https://www.google.com/search?q=site:facebook.com " + encodeURIComponent(q), "Facebook");
  }, 500);

  // Also create tabs in panel
  openTab("Google", "https://www.google.com/search?q=" + encodeURIComponent(q), false);
  
  setTimeout(() => {
    openTab("YouTube", "https://www.youtube.com/results?search_query=" + encodeURIComponent(q), false);
  }, 100);

  setTimeout(() => {
    openTab("Twitter", "https://twitter.com/search?q=" + encodeURIComponent(q), false);
  }, 200);

  setTimeout(() => {
    openTab("Instagram", "https://www.instagram.com/explore/tags/" + encodeURIComponent(q), false);
  }, 300);

  setTimeout(() => {
    openTab("LinkedIn", "https://www.google.com/search?q=site:linkedin.com " + encodeURIComponent(q), false);
  }, 400);

  setTimeout(() => {
    openTab("Facebook", "https://www.google.com/search?q=site:facebook.com " + encodeURIComponent(q), false);
  }, 500);
}

const animeData = {
  hindi: [
    {
      name: "Febspot",
      icon: "https://www.google.com/s2/favicons?domain=febspot.com&sz=128",
      url: "https://www.febspot.com/",
      searchUrl: "https://www.febspot.com/search/?q="
    },

    {
      name: "Dailymotion",
      icon: "https://www.google.com/s2/favicons?domain=dailymotion.com&sz=128",
      url: "https://www.dailymotion.com/in",
      searchUrl: "https://www.dailymotion.com/search/"
    },

    {
      name: "AnimeHub",
      icon: "https://www.google.com/s2/favicons?domain=animehub.ac&sz=128",
      url: "https://animehub.ac/",
      searchUrl: "https://animehub.ac/search/"
    }
  ],

  english: [
    {
      name: "Enma",
      icon: "https://www.google.com/s2/favicons?domain=enma.lol&sz=128",
      url: "https://www.enma.lol/",
      searchUrl: "https://www.enma.lol/search?keyword="
    },

    {
      name: "9anime",
      icon: "https://www.google.com/s2/favicons?domain=9anime.ms&sz=128",
      url: "https://9anime.ms/browse",
      searchUrl: "https://9anime.ms/search?q="
    }
  ],

  japanese: [
    {
      name: "Enma",
      icon: "https://www.google.com/s2/favicons?domain=enma.lol&sz=128",
      url: "https://www.enma.lol/",
      searchUrl: "https://www.enma.lol/search?keyword="
    },

    {
      name: "9anime",
      icon: "https://www.google.com/s2/favicons?domain=9anime.ms&sz=128",
      url: "https://9anime.ms/browse",
      searchUrl: "https://9anime.ms/search?q="
    }
  ]
};

function showAnimePlatforms(language, clickedBtn) {

    const container = document.getElementById("animePlatforms");

    document.querySelectorAll(".lang-btn").forEach(btn=>{
        btn.classList.remove("active");
    });

    clickedBtn.classList.add("active");

    // Fade Out
    container.classList.remove("fade-in");
    container.classList.add("fade-out");

    setTimeout(() => {

    container.innerHTML = "";

    animeData[language].forEach(site => {

        const img = document.createElement("img");

        img.src = site.icon;
        img.className = "logo";
        img.title = site.name;

        img.onclick = () => {

            const q = document.getElementById("search").value.trim();

            // Agar search box empty hai
            if (q === "") {
                window.open(site.url, "_blank");
            }
            // Agar search likha hua hai
            else {
                window.open(site.searchUrl + encodeURIComponent(q), "_blank");
            }

        };

        container.appendChild(img);

    });

    // Fade In
    container.classList.remove("fade-out");
    container.classList.add("fade-in");

}, 250);

}
