// js/sitemap.js
//
// Right-rail sitemap widget. Add new pages/sections to siteMap below and every
// page that includes this script updates automatically, no manual nav editing.

// Paths are written without the ".html" extension: Neocities serves clean
// URLs (a page saved as /foo/bar.html loads at /foo/bar, and normalizes
// window.location.pathname to that extensionless form), so links here match
// what actually ends up in the address bar.
// The site used to be a personal page with About/Gaming/Media/Misc
// sections; those have been archived (moved to /archive) now that the
// site is built around Doug's Playground. Re-add entries here (pointing
// at /archive/...) if any of that ever comes back.
const siteMap = [
  { name: "Home", path: "/home" },

  { name: "Press Kit", path: "/html/press/press" },
];

// Neocities serves "clean URLs": a page saved as /foo/bar.html is reachable
// (and normalizes window.location.pathname) as /foo/bar, with no extension.
// Compare paths with any trailing ".html" stripped so highlighting still
// matches whether or not the browser's URL has the extension.
function normalizePath(path) {
  return path.replace(/\.html$/i, "");
}

function pathMatches(currentPath, nodePath) {
  return normalizePath(currentPath).endsWith(normalizePath(nodePath));
}

function nodeContainsCurrentPage(node, currentPath) {
  if (node.path && pathMatches(currentPath, node.path)) return true;
  if (!node.children) return false;
  return node.children.some((child) =>
    nodeContainsCurrentPage(child, currentPath),
  );
}

function buildSitemapNode(node, currentPath) {
  const isCurrent = node.path && pathMatches(currentPath, node.path);

  if (node.children && node.children.length) {
    const details = document.createElement("details");
    details.className = "sitemap-folder";
    details.open = nodeContainsCurrentPage(node, currentPath);

    const summary = document.createElement("summary");
    summary.className = "sitemap-folder-label";

    if (node.path) {
      const link = document.createElement("a");
      link.href = node.path;
      link.textContent = node.name;
      if (isCurrent) link.classList.add("sitemap-current");
      summary.appendChild(link);
    } else {
      summary.textContent = node.name;
    }

    details.appendChild(summary);

    const childList = document.createElement("ul");
    childList.className = "sitemap-tree";
    node.children.forEach((child) => {
      const li = document.createElement("li");
      li.appendChild(buildSitemapNode(child, currentPath));
      childList.appendChild(li);
    });
    details.appendChild(childList);

    return details;
  }

  const link = document.createElement("a");
  link.href = node.path;
  link.textContent = node.name;
  link.className = "sitemap-page";
  if (isCurrent) link.classList.add("sitemap-current");
  return link;
}

function renderSitemap(containerId = "site-map-widget") {
  const container = document.getElementById(containerId);
  if (!container) return;

  const currentPath = window.location.pathname;
  const rootList = document.createElement("ul");
  rootList.className = "sitemap-tree sitemap-root";

  siteMap.forEach((node) => {
    const li = document.createElement("li");
    li.appendChild(buildSitemapNode(node, currentPath));
    rootList.appendChild(li);
  });

  container.innerHTML = "";
  container.appendChild(rootList);
}

document.addEventListener("DOMContentLoaded", () => renderSitemap());
