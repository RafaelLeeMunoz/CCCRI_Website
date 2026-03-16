/**
 * CCCRI Site Navigation — Web Component
 * ─────────────────────────────────────
 * To add or change a nav link, edit the `links` array below.
 * That's the only file you ever need to touch for nav changes.
 *
 * Each link object has:
 *   href   — the page filename  e.g. "about.html"
 *   zhEn   — the label text     e.g. "关于我们 About"
 *   id     — matches data-nav on <body> to highlight active page
 */

const NAV_LINKS = [
  { href: 'index.html',      zhEn: '主页 Home',        id: 'home'       },
  { href: 'about.html',      zhEn: '关于我们 About',   id: 'about'      },
  { href: 'worship.html',    zhEn: '敬拜 Worship',     id: 'worship'    },
  { href: 'events.html',     zhEn: '活动 Events',      id: 'activities' },
  { href: 'ministries.html', zhEn: '事工 Ministries',  id: 'ministries' },
  { href: 'news.html',       zhEn: '消息 News',        id: 'news'       },
  { href: 'resources.html',  zhEn: '资源 Resources',   id: 'resources'  },
  { href: 'contact.html',    zhEn: '联系 Contact',     id: 'contact'    },
];

const DONATE_URL = 'https://tithe.ly/give_new/www/#/tithely/give-one-time/1707700';
const LOGO_SRC   = 'assets/images/img_a20f2f15e524.gif';

class SiteNav extends HTMLElement {
  connectedCallback() {
    // Determine which page is active from <body data-nav="...">
    const activePage = document.body.getAttribute('data-nav') || '';

    // Build desktop nav links
    const desktopLinks = NAV_LINKS.map(link => {
      const isActive = link.id === activePage ? ' class="active"' : '';
      return `<a href="${link.href}" aria-label="${link.zhEn}"${isActive}>${link.zhEn}</a>`;
    }).join('');

    // Build mobile menu links
    const mobileLinks = NAV_LINKS.map(link =>
      `<a href="${link.href}">${link.zhEn}</a>`
    ).join('');

    this.innerHTML = `
      <nav aria-label="Main navigation" role="navigation">
        <a aria-label="CCCRI Home" class="nav-logo" href="index.html">
          <img alt="CCCRI — Chinese Christian Church of Rhode Island logo" src="${LOGO_SRC}"/>
        </a>
        <div class="nav-links">${desktopLinks}</div>
        <a
          aria-label="Donate online — 線上奉獻"
          class="nav-donate"
          href="${DONATE_URL}"
          rel="noopener"
          target="_blank">線上奉獻 Donate</a>
        <button
          aria-expanded="false"
          aria-label="Open navigation menu"
          class="hamburger"
          id="hamburger"
          onclick="window.toggleMenu && window.toggleMenu()">
          <span></span><span></span><span></span>
        </button>
      </nav>

      <div aria-label="Mobile navigation" class="mobile-menu" id="mobile-menu" role="navigation">
        ${mobileLinks}
      </div>
    `;
  }
}

customElements.define('site-nav', SiteNav);
