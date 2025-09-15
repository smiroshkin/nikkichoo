/**
 * Tabs + Accordion - упрощенная версия
 */
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

  // Обработчики переключения табов
  headers.forEach((hdr, idx) => {
    hdr.addEventListener('click', () => activateTab(idx));
  });

  // Универсальный обработчик для всех аккордеонов
  document.addEventListener('click', function(e) {
    // Находим кнопку аккордеона
    const button = e.target.closest('.accordion-header');
    if (!button) return;
    
    // Проверяем, что кнопка в активном табе
    const activeTab = document.querySelector('.tabs__body.active');
    if (!activeTab || !activeTab.contains(button)) return;
    
    e.preventDefault();
    
    // Находим соответствующий контент
    const contentId = button.getAttribute('aria-controls');
    const content = document.getElementById(contentId);
    if (!content) return;
    
    // Переключаем состояние
    const isExpanded = button.getAttribute('aria-expanded') === 'true';
    
    if (isExpanded) {
      // Закрываем
      button.setAttribute('aria-expanded', 'false');
      content.setAttribute('aria-hidden', 'true');
      content.style.display = 'none';
      const icon = button.querySelector('.accordion-icon');
      if (icon) icon.textContent = '+';
    } else {
      // Открываем
      button.setAttribute('aria-expanded', 'true');
      content.setAttribute('aria-hidden', 'false');
      content.style.display = 'block';
      const icon = button.querySelector('.accordion-icon');
      if (icon) icon.textContent = '−';
    }
  });

  // Инициализация первого таба
  activateTab(0);
});
