/**
 * Tabs Component — чистый JS, без зависимостей
 * Поддержка ARIA, keyboard navigation + переинициализация аккордеонов
 */
document.addEventListener('DOMContentLoaded', () => {
  const tabs = document.getElementById('deliveryTabs');
  if (!tabs) return;

  const headers = tabs.querySelectorAll('.tabs__header');
  const bodies  = tabs.querySelectorAll('.tabs__body');

  // Функция для инициализации аккордеонов в конкретном табе
  function initAccordionsInTab(tabBody) {
    const accordions = tabBody.querySelectorAll('.accordion');
    accordions.forEach(accordion => {
      // Проверяем, не инициализирован ли уже этот аккордеон
      if (accordion.hasAttribute('data-accordion-initialized')) {
        return;
      }
      
      // Находим все кнопки аккордеона в этом контейнере
      const accordionButtons = accordion.querySelectorAll('.accordion-header');
      
      accordionButtons.forEach(button => {
        // Убираем старые обработчики (если есть)
        const newButton = button.cloneNode(true);
        button.parentNode.replaceChild(newButton, button);
        
        // Добавляем обработчик клика
        newButton.addEventListener('click', function(e) {
          e.preventDefault();
          
          const content = document.getElementById(this.getAttribute('aria-controls'));
          if (!content) return;
          
          const isExpanded = this.getAttribute('aria-expanded') === 'true';
          
          // Закрываем все другие аккордеоны в этом контейнере (если нужно)
          const otherButtons = accordion.querySelectorAll('.accordion-header');
          otherButtons.forEach(otherBtn => {
            if (otherBtn !== this) {
              otherBtn.setAttribute('aria-expanded', 'false');
              const otherContent = document.getElementById(otherBtn.getAttribute('aria-controls'));
              if (otherContent) {
                otherContent.setAttribute('aria-hidden', 'true');
                otherContent.style.display = 'none';
              }
              // Меняем иконку на "+"
              const otherIcon = otherBtn.querySelector('.accordion-icon');
              if (otherIcon) otherIcon.textContent = '+';
            }
          });
          
          // Переключаем текущий аккордеон
          if (isExpanded) {
            // Закрываем
            this.setAttribute('aria-expanded', 'false');
            content.setAttribute('aria-hidden', 'true');
            content.style.display = 'none';
            const icon = this.querySelector('.accordion-icon');
            if (icon) icon.textContent = '+';
          } else {
            // Открываем
            this.setAttribute('aria-expanded', 'true');
            content.setAttribute('aria-hidden', 'false');
            content.style.display = 'block';
            const icon = this.querySelector('.accordion-icon');
            if (icon) icon.textContent = '−';
          }
        });
      });
      
      // Помечаем аккордеон как инициализированный
      accordion.setAttribute('data-accordion-initialized', 'true');
    });
  }

  function activateTab(index) {
    headers.forEach((hdr, i) => {
      const selected = i === index;
      hdr.classList.toggle('active', selected);
      hdr.setAttribute('aria-selected', selected);
      bodies[i].classList.toggle('active', selected);
      if (selected) {
        bodies[i].removeAttribute('hidden');
        // ВАЖНО: инициализируем аккордеоны в показанном табе
        setTimeout(() => {
          initAccordionsInTab(bodies[i]);
        }, 50); // Небольшая задержка для корректного отображения
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

  // Инициализация: активируем первую вкладку
  activateTab(0);
  
  // Альтернативный способ: делегирование событий для всех аккордеонов сразу
  document.addEventListener('click', function(e) {
    if (e.target.matches('.accordion-header') || e.target.closest('.accordion-header')) {
      const button = e.target.matches('.accordion-header') ? e.target : e.target.closest('.accordion-header');
      const tabBody = button.closest('.tabs__body');
      
      // Проверяем, что кнопка находится в активном табе
      if (tabBody && tabBody.classList.contains('active')) {
        // Событие уже обработано выше, но это резервный механизм
        console.log('Резервный обработчик аккордеона сработал');
      }
    }
  });
});
