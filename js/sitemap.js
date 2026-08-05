// js/sitemap.js
//
// Right-rail sitemap widget. Add new pages/sections to siteMap below and every
// page that includes this script updates automatically, no manual nav editing.

const siteMap = [
  { name: "Home", path: "/home.html" },

  { name: "About", path: "/html/about/about.html" },

  {
    name: "Gaming",
    children: [
      {
        name: "Main",
        path: "/html/gaming/main.html",
      },
      {
        name: "Destiny",
        path: "/html/gaming/destiny/main.html",
        children: [
          {
            name: "Callouts",
            path: "/html/gaming/destiny/callouts/main.html",
            children: [
              {
                name: "Darkness",
                path: "/html/gaming/destiny/callouts/darkness-callouts.html",
              },
              {
                name: "Awoken",
                path: "/html/gaming/destiny/callouts/awoken-callouts.html",
              },
            ],
          },
          {
            name: "Raids",
            path: "/html/gaming/destiny/raids/main.html",
            children: [
              {
                name: "Pantheon",
                path: "/html/gaming/destiny/raids/pantheon/main.html",
                children: [
                  {
                    name: "CR",
                    path: "/html/gaming/destiny/raids/pantheon/calusresplendant.html",
                  },
                ],
              },
              {
                name: "DSC",
                path: "/html/gaming/destiny/raids/dsc.html",
              },
              {
                name: "VOG",
                path: "/html/gaming/destiny/raids/vog.html",
              },
              {
                name: "VOTD",
                path: "/html/gaming/destiny/raids/votd.html",
              },
              {
                name: "LW",
                path: "/html/gaming/destiny/raids/lw.html",
              },
            ],
          },
          {
            name: "Wishwall",
            path: "/html/gaming/destiny/wishwall/wishwall.html",
          },
        ],
      },

      {
        name: "OSRS",
        path: "/html/gaming/osrs/main.html",
      },
    ],
  },

  {
    name: "Media",
    children: [
      {
        name: "Main",
        path: "/html/media/main.html",
      },
      {
        name: "Gallery",
        path: "/html/media/gallery/gallery.html",
      },
      {
        name: "Music",
        path: "/html/media/musicrecs/musicrecs.html",
      },
    ],
  },

  {
    name: "Misc",
    children: [
      {
        name: "Main",
        path: "/html/misc/main.html",
      },
      {
        name: "Firepit",
        path: "/html/misc/firepit/firepit.html",
      },
    ],
  },
];

function nodeContainsCurrentPage(node, currentPath) {
  if (node.path && currentPath.endsWith(node.path)) return true;
  if (!node.children) return false;
  return node.children.some((child) =>
    nodeContainsCurrentPage(child, currentPath),
  );
}

function buildSitemapNode(node, currentPath) {
  const isCurrent = node.path && currentPath.endsWith(node.path);

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
