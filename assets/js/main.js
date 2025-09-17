/*=============== CHANGE BACKGROUND HEADER ===============*/
const scrollHeader = () =>{
    const header = document.getElementById('header')
    // When the scroll is greater than 50 viewport height, add the scroll-header class to the header tag
    this.scrollY >= 50 ? header.classList.add('scroll-header') 
                       : header.classList.remove('scroll-header')
}
window.addEventListener('scroll', scrollHeader)

/*=============== SWIPER PRODUCTS ===============*/
let swiperProducts = new Swiper(".products__container", {

    spaceBetween: 32,
    grabCursor: true,
    centeredSlides: true,
    slidesPerView: "auto",
    loop: true,

    navigation: {
      nextEl: ".swiper-button-next",
      prevEl: ".swiper-button-prev",
    },

    breakpoints: {
		1024: {
			spaceBetween: 72,
		},
  	},
});

/*=============== SCROLL SECTIONS ACTIVE LINK ===============*/
const sections = document.querySelectorAll('section[id]')
    
const scrollActive = () =>{
  	const scrollY = window.pageYOffset

	sections.forEach(current =>{
		const sectionHeight = current.offsetHeight,
			  sectionTop = current.offsetTop - 58,
			  sectionId = current.getAttribute('id'),
			  sectionsClass = document.querySelector('.nav__menu a[href*=' + sectionId + ']')

		if(scrollY > sectionTop && scrollY <= sectionTop + sectionHeight){
			sectionsClass.classList.add('active-link')
		}else{
			sectionsClass.classList.remove('active-link')
		}                                                    
	})
}
window.addEventListener('scroll', scrollActive)

/*=============== SHOW SCROLL UP ===============*/ 
const scrollUp = () =>{
	const scrollUp = document.getElementById('scroll-up')
    // When the scroll is higher than 350 viewport height, add the show-scroll class to the a tag with the scrollup class
	this.scrollY >= 350 ? scrollUp.classList.add('show-scroll')
						: scrollUp.classList.remove('show-scroll')
}
window.addEventListener('scroll', scrollUp)

/*=============== DARK LIGHT THEME ===============*/ 
const themeButton = document.getElementById('theme-button')
const darkTheme = 'dark-theme'
const iconTheme = 'ri-sun-line'

// Previously selected topic (if user selected)
const selectedTheme = localStorage.getItem('selected-theme')
const selectedIcon = localStorage.getItem('selected-icon')

// We obtain the current theme that the interface has by validating the dark-theme class
const getCurrentTheme = () => document.body.classList.contains(darkTheme) ? 'dark' : 'light'
const getCurrentIcon = () => themeButton.classList.contains(iconTheme) ? 'ri-moon-line' : 'ri-sun-line'

// We validate if the user previously chose a topic
if (selectedTheme) {
  // If the validation is fulfilled, we ask what the issue was to know if we activated or deactivated the dark
  document.body.classList[selectedTheme === 'dark' ? 'add' : 'remove'](darkTheme)
  themeButton.classList[selectedIcon === 'ri-moon-line' ? 'add' : 'remove'](iconTheme)
}

// Activate / deactivate the theme manually with the button
themeButton.addEventListener('click', () => {
    // Add or remove the dark / icon theme
    document.body.classList.toggle(darkTheme)
    themeButton.classList.toggle(iconTheme)
    // We save the theme and the current icon that the user chose
    localStorage.setItem('selected-theme', getCurrentTheme())
    localStorage.setItem('selected-icon', getCurrentIcon())
})

/*=============== SCROLL REVEAL ANIMATION ===============*/
const sr = ScrollReveal({
    origin: 'top',
    distance: '60px',
    duration: 2500,
    delay: 400,
    // reset: true
})

sr.reveal(`.hero, .home__data, .products__container, .footer__container, .footer__info`)
sr.reveal(`.home__images`, {delay: 600, origin: 'bottom'})
sr.reveal(`.new__card, .brand__img`, {interval: 100})
sr.reveal(`.collection__explore:nth-child(1)`, {origin: 'right'})
sr.reveal(`.collection__explore:nth-child(2)`, {origin: 'left'})

/*=============== ПОЛНОЭКРАННЫЙ ПРОСМОТР ИЗОБРАЖЕНИЙ С ПОДДЕРЖКОЙ СЛАЙДЕРОВ ===============*/

