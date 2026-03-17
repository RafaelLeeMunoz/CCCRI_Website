/**
 * CCCRI Site Navigation — Web Component
 * ──────────────────────────────────────
 * Renders the shared <nav> bar and mobile menu on every page as a
 * custom element: <site-nav></site-nav>.
 *
 * To add, remove, or rename a nav link, edit NAV_LINKS below.
 * That's the only place you ever need to touch for nav changes.
 *
 * Active-page highlighting:
 *   Add  data-nav="<id>"  to the <body> of each page.
 *   The id must match the `id` field of the corresponding NAV_LINKS entry.
 *   Example:  <body data-nav="about">
 *
 * NAV_LINKS entry shape:
 *   href  — page filename,          e.g. "about.html"
 *   label — visible bilingual text, e.g. "关于我们 About"
 *   id    — matches body[data-nav], e.g. "about"
 */

// ── CONFIGURATION ────────────────────────────────────────────────────────────

const NAV_LINKS = [
  { href: 'index.html',      label: '主页 Home',        id: 'home'       },
  { href: 'about.html',      label: '关于我们 About',   id: 'about'      },
  { href: 'worship.html',    label: '敬拜 Worship',     id: 'worship'    },
  { href: 'events.html',     label: '活动 Events',      id: 'activities' },
  { href: 'ministries.html', label: '事工 Ministries',  id: 'ministries' },
  { href: 'news.html',       label: '消息 News',        id: 'news'       },
  { href: 'resources.html',  label: '资源 Resources',   id: 'resources'  },
  { href: 'contact.html',    label: '联系 Contact',     id: 'contact'    },
];

const DONATE_URL = 'https://tithe.ly/give_new/www/#/tithely/give-one-time/1707700';
const LOGO_SRC   = 'assets/images/img_a20f2f15e524.gif';

// ── WEB COMPONENT ────────────────────────────────────────────────────────────

class SiteNav extends HTMLElement {
  connectedCallback() {
    // Read which page is active so we can highlight the correct nav link.
    const activePage = document.body.getAttribute('data-nav') || '';

    this.innerHTML = this._buildTemplate(activePage);
  }

  /**
   * Builds the full nav + mobile-menu HTML string.
   * @param {string} activePage — value of body[data-nav] on the current page
   * @returns {string}
   */
  _buildTemplate(activePage) {
    return `
      <nav aria-label="Main navigation" role="navigation">

        <a class="nav-logo" href="index.html" aria-label="CCCRI Home">
          <img src="${LOGO_SRC}" alt="CCCRI — Chinese Christian Church of Rhode Island logo"/>
        </a>

        <div class="nav-links">
          ${NAV_LINKS.map(link => this._buildDesktopLink(link, activePage)).join('')}
        </div>

        <a class="nav-donate"
           href="${DONATE_URL}"
           target="_blank"
           rel="noopener"
           aria-label="Donate online — 線上奉獻">線上奉獻 Donate</a>

        <button class="hamburger"
                id="hamburger"
                aria-label="Open navigation menu"
                aria-expanded="false"
                onclick="window.toggleMenu && window.toggleMenu()">
          <span></span><span></span><span></span>
        </button>

      </nav>

      <div class="mobile-menu" id="mobile-menu" role="navigation" aria-label="Mobile navigation">
        ${NAV_LINKS.map(link => this._buildMobileLink(link)).join('')}
      </div>
    `;
  }

  /**
   * Returns an <a> string for one desktop nav link.
   * Adds class="active" when the link matches the current page.
   * @param {{ href: string, label: string, id: string }} link
   * @param {string} activePage
   * @returns {string}
   */
  _buildDesktopLink({ href, label, id }, activePage) {
    const activeAttr = id === activePage ? ' class="active"' : '';
    // NOTE: aria-label here mirrors the visible text, which is intentional for
    // screen readers on bilingual labels (Chinese characters + English).
    return `<a href="${href}" aria-label="${label}"${activeAttr}>${label}</a>`;
  }

  /**
   * Returns an <a> string for one mobile nav link.
   * Mobile links do not carry an active state — add class="active" here
   * if you want the mobile menu to also highlight the current page.
   * @param {{ href: string, label: string }} link
   * @returns {string}
   */
  _buildMobileLink({ href, label }) {
    return `<a href="${href}">${label}</a>`;
  }
}

customElements.define('site-nav', SiteNav);
