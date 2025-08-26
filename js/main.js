// Данные товаров
const products = [
    {
        id: 1,
        title: "Ботинки замшевые коричневые (шоколад) на байке",
        price: 17300,
        image: "images/boots1.jpg",
        sizes: [36, 37, 38, 39, 40],
        new: true
    }
];

// Функция отображения товаров
function renderProducts(productsToRender) {
    const grid = document.getElementById('products-grid');
    if (!grid) return;
    
    grid.innerHTML = '';
    
    productsToRender.forEach(product => {
        const productCard = document.createElement('div');
        productCard.className = 'product-card';
        
        productCard.innerHTML = `
            ${product.new ? '<div class="new-badge">New</div>' : ''}
            <img src="${product.image}" alt="${product.title}" class="product-image">
            <div class="product-info">
                <h4 class="product-title">${product.title}</h4>
                <div class="product-price">${product.price.toLocaleString()} ₽</div>
                <div class="size-options">
                    ${product.sizes.map(size => 
                        `<span class="size-option" data-size="${size}">${size}</span>`
                    ).join('')}
                </div>
                <button class="btn btn-primary add-to-cart" data-id="${product.id}">
                    В корзину
                </button>
            </div>
        `;
        
        grid.appendChild(productCard);
    });
}
