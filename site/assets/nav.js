/**
 * global-docs site chrome: sidebar, search, breadcrumb, prev/next.
 * Expects window.__GD__ = { base: '' | '../' | '../../', pageId: string }
 * Body must contain <main id="gd-source" class="gd-prose">…</main> before this script.
 */
(function () {
  "use strict";

  /** Title shown in <title> and breadcrumbs (current page). */
  var PAGE = {
    home: { title: "Home", nav: "Home" },
    faq: { title: "Quick reference FAQ", nav: "FAQ (Quick reference)" },
    "orgs/index": { title: "Organizations", nav: "Overview" },
    "orgs/overview": { title: "Organization overview", nav: "Organization overview" },
    "orgs/javcb-prod": { title: "Org: javcb-prod", nav: "javcb-prod" },
    "orgs/javcb-staging": { title: "Org: javcb-staging", nav: "javcb-staging" },
    "orgs/javcb-templates": { title: "Org: javcb-templates", nav: "javcb-templates" },
    "orgs/javcb-archive": { title: "Org: javcb-archive", nav: "javcb-archive" },
    "orgs/javcb-ai": { title: "Org: javcb-ai", nav: "javcb-ai" },
    "ai/index": { title: "AI Rules", nav: "Overview" },
    "ai/base-rules": { title: "Base rules", nav: "base-rules" },
    "ai/personas": { title: "Personas", nav: "personas" },
    "ai/languages": { title: "Languages", nav: "languages" },
    "ai/security": { title: "Security", nav: "security" },
    "ai/workflow": { title: "Workflow", nav: "workflow" },
    "ai/quality-bar": { title: "Quality bar", nav: "quality-bar" },
    "ai/ui-ux-style": { title: "UI/UX style", nav: "ui-ux-style" },
    "ai/design-system": { title: "Design system", nav: "design-system" },
    "ai/review-checklist": { title: "Review checklist", nav: "review-checklist" },
    "ai/future-ideas": { title: "Future ideas", nav: "future-ideas" },
    "architecture/index": { title: "Architecture", nav: "Overview" },
    "architecture/system-overview": { title: "System overview", nav: "system-overview" },
    "architecture/core-vs-adapters": { title: "Core vs adapters", nav: "core-vs-adapters" },
    "architecture/data-platforms": { title: "Data platforms", nav: "data-platforms" },
    "architecture/sql-strategy": { title: "SQL strategy", nav: "sql-strategy" },
    "architecture/local-machine-layout": { title: "Local machine layout", nav: "local-machine-layout" },
    "processes/index": { title: "Processes", nav: "Overview" },
    "processes/maker-checker": { title: "Maker / checker", nav: "maker-checker" },
    "processes/autonomous-build": { title: "Autonomous build", nav: "autonomous-build" },
    "processes/repo-setup-standard": { title: "Repo setup standard", nav: "repo-setup-standard" },
    "processes/new-repo-checklist": { title: "New repo checklist", nav: "new-repo-checklist" },
    "processes/access-tokens": { title: "Access tokens", nav: "access-tokens" },
    "processes/updating-docs": { title: "Updating docs", nav: "updating-docs" },
    "processes/modularization-playbook": { title: "Modularization playbook", nav: "modularization-playbook" },
    "processes/promote-staging-to-prod": { title: "Promote staging to prod", nav: "promote-staging-to-prod" },
    "processes/template-intake": { title: "Template intake", nav: "template-intake" },
    "processes/setup-history": { title: "Setup history", nav: "setup-history" },
    "standards/index": { title: "Standards", nav: "Overview" },
    "standards/python": { title: "Python", nav: "python" },
    "standards/sql": { title: "SQL", nav: "sql" },
    "standards/javascript-typescript": { title: "JavaScript / TypeScript", nav: "javascript-typescript" },
    "standards/excel-automation": { title: "Excel automation", nav: "excel-automation" },
    "standards/configuration": { title: "Configuration", nav: "configuration" },
    "standards/gitignore-template": { title: "Gitignore template", nav: "gitignore-template" },
    "standards/env-example-template": { title: ".env.example template", nav: "env-example-template" },
    "standards/readme-template": { title: "README template", nav: "readme-template" },
    "standards/commit-messages": { title: "Commit messages", nav: "commit-messages" },
    "standards/branch-discipline": { title: "Branch discipline", nav: "branch-discipline" },
    "standards/naming": { title: "Naming", nav: "naming" },
  };

  var PAGE_ORDER = [
    "home",
    "faq",
    "orgs/index",
    "orgs/overview",
    "orgs/javcb-prod",
    "orgs/javcb-staging",
    "orgs/javcb-templates",
    "orgs/javcb-archive",
    "orgs/javcb-ai",
    "ai/index",
    "ai/base-rules",
    "ai/personas",
    "ai/languages",
    "ai/security",
    "ai/workflow",
    "ai/quality-bar",
    "ai/ui-ux-style",
    "ai/design-system",
    "ai/review-checklist",
    "ai/future-ideas",
    "architecture/index",
    "architecture/system-overview",
    "architecture/core-vs-adapters",
    "architecture/data-platforms",
    "architecture/sql-strategy",
    "architecture/local-machine-layout",
    "processes/index",
    "processes/maker-checker",
    "processes/autonomous-build",
    "processes/repo-setup-standard",
    "processes/new-repo-checklist",
    "processes/access-tokens",
    "processes/updating-docs",
    "processes/modularization-playbook",
    "processes/promote-staging-to-prod",
    "processes/template-intake",
    "processes/setup-history",
    "standards/index",
    "standards/python",
    "standards/sql",
    "standards/javascript-typescript",
    "standards/excel-automation",
    "standards/configuration",
    "standards/gitignore-template",
    "standards/env-example-template",
    "standards/readme-template",
    "standards/commit-messages",
    "standards/branch-discipline",
    "standards/naming",
  ];

  /** Collapsible groups (sidebar order). Single items rendered above groups. */
  var SIDEBAR = [
    { kind: "link", pageId: "home" },
    { kind: "link", pageId: "faq" },
    {
      kind: "group",
      label: "Orgs",
      pageIds: [
        "orgs/index",
        "orgs/overview",
        "orgs/javcb-prod",
        "orgs/javcb-staging",
        "orgs/javcb-templates",
        "orgs/javcb-archive",
        "orgs/javcb-ai",
      ],
    },
    {
      kind: "group",
      label: "AI Rules",
      pageIds: [
        "ai/index",
        "ai/base-rules",
        "ai/personas",
        "ai/languages",
        "ai/security",
        "ai/workflow",
        "ai/quality-bar",
        "ai/ui-ux-style",
        "ai/design-system",
        "ai/review-checklist",
        "ai/future-ideas",
      ],
    },
    {
      kind: "group",
      label: "Architecture",
      pageIds: [
        "architecture/index",
        "architecture/system-overview",
        "architecture/core-vs-adapters",
        "architecture/data-platforms",
        "architecture/sql-strategy",
        "architecture/local-machine-layout",
      ],
    },
    {
      kind: "group",
      label: "Processes",
      pageIds: [
        "processes/index",
        "processes/maker-checker",
        "processes/autonomous-build",
        "processes/repo-setup-standard",
        "processes/new-repo-checklist",
        "processes/access-tokens",
        "processes/updating-docs",
        "processes/modularization-playbook",
        "processes/promote-staging-to-prod",
        "processes/template-intake",
        "processes/setup-history",
      ],
    },
    {
      kind: "group",
      label: "Standards",
      pageIds: [
        "standards/index",
        "standards/python",
        "standards/sql",
        "standards/javascript-typescript",
        "standards/excel-automation",
        "standards/configuration",
        "standards/gitignore-template",
        "standards/env-example-template",
        "standards/readme-template",
        "standards/commit-messages",
        "standards/branch-discipline",
        "standards/naming",
      ],
    },
  ];

  function pageIdToPath(pageId) {
    if (pageId === "home") return "index.html";
    if (pageId === "faq") return "faq.html";
    return pageId + ".html";
  }

  function hrefTo(pageId, base) {
    return base + pageIdToPath(pageId);
  }

  function breadcrumbMidSegment(pageId) {
    if (pageId === "home" || pageId === "faq") return null;
    var i = pageId.indexOf("/");
    return i >= 0 ? pageId.slice(0, i) : null;
  }

  function fillBreadcrumb(ol, pageId, base) {
    ol.innerHTML = "";
    var liRoot = document.createElement("li");
    var aRoot = document.createElement("a");
    aRoot.href = hrefTo("home", base);
    aRoot.textContent = "global-docs";
    liRoot.appendChild(aRoot);
    ol.appendChild(liRoot);

    var mid = breadcrumbMidSegment(pageId);
    if (mid) {
      var liSec = document.createElement("li");
      liSec.textContent = mid;
      ol.appendChild(liSec);
    }

    var cur = PAGE[pageId];
    var liCur = document.createElement("li");
    if (pageId === "home") {
      var span = document.createElement("span");
      span.textContent = "Home";
      span.setAttribute("aria-current", "page");
      liCur.appendChild(span);
    } else {
      liCur.textContent = cur ? cur.nav : pageId;
      liCur.setAttribute("aria-current", "page");
    }
    ol.appendChild(liCur);
  }

  function fillPrevNext(navEl, pageId, base) {
    navEl.innerHTML = "";
    var idx = PAGE_ORDER.indexOf(pageId);
    if (idx < 0) idx = 0;

    var prevId = idx > 0 ? PAGE_ORDER[idx - 1] : null;
    var nextId = idx < PAGE_ORDER.length - 1 ? PAGE_ORDER[idx + 1] : null;

    var prevCell = document.createElement("div");
    if (prevId) {
      var a = document.createElement("a");
      a.href = hrefTo(prevId, base);
      a.innerHTML =
        '<span class="gd-pn-dir">Previous</span><span class="gd-pn-label">' +
        escapeHtml(PAGE[prevId].nav) +
        "</span>";
      prevCell.appendChild(a);
    } else {
      prevCell.innerHTML = '<span class="gd-pn-spacer"> </span>';
    }

    var nextCell = document.createElement("div");
    nextCell.className = "gd-pn-next";
    if (nextId) {
      var a2 = document.createElement("a");
      a2.href = hrefTo(nextId, base);
      a2.innerHTML =
        '<span class="gd-pn-dir">Next</span><span class="gd-pn-label">' +
        escapeHtml(PAGE[nextId].nav) +
        "</span>";
      nextCell.appendChild(a2);
    } else {
      nextCell.innerHTML = '<span class="gd-pn-spacer"> </span>';
    }

    navEl.appendChild(prevCell);
    navEl.appendChild(nextCell);
  }

  function escapeHtml(s) {
    var d = document.createElement("div");
    d.textContent = s;
    return d.innerHTML;
  }

  function collectNavLinks(root) {
    return Array.prototype.slice.call(root.querySelectorAll("a.gd-nav-link"));
  }

  function buildSidebar(activeId, base) {
    var scroll = document.createElement("div");
    scroll.className = "gd-nav-scroll";

    SIDEBAR.forEach(function (block) {
      if (block.kind === "link") {
        var pid = block.pageId;
        var wrap = document.createElement("div");
        wrap.className = "gd-nav-section gd-nav-flat";
        var ul = document.createElement("ul");
        ul.className = "gd-nav-list";
        var li = document.createElement("li");
        li.className = "gd-nav-item";
        var a = document.createElement("a");
        a.className = "gd-nav-link" + (pid === activeId ? " gd-nav-active" : "");
        a.href = hrefTo(pid, base);
        a.textContent = PAGE[pid].nav;
        a.setAttribute("data-search", PAGE[pid].title + " " + PAGE[pid].nav);
        li.appendChild(a);
        ul.appendChild(li);
        wrap.appendChild(ul);
        scroll.appendChild(wrap);
        return;
      }

      if (block.kind === "group") {
        var sec = document.createElement("div");
        sec.className = "gd-nav-section";
        sec.setAttribute("data-collapsed", "false");

        var btn = document.createElement("button");
        btn.type = "button";
        btn.className = "gd-nav-toggle";
        btn.setAttribute("aria-expanded", "true");
        var spLabel = document.createElement("span");
        spLabel.textContent = block.label;
        var ic = document.createElement("span");
        ic.className = "gd-nav-toggle-icon";
        ic.innerHTML = "▼";
        btn.appendChild(spLabel);
        btn.appendChild(ic);
        btn.addEventListener("click", function () {
          var col = sec.getAttribute("data-collapsed") === "true";
          sec.setAttribute("data-collapsed", col ? "false" : "true");
          btn.setAttribute("aria-expanded", col ? "true" : "false");
        });

        var ulg = document.createElement("ul");
        ulg.className = "gd-nav-list";
        block.pageIds.forEach(function (pid) {
          var meta = PAGE[pid];
          if (!meta) return;
          var li2 = document.createElement("li");
          li2.className = "gd-nav-item";
          var a2 = document.createElement("a");
          a2.className = "gd-nav-link" + (pid === activeId ? " gd-nav-active" : "");
          a2.href = hrefTo(pid, base);
          a2.textContent = meta.nav;
          a2.setAttribute("data-search", meta.title + " " + meta.nav + " " + block.label);
          li2.appendChild(a2);
          ulg.appendChild(li2);
        });
        sec.appendChild(btn);
        sec.appendChild(ulg);
        scroll.appendChild(sec);
      }
    });

    return scroll;
  }

  function init() {
    var cfg = window.__GD__;
    if (!cfg || !cfg.pageId) return;

    var base = cfg.base || "";
    var pageId = cfg.pageId;

    if (PAGE[pageId]) {
      document.title = PAGE[pageId].title + " — global-docs";
    }

    var source = document.getElementById("gd-source");
    if (!source) {
      return;
    }

    var app = document.createElement("div");
    app.className = "gd-app";

    var sidebar = document.createElement("aside");
    sidebar.className = "gd-sidebar";
    var sInner = document.createElement("div");
    sInner.className = "gd-sidebar-inner";

    var searchWrap = document.createElement("div");
    searchWrap.className = "gd-search-wrap";
    var search = document.createElement("input");
    search.type = "search";
    search.className = "gd-search";
    search.placeholder = "Filter navigation";
    search.setAttribute("aria-label", "Filter navigation");
    searchWrap.appendChild(search);

    var navHost = document.createElement("nav");
    navHost.className = "gd-nav";
    navHost.setAttribute("aria-label", "Documentation");
    var scrollPart = buildSidebar(pageId, base);
    navHost.appendChild(scrollPart);

    search.addEventListener("input", function () {
      var q = (search.value || "").trim().toLowerCase();
      var links = collectNavLinks(scrollPart);
      links.forEach(function (a) {
        var item = a.closest(".gd-nav-item");
        if (!item) return;
        var t = (a.textContent || "").toLowerCase();
        var k = (a.getAttribute("data-search") || "").toLowerCase();
        var match = !q || t.indexOf(q) >= 0 || k.indexOf(q) >= 0;
        item.setAttribute("data-hidden", match ? "false" : "true");
      });
      scrollPart.querySelectorAll(".gd-nav-section").forEach(function (sec) {
        if (sec.classList.contains("gd-nav-flat")) return;
        if (!q) {
          sec.style.display = "";
          return;
        }
        var vis = sec.querySelector('.gd-nav-item[data-hidden="false"]');
        sec.style.display = vis ? "" : "none";
      });
    });

    sInner.appendChild(searchWrap);
    sInner.appendChild(navHost);
    sidebar.appendChild(sInner);

    var main = document.createElement("div");
    main.className = "gd-main";

    var bcWrap = document.createElement("div");
    bcWrap.className = "gd-breadcrumb-wrap";
    var bcNav = document.createElement("nav");
    bcNav.className = "gd-breadcrumb";
    bcNav.setAttribute("aria-label", "Breadcrumb");
    var ol = document.createElement("ol");
    bcNav.appendChild(ol);
    bcWrap.appendChild(bcNav);
    fillBreadcrumb(ol, pageId, base);

    var artWrap = document.createElement("div");
    artWrap.className = "gd-article-wrap";
    var article = document.createElement("article");
    article.className = "gd-article-inner";

    var pn = document.createElement("nav");
    pn.className = "gd-pn";
    pn.setAttribute("aria-label", "Previous and next page");
    fillPrevNext(pn, pageId, base);

    artWrap.appendChild(article);
    main.appendChild(bcWrap);
    main.appendChild(artWrap);
    main.appendChild(pn);

    app.appendChild(sidebar);
    app.appendChild(main);

    var parent = source.parentNode;
    parent.insertBefore(app, source);
    article.appendChild(source);
    source.removeAttribute("id");
    if (!source.classList.contains("gd-prose")) source.classList.add("gd-prose");

  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }
})();
