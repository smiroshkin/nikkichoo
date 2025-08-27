// Данные товаров
const products = [
    {
        id: 1,
        title: "Ботинки замшевые коричневые (шоколад) на байке",
        price: 17300,
        image: "https://via.placeholder.com/300x300/8B7355/ffffff?text=Ботинки+замшевые",
        sizes: [36, 37, 38, 39, 40],
        isNew: true,
        isOnSale: false,
        oldPrice: null
    },
    {
        id: 2,
        title: "Ботинки кожаные коричневые на байке",
        price: 18300,
        image: "https://via.placeholder.com/300x300/8B7355/ffffff?text=Ботинки+кожаные",
        sizes: [34, 35, 36, 37, 38, 39],
        isNew: true,
        isOnSale: false,
        oldPrice: null
    },
    {
        id: 3,
        title: "Ботинки кожаные бордовые на меху",
        price: 17900,
        image: "https://via.placeholder.com/300x300/8B4A47/ffffff?text=Ботинки+бордовые",
        sizes: [36, 37, 38, 39, 40, 41],
        isNew: true,
        isOnSale: false,
        oldPrice: null
    },
    {
        id: 4,
        title: "Сапоги кожаные коричневые (шоколадный мусс) на байке",
        price: 22600,
        image: "https://via.placeholder.com/300x300/8B7355/ffffff?text=Сапоги+коричневые",
        sizes: [36, 37, 38, 39, 40],
        isNew: true,
        isOnSale: false,
        oldPrice: null
    },
    {
        id: 5,
        title: "Ботинки кожаные черные на меху",
        price: 18900,
        image: "https://via.placeholder.com/300x300/2C2C2C/ffffff?text=Ботинки+черные",
        sizes: [36, 37, 38, 39, 40, 41],
        isNew: true,
        isOnSale: false,
        oldPrice: null
    },
    {
        id: 6,
        title: "Ботинки кожаные лаковые бордовые на байке",
        price: 18600,
        image: "https://via.placeholder.com/300x300/8B4A47/ffffff?text=Ботинки+лаковые",
        sizes: [36, 37, 38, 39, 40, 41],
        isNew: true,
        isOnSale: false,
        oldPrice: null
    }
];

const bestsellers = [
    {
        id: 7,
        title: "Туфли лаковые черные на кожаной подкладке",
        price: 12900,
        oldPrice: 15600,
        image: "https://via.placeholder.com/300x300/2C2C2C/ffffff?text=Туфли+лаковые",
        sizes: [39],
        isNew: true,
        isOnSale: true
    },
    {
        id: 8,
        title: "Туфли кожаные черные на кожаной подкладке",
        price: 14300,
        oldPrice: 15600,
        image: "https://via.placeholder.com/300x300/2C2C2C/ffffff?text=Туфли+кожаные",
        sizes: [40],
        isNew: true,
        isOnSale: true
    },
    {
        id: 9,
        title: "Ботинки кожаные черные на меху",
        price: 17900,
        image: "https://via.placeholder.com/300x300/2C2C2C/ffffff?text=Ботинки+на+меху",
        sizes: [35, 36, 37, 38, 39, 40],
        isNew: true,
        isOnSale: false
    },
    {
        id: 10,
        title: "Ботинки кожаные бежевые на байке",
        price: 16800,
        image: "https://via.placeholder.com/300x300/D4C5B0/ffffff?text=Ботинки+бежевые",
        sizes: [36, 37, 38, 39, 40, 41],
        isNew: true,
        isOnSale: false
    }
];

// Функция создания карточки товара
function createProductCard(product) {
    return `
        <div class="product-card" data-id="${product.id}">
            ${product.isNew ? '<div class="product-badge">New</div>' : ''}
            ${product.isOnSale ? '<div class="product-badge" style="background: #ff6b35;">Скидка</div>' : ''}
            <img src="${product.image}" alt="${product.title}" class="product-image">
            <div class="product-info">
                <h4 class="product-title">${product.title}</h4>
                <div class="product-price">
                    ${product.isOnSale && product.oldPrice ? `<span class="old-price">${product.oldPrice.toLocaleString()} ₽</span>` : ''}
                    ${product.price.toLocaleString()} ₽
                </div>
                <div class="product-sizes">
                    ${product.sizes.map(size => `<span class="size-option" data-size="${size}">${size}</span>`).join('')}
                </div>
            </div>
        </div>
    `;
}

// Функция отображения товаров
function renderProducts() {
    const productsGrid = document.getElementById('products-grid');
    const bestsellersGrid = document.getElementById('bestsellers-grid');
    
    if (productsGrid) {
        productsGrid.innerHTML = products.map(product => createProductCard(product)).join('');
    }
    
    if (bestsellersGrid) {
        bestsellersGrid.innerHTML = bestsellers.map(product => createProductCard(product)).join('');
    }
}

// Обработчики событий
function initEventListeners() {
    // Выбор размера
    document.addEventListener('click', function(e) {
        if (e.target.classList.contains('size-option')) {
            const card = e.target.closest('.product-card');
            const sizeOptions = card.querySelectorAll('.size-option');
            
            // Убрать активный класс со всех размеров
            sizeOptions.forEach(option => option.classList.remove('active'));
            
            // Добавить активный класс к выбранному размеру
            e.target.classList.add('active');
        }
    });
    
    // Плавный скроллинг для якорных ссылок
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // Анимация появления элементов при скролле
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);
    
    // Наблюдать за элементами, которые должны анимироваться
    document.querySelectorAll('.product-card, .review-item, .blog-item').forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(20px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });
    
    // Обработка формы подписки
    const newsletterForm = document.querySelector('.newsletter-form form');
    if (newsletterForm) {
        newsletterForm.addEventListener('submit', function(e) {
            e.preventDefault();
            const email = this.querySelector('input[type="email"]').value;
            const checkbox = this.querySelector('input[type="checkbox"]').checked;
            
            if (!email) {
                alert('Пожалуйста, введите email');
                return;
            }
            
            if (!checkbox) {
                alert('Необходимо согласие на обработку персональных данных');
                return;
            }
            
            // Здесь был бы отправка данных на сервер
            alert('Спасибо за подписку!');
            this.querySelector('input[type="email"]').value = '';
            this.querySelector('input[type="checkbox"]').checked = false;
        });
    }
}

// Инициализация при загрузке страницы
document.addEventListener('DOMContentLoaded', function() {
    renderProducts();
    initEventListeners();
    
    // Добавление класса для анимации загрузки
    document.body.classList.add('loaded');
});

// Обработка загрузки изображений
document.addEventListener('DOMContentLoaded', function() {
    const images = document.querySelectorAll('img');
    images.forEach(img => {
        img.addEventListener('load', function() {
            this.style.opacity = '1';
        });
        
        img.addEventListener('error', function() {
            this.src = 'https://via.placeholder.com/300x300/f0f0f0/999999?text=Изображение+не+найдено';
        });
    });
});

// Добавление эффекта параллакса для hero-секции
window.addEventListener('scroll', function() {
    const scrolled = window.pageYOffset;
    const heroSection = document.querySelector('.hero-section');
    
    if (heroSection) {
        const speed = scrolled * 0.5;
        heroSection.style.transform = `translateY(${speed}px)`;
    }
});
