(function(){
  // Mobile menu toggle
  window.toggleMenu = function() {
    var menu = document.getElementById('mobile-menu');
    var btn  = document.getElementById('hamburger');
    if (!menu || !btn) return;
    var open = menu.classList.toggle('open');
    btn.classList.toggle('open', open);
    btn.setAttribute('aria-expanded', open ? 'true' : 'false');
  };

  // Tabs (kept from original)
  window.switchTab = function(id) {
    document.querySelectorAll('.tab-btn').forEach(function(btn) {
      btn.classList.remove('tab-active');
      btn.setAttribute('aria-selected', 'false');
    });
    var activeBtn = document.getElementById('tab-' + id);
    if (activeBtn) { activeBtn.classList.add('tab-active'); activeBtn.setAttribute('aria-selected', 'true'); }
    document.querySelectorAll('.tab-panel').forEach(function(p) { p.style.display = 'none'; });
    var activePanel = document.getElementById('panel-' + id);
    if (activePanel) activePanel.style.display = 'block';
  };

  // Close mobile menu when navigating
  document.addEventListener('click', function(e){
    var a = e.target.closest && e.target.closest('#mobile-menu a');
    if (!a) return;
    var menu = document.getElementById('mobile-menu');
    var btn  = document.getElementById('hamburger');
    if (menu) menu.classList.remove('open');
    if (btn) { btn.classList.remove('open'); btn.setAttribute('aria-expanded','false'); }
  });

  // Highlight active nav based on body[data-nav]
  document.addEventListener('DOMContentLoaded', function(){
    var key = document.body.getAttribute('data-nav');
    if (!key) return;
    var el = document.getElementById('nav-' + key);
    if (el) el.classList.add('active');
  });
})();
