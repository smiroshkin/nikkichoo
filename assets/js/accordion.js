// ИСПРАВЛЕННАЯ ВЕРСИЯ accordion.js
document.addEventListener('DOMContentLoaded', function() {
    // Защита от повторной инициализации
    if (window.accordionInitialized) return;
    window.accordionInitialized = true;
    
    document.addEventListener('click', function(e) {
        const button = e.target.closest('.accordion-header');
        if (!button) return;
        
        // Убираем строгую проверку активной вкладки
        const tabBody = button.closest('.tabs__body');
        if (tabBody && tabBody.hasAttribute('hidden')) return;
        
        e.preventDefault();
        
        const accordion = button.closest('.accordion');
        const contentId = button.getAttribute('aria-controls');
        const content = document.getElementById(contentId);
        
        if (!content || !accordion) return;
        
        const isExpanded = button.getAttribute('aria-expanded') === 'true';
        
        // Закрываем другие аккордеоны
        const allButtons = accordion.querySelectorAll('.accordion-header');
        allButtons.forEach(btn => {
            if (btn !== button) {
                btn.setAttribute('aria-expanded', 'false');
                const otherContentId = btn.getAttribute('aria-controls');
                const otherContent = document.getElementById(otherContentId);
                if (otherContent) {
                    otherContent.setAttribute('aria-hidden', 'true');
                    otherContent.style.display = 'none';
                } // ДОБАВИТЬ ЭТУ СКОБКУ!
                const otherIcon = btn.querySelector('.accordion-icon');
                if (otherIcon) otherIcon.textContent = '+';
            } // ДОБАВИТЬ ЭТУ СКОБКУ!
        });
        
        // Переключаем текущий
        if (isExpanded) {
            button.setAttribute('aria-expanded', 'false');
            content.setAttribute('aria-hidden', 'true');
            content.style.display = 'none';
            const icon = button.querySelector('.accordion-icon');
            if (icon) icon.textContent = '+';
        } else {
            button.setAttribute('aria-expanded', 'true');
            content.setAttribute('aria-hidden', 'false');
            content.style.display = 'block';
            const icon = button.querySelector('.accordion-icon');
            if (icon) icon.textContent = '−';
        } // ДОБАВИТЬ ЭТУ СКОБКУ!
    });
    
    // Клавиатурная поддержка
    document.addEventListener('keydown', function(e) {
        if ((e.key === 'Enter' || e.key === ' ') && e.target.matches('.accordion-header')) {
            e.preventDefault();
            e.target.click();
        } // ДОБАВИТЬ ЭТУ СКОБКУ!
    });
});
