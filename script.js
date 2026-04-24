// 🔍 ENTER PRESS → MULTI SEARCH
document.getElementById("search").addEventListener("keypress", function(e) {
  if (e.key === "Enter") {
    searchAll();
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

// 🔥 LOADER
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

// 🔥 TAB SYSTEM
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
    setTimeout(() => hideLoader(), 800);
  };

  // ❌ CLOSE
  tab.querySelector(".tab-close").onclick = (e) => {
    e.stopPropagation();

    let wasActive = tab.classList.contains("active");
    tab.remove();

    if (wasActive) {
      let allTabs = document.querySelectorAll(".tab");

      if (allTabs.length > 0) {
        let lastTab = allTabs[allTabs.length - 1];
        lastTab.classList.add("active");
        viewer.src = lastTab.dataset.url;
      } else {
        viewer.src = "";
      }
    }
  };

  // 🔁 SWITCH TAB
  tab.onclick = () => {
    document.querySelectorAll(".tab").forEach(t => t.classList.remove("active"));
    tab.classList.add("active");

    showLoader();
    setTimeout(() => {
      viewer.src = tab.dataset.url;
      hideLoader();
    }, 800);
  };

  // 🔥 ACTIVE / BACKGROUND CONTROL
  if (isActive) {
    document.querySelectorAll(".tab").forEach(t => t.classList.remove("active"));
    tab.classList.add("active");

    showLoader();
    viewer.src = url;

    setTimeout(() => {
      hideLoader();

      // ⚠️ iframe block detect
      try {
        let test = viewer.contentWindow.location.href;
        if (!test || test === "about:blank") {
          window.open(url, "_blank");
        }
      } catch (e) {
        window.open(url, "_blank");
      }

    }, 2000);
  }
}

// 🔍 SINGLE SEARCHES

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

function searchFacebook() {
  let q = document.getElementById("search").value;
  if(q === "") return alert("Enter something first!");
  openTab("Facebook", "https://www.google.com/search?q=site:facebook.com " + encodeURIComponent(q));
}

function searchInstagram() {
  let q = document.getElementById("search").value;
  if(q === "") return alert("Enter something first!");

  if(q.startsWith("@")) {
    openTab("Instagram", "https://www.instagram.com/" + q.substring(1));
  } else {
    openTab("Instagram", "https://www.instagram.com/explore/tags/" + encodeURIComponent(q));
  }
}

function searchLinkedIn() {
  let q = document.getElementById("search").value;
  if(q === "") return alert("Enter something first!");
  openTab("LinkedIn", "https://www.google.com/search?q=site:linkedin.com " + encodeURIComponent(q));
}

// 🚀 MULTI SEARCH (MAIN FEATURE)

function searchAll() {
  let q = document.getElementById("search").value;
  if(q === "") return alert("Enter something first!");

  // first visible tab
  openTab("Google", "https://www.google.com/search?q=" + encodeURIComponent(q), true);

  // background tabs
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