// Создание модального окна для изображения
const createImageModal = (src, alt, title) => {
    // Предотвращаем скролл страницы
    document.body.classList.add('modal-open');
    
    // Создаем элементы модального окна
    const modal = document.createElement('div');
    modal.classList.add('img-modal-overlay');
    
    const productTitle = title || alt || 'Изображение товара NikkiChoo';
    
    modal.innerHTML = `
        <div class="img-modal-content">
            <span class="img-modal-close" tabindex="0" role="button" aria-label="Закрыть изображение">&times;</span>
            <img src="${src}" alt="${alt || 'Товар NikkiChoo'}" class="img-modal-image" />
            <div class="img-modal-info">${productTitle}</div>
        </div>
    `;
    
    // Добавляем модальное окно в DOM
    document.body.appendChild(modal);
    
    // Анимация появления
    setTimeout(() => {
        modal.classList.add('show');
    }, 10);
    
    // Функция закрытия модального окна
    const closeModal = () => {
        modal.classList.remove('show');
        setTimeout(() => {
            if (document.body.contains(modal)) {
                document.body.removeChild(modal);
            }
            document.body.classList.remove('modal-open');
        }, 300);
    };
    
    // Обработчики событий для закрытия
    const closeBtn = modal.querySelector('.img-modal-close');
    
    // Закрытие по клику на кнопку
    closeBtn.addEventListener('click', closeModal);
    
    // Закрытие по клику на затемненную область
    modal.addEventListener('click', (e) => {
        if (e.target === modal) {
            closeModal();
        }
    });
    
    // Закрытие по клавиатуре
    const handleKeydown = (e) => {
        if (e.key === 'Escape') {
            closeModal();
            document.removeEventListener('keydown', handleKeydown);
        }
        if (e.key === 'Enter' || e.key === ' ') {
            if (e.target === closeBtn) {
                closeModal();
                document.removeEventListener('keydown', handleKeydown);
            }
        }
    };
    
    document.addEventListener('keydown', handleKeydown);
    
    // Фокус на кнопке закрытия для доступности
    setTimeout(() => {
        closeBtn.focus();
    }, 350);
};

// Функция добавления обработчиков к изображению (улучшенная для слайдеров)
const addImageModalHandler = (img) => {
    // Проверяем, что обработчик еще не добавлен
    if (img.hasAttribute('data-modal-enabled')) {
        return;
    }
    
    // Отмечаем, что обработчик добавлен
    img.setAttribute('data-modal-enabled', 'true');
    
    // Специальный обработчик для изображений в слайдерах
    const handleImageClick = (e) => {
        // ✅ КЛЮЧЕВОЕ ИСПРАВЛЕНИЕ: останавливаем всплытие события
        e.preventDefault();
        e.stopPropagation();
        e.stopImmediatePropagation();
        
        // Получаем название товара из соседнего элемента
        const productCard = img.closest('.products__card');
        const titleElement = productCard ? productCard.querySelector('.products__title') : null;
        const productTitle = titleElement ? titleElement.textContent.trim() : '';
        
        // Открываем модальное окно
        createImageModal(img.src, img.alt, productTitle);
        
        return false; // Дополнительная защита от всплытия
    };
    
    // Добавляем обработчики с высоким приоритетом
    img.addEventListener('click', handleImageClick, true); // Фаза захвата
    img.addEventListener('mousedown', (e) => {
        e.stopPropagation(); // Предотвращаем drag в слайдере
    }, true);
    
    // Добавляем поддержку клавиатуры
    img.setAttribute('tabindex', '0');
    img.setAttribute('role', 'button');
    img.setAttribute('aria-label', 'Открыть изображение в полном размере');
    
    img.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            e.stopPropagation();
            handleImageClick(e);
        }
    });
    
    // Добавляем стили для указания кликабельности
    img.style.cursor = 'zoom-in';
    img.style.position = 'relative';
    img.style.zIndex = '10';
};

// Специальная инициализация после загрузки Splide слайдеров
const initImageModalAfterSplide = () => {
    // Ждем инициализации всех Splide слайдеров
    setTimeout(() => {
        // Находим все изображения товаров, включая те, что в слайдерах
        const allProductImages = document.querySelectorAll('.products__img');
        
        allProductImages.forEach((img) => {
            addImageModalHandler(img);
        });
        
        console.log(`Инициализировано модальных окон для изображений: ${allProductImages.length}`);
    }, 1500); // Увеличиваем задержку для гарантированной загрузки слайдеров
};

// Дополнительная функция для изображений вне слайдеров (раздел "Наличие")
const initImageModalForStatic = () => {
    // Находим статичные изображения (не в слайдерах)
    const staticSection = document.querySelector('#products');
    if (staticSection) {
        const staticImages = staticSection.querySelectorAll('.products__img');
        staticImages.forEach((img) => {
            addImageModalHandler(img);
        });
    }
};

// Главная функция инициализации
const initAllImageModals = () => {
    // 1. Инициализируем статичные изображения сразу
    initImageModalForStatic();
    
    // 2. Инициализируем изображения в слайдерах после их загрузки
    initImageModalAfterSplide();
    
    // 3. Дополнительная инициализация через еще большую задержку
    setTimeout(() => {
        const remainingImages = document.querySelectorAll('.products__img:not([data-modal-enabled])');
        remainingImages.forEach((img) => {
            addImageModalHandler(img);
        });
    }, 3000);
};

// Запускаем инициализацию
document.addEventListener('DOMContentLoaded', () => {
    initAllImageModals();
});

// Дополнительный запуск после полной загрузки страницы
window.addEventListener('load', () => {
    setTimeout(initAllImageModals, 500);
});

