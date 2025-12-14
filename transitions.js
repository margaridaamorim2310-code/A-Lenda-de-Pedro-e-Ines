(function () {
  // === Fade-out navigation between internal HTML pages ===
  function isSameOrigin(url) {
    try {
      var u = new URL(url, window.location.href);
      return u.origin === window.location.origin;
    } catch (e) {
      return false;
    }
  }

  function shouldHandle(a) {
    if (!a || !a.href) return false;
    var href = a.getAttribute('href') || '';
    if (a.getAttribute('target') === '_blank') return false;
    if (href.startsWith('#')) return false;
    if (!/\.html(\?|#|$)/i.test(href)) return false;
    return isSameOrigin(a.href);
  }

  function attachLinkTransitions() {
    document.querySelectorAll('a').forEach(function (a) {
      if (!shouldHandle(a)) return;
      a.addEventListener('click', function (e) {
        if (e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return; // respetar atalhos / nova aba
        e.preventDefault();
        var href = a.href;
        
        // Criar overlay de transição
        var overlay = document.createElement('div');
        overlay.style.cssText = 'position: fixed; inset: 0; background: #374547; z-index: 9999; opacity: 0; transition: opacity 900ms ease-in-out;';
        document.body.appendChild(overlay);
        
        // Forçar reflow e animar
        setTimeout(function() {
          overlay.style.opacity = '1';
        }, 10);
        
        setTimeout(function () {
          window.location.href = href;
        }, 900);
      });
    });
  }

  // === Ensure menu looks and behaves like in index (CSS order + handlers) ===
  function ensureStyle1Last() {
    var head = document.head || document.getElementsByTagName('head')[0];
    if (!head) return;
    var links = Array.prototype.slice.call(document.querySelectorAll('link[rel="stylesheet"]'));
    var style1 = links.find(function (l) {
      var href = (l.getAttribute('href') || '').split('?')[0];
      return /(^|\/)style1\.css$/i.test(href);
    });

    if (!style1) {
      var link = document.createElement('link');
      link.rel = 'stylesheet';
      link.href = 'style1.css';
      head.appendChild(link);
    } else {
      // move para o fim para garantir precedência
      head.appendChild(style1);
    }
  }

  function attachMenuHandlers() {
    var menuBtn = document.querySelector('.menu');
    var overlay = document.getElementById('menu-overlay');
    var closeBtn = overlay ? overlay.querySelector('.close-menu') : null;

    if (menuBtn && overlay) {
      menuBtn.addEventListener('click', function () {
        overlay.classList.add('open');
        document.body.classList.add('menu-open');
      });
    }

    if (closeBtn && overlay) {
      closeBtn.addEventListener('click', function () {
        overlay.classList.remove('open');
        document.body.classList.remove('menu-open');
      });
    }

    // Fechar com tecla ESC
    document.addEventListener('keydown', function(e) {
      if (e.key === 'Escape' && overlay && overlay.classList.contains('open')) {
        overlay.classList.remove('open');
        document.body.classList.remove('menu-open');
      }
    });

    // Fechar ao clicar fora do menu
    if (overlay) {
      overlay.addEventListener('click', function(e) {
        if (e.target === overlay) {
          overlay.classList.remove('open');
          document.body.classList.remove('menu-open');
        }
      });
    }
  }

  window.addEventListener('DOMContentLoaded', function () {
    // garantir que o body aparece visível em todas as páginas
    document.body.style.opacity = '1';
    ensureStyle1Last();
    attachMenuHandlers();
    attachLinkTransitions();
  });

  // Garantir que ao voltar pelo cache de histórico o body aparece visível
  window.addEventListener('pageshow', function (e) {
    if (e.persisted) {
      document.body.style.opacity = '1';
    }
  });
})();
