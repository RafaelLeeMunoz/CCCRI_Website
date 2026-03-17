/**
 * CCCRI Site — Global UI Behaviours
 * ───────────────────────────────────
 * Wrapped in an IIFE to avoid polluting the global scope.
 * Only the two functions that HTML calls directly (toggleMenu, switchTab)
 * are intentionally attached to window.
 */
(function () {

  // ── MOBILE MENU ─────────────────────────────────────────────────────────

  /**
   * Toggles the mobile navigation menu open/closed.
   * Called via onclick="window.toggleMenu()" on the hamburger button
   * rendered by nav.js, so it must live on window.
   */
  window.toggleMenu = function () {
    const menu = document.getElementById('mobile-menu');
    const btn  = document.getElementById('hamburger');
    if (!menu || !btn) return;

    const isOpen = menu.classList.toggle('open');
    btn.classList.toggle('open', isOpen);
    btn.setAttribute('aria-expanded', String(isOpen));
  };

  /**
   * Close the mobile menu whenever the user taps any link inside it.
   * Uses event delegation on document so it works even if the menu is
   * injected after this listener is registered (e.g. by nav.js).
   */
  document.addEventListener('click', function (e) {
    const link = e.target.closest && e.target.closest('#mobile-menu a');
    if (!link) return;

    const menu = document.getElementById('mobile-menu');
    const btn  = document.getElementById('hamburger');
    if (menu) menu.classList.remove('open');
    if (btn)  {
      btn.classList.remove('open');
      btn.setAttribute('aria-expanded', 'false');
    }
  });


  // ── TABS ─────────────────────────────────────────────────────────────────

  /**
   * Activates a named tab panel and deactivates all others.
   * Called via onclick="window.switchTab('<id>')" on each .tab-btn,
   * so it must live on window.
   *
   * Expects matching elements in the DOM:
   *   id="tab-<id>"    — the button for this tab  (.tab-btn)
   *   id="panel-<id>"  — the content panel        (.tab-panel)
   *
   * @param {string} id — the tab identifier, e.g. "sunday"
   */
  window.switchTab = function (id) {
    // Deactivate all tab buttons
    document.querySelectorAll('.tab-btn').forEach(function (btn) {
      btn.classList.remove('tab-active');
      btn.setAttribute('aria-selected', 'false');
    });

    // Activate the selected tab button
    const activeBtn = document.getElementById('tab-' + id);
    if (activeBtn) {
      activeBtn.classList.add('tab-active');
      activeBtn.setAttribute('aria-selected', 'true');
    }

    // Hide all tab panels
    document.querySelectorAll('.tab-panel').forEach(function (panel) {
      panel.style.display = 'none';
    });

    // Show the selected tab panel
    const activePanel = document.getElementById('panel-' + id);
    if (activePanel) activePanel.style.display = 'block';
  };


  // ── ACTIVE NAV FALLBACK ───────────────────────────────────────────────────

  /**
   * FLAG — likely redundant with nav.js:
   * nav.js already stamps class="active" on the correct desktop link at
   * render time by reading body[data-nav]. This handler looks for a
   * separate element with id="nav-<key>", which nav.js does not produce.
   *
   * If no element with that ID pattern exists in any page's HTML, this
   * block is dead code and can be safely removed. It is preserved here
   * unchanged until that can be confirmed across all pages.
   */
  document.addEventListener('DOMContentLoaded', function () {
    const key = document.body.getAttribute('data-nav');
    if (!key) return;

    const el = document.getElementById('nav-' + key);
    if (el) el.classList.add('active');
  });

}());
