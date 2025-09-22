document.addEventListener('DOMContentLoaded', () => {
  const tabs = document.getElementById('deliveryTabs');
  if (!tabs) return;

  const headers = tabs.querySelectorAll('.tabs__header');
  const bodies = tabs.querySelectorAll('.tabs__body');

  function activateTab(index) {
    headers.forEach((hdr, i) => {
      const selected = i === index;
      hdr.classList.toggle('active', selected);
      hdr.setAttribute('aria-selected', selected);
      bodies[i].classList.toggle('active', selected);
      if (selected) {
        bodies[i].removeAttribute('hidden');
      } else {
        bodies[i].setAttribute('hidden', '');
      }
    });
  }

  headers.forEach((hdr, idx) => {
    hdr.addEventListener('click', () => activateTab(idx));
    hdr.addEventListener('keydown', e => {
      if (e.key === 'ArrowRight' || e.key === 'ArrowLeft') {
        e.preventDefault();
        let next = idx + (e.key === 'ArrowRight' ? 1 : -1);
        if (next < 0) next = headers.length - 1;
        if (next >= headers.length) next = 0;
        headers[next].focus();
        activateTab(next);
      }
    });
  });

  // Новый функционал - открытие таба по хэшу URL
  function activateTabByHash() {
    const hash = window.location.hash;
    if (!hash) return;
    headers.forEach((hdr, idx) => {
      if (hdr.id === hash.substring(1)) {
        activateTab(idx);
      }
    });
  }

  // Обработка загрузки страницы
  activateTabByHash();

  // Обработка смены хэша (навигация назад/вперед)
  window.addEventListener('hashchange', activateTabByHash);

  // По умолчанию активируем первый таб
  if(!window.location.hash) {
    activateTab(0);
  }
});
// Простое решение - добавьте в конец страницы перед </body>
document.addEventListener('DOMContentLoaded', function() {
    // Находим все ссылки в футере с классом tab-link
    document.querySelectorAll('.footer__link[href^="#tab"]').forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const tabId = this.getAttribute('href').substring(1);
            const headerButton = document.getElementById(tabId + '-header');
            
            if (headerButton) {
                headerButton.click(); // Имитируем клик по заголовку таба
                
                // Прокрутка к секции
                setTimeout(() => {
                    document.querySelector('.delivery-section').scrollIntoView({ 
                        behavior: 'smooth' 
                    });
                }, 100);
            }
        });
    });
});
