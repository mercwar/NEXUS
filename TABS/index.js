// ============================================================
// FILENAME: index.js
// AVIS-COMPONENT: MENU-BUILDER
// ARTIFACT-ID: AV-MENU-2026-JS
// STATE-MATRIX-REF: Version 1/STATE/global.state
// ============================================================




/* Empty array to hold files */
const files = [];

/* Hardcoded directories object */
const dirs = {
    TABS: "TABS/",
    AVIS: "TABS/RES/AVIS",
    ROBOTS: "TABS/RES/ROBOTS"
};

/* Stub for GitHub fetch — replace with actual API call */
/* GitHub API fetch for directory contents */
async function do_git(path) {
    // Replace with your repo details
    const user = "mercwar";        // GitHub username/org
    const repo = "NEXUS"; // GitHub repo name
    const branch = "main";         // Branch to read from

    const url = `https://api.github.com/repos/${user}/${repo}/contents/${path}?ref=${branch}`;

    try {
        const response = await fetch(url);
        if (!response.ok) {
            console.error("GitHub API error:", response.statusText);
            return [];
        }
        const data = await response.json();
        // Map only file names
        return data
            .filter(item => item.type === "file")
            .map(item => item.name);
    } catch (err) {
        console.error("do_git fetch failed:", err);
        return [];
    }
}


/* Fill files array from dirs */
function FillFiles() {
    Object.entries(dirs).forEach(([key, value]) => {
        const list = do_git(value);
        list.forEach(fname => {
            files.push({
                name: fname,
                source: value,
                category: key
            });
        });
    });
}

/* Render menu */
function RenderMenu() {
    const menu = document.getElementById("md-list");
    menu.innerHTML = "";
    files.forEach(f => {
        const li = document.createElement("li");
        li.textContent = `[${f.category}] ${f.name}`;
        menu.appendChild(li);
    });
}

/* Example usage */
FillFiles();
RenderMenu();


// Build collapsible sidebar menu
function buildMenu() {
  const menuContainer = document.getElementById("menuContainer");
  menuContainer.innerHTML = "";

  // Group files by category
  const grouped = {};
  files.forEach(file => {
    if (!grouped[file.category]) {
      grouped[file.category] = [];
    }
    grouped[file.category].push(file);
  });

  // Create collapsible sections
  for (const category in grouped) {
    const section = document.createElement("div");
    section.className = "menu-section";

    const header = document.createElement("div");
    header.className = "menu-header";
    header.textContent = category;
    header.onclick = () => {
      content.classList.toggle("collapsed");
    };

    const content = document.createElement("div");
    content.className = "menu-content collapsed";

    grouped[category].forEach(file => {
      const link = document.createElement("a");
      link.href = "#";
      link.textContent = file.name;
      link.onclick = () => loadFile("html_obj.html", file.source);
      content.appendChild(link);
    });

    section.appendChild(header);
    section.appendChild(content);
    menuContainer.appendChild(section);
  }
}



// Initialize menu on page load
document.addEventListener("DOMContentLoaded", buildMenu);
// ============================================================
// FILENAME: index.js
// AVIS-COMPONENT: MENU-BUILDER + PRISM RICH DISPLAY
// ARTIFACT-ID: AV-JS-2026-MENU
// STATE-MATRIX-REF: Version 1/STATE/global.state
// ============================================================

let activePath = null;
let lastFetchedFileContent = null;

function injectPrismDependencies() {
  if (document.getElementById("prism-core-lib")) return;

  const linkEl = document.createElement("link");
  linkEl.rel = "stylesheet";
  linkEl.href = "https://cdnjs.cloudflare.com/ajax/libs/prism/1.29.0/themes/prism-tomorrow.min.css";
  document.head.appendChild(linkEl);

  const scriptEl = document.createElement("script");
  scriptEl.id = "prism-core-lib";
  scriptEl.src = "https://cdnjs.cloudflare.com/ajax/libs/prism/1.29.0/prism.min.js";

  scriptEl.onload = () => {
    const langs = [
      "javascript","typescript","json","markdown","python",
      "css","c","cpp","bash","java","go","rust"
    ];
    langs.forEach(lang => {
      const s = document.createElement("script");
      s.src = `https://cdnjs.cloudflare.com/ajax/libs/prism/1.29.0/components/prism-${lang}.min.js`;
      document.body.appendChild(s);
    });

    // Block PHP completely
    delete Prism.languages.php;
    Prism.hooks.add("before-highlight", env => {
      if (env.language === "php") env.language = "none";
    });
  };

  document.body.appendChild(scriptEl);
}

function getPrismLanguageClass(path) {
  const lower = path.toLowerCase();

  if (lower.endsWith(".js") || lower.endsWith(".jsx")) return "language-javascript";
  if (lower.endsWith(".ts") || lower.endsWith(".tsx")) return "language-typescript";
  if (lower.endsWith(".json")) return "language-json";
  if (lower.endsWith(".md")) return "language-markdown";
  if (lower.endsWith(".py")) return "language-python";
  if (lower.endsWith(".html") || lower.endsWith(".xml")) return "language-markup";
  if (lower.endsWith(".css")) return "language-css";
  if (lower.endsWith(".sh") || lower.endsWith(".bash")) return "language-bash";
  if (lower.endsWith(".c") || lower.endsWith(".h")) return "language-c";
  if (lower.endsWith(".cpp") || lower.endsWith(".hpp")) return "language-cpp";

  // NEW: Java support
  if (lower.endsWith(".java")) return "language-java";

  // NEW: ASM support (map to clike or custom)
  if (lower.endsWith(".asm")) return "language-clike"; // Prism doesn’t have native ASM, clike is closest

  // NEW: PHP support
  if (lower.endsWith(".php")) return "language-php";

  return "language-none";
}

function renderPrismCode(rawCode, path) {
  const langClass = getPrismLanguageClass(path);
  const safe = rawCode
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");

  return `
    <pre class="${langClass}" style="margin:0; padding:1rem; background:transparent;">
      <code class="${langClass}">${safe}</code>
    </pre>
  `;
}

// Override loadFile to use Prism rendering
function loadFile(wrapperUrl, sourceUrl) {
  activePath = sourceUrl;
  fetch(wrapperUrl)
    .then(response => response.text())
    .then(wrapperHtml => {
      document.getElementById("fileContent").innerHTML = wrapperHtml;
      return fetch(sourceUrl);
    })
    .then(response => response.text())
    .then(sourceCode => {
      lastFetchedFileContent = sourceCode;
      const viewDiv = document.querySelector(".source-view");
      if (viewDiv) {
        viewDiv.innerHTML = renderPrismCode(sourceCode, sourceUrl);
        Prism.highlightAllUnder(viewDiv); // apply Prism highlighting
      }
    })
    .catch(err => {
      document.getElementById("fileContent").innerHTML =
        "<p style='color:red'>Error loading file.</p>";
    });
}

// Initialize
document.addEventListener("DOMContentLoaded", () => {
  injectPrismDependencies();
  buildMenu();
});
