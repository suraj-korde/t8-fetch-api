document.addEventListener('DOMContentLoaded', () => {
    fetchData();
});

const fetchData = async () => {
    try {
        const response = await fetch('https://cdn.shopify.com/s/files/1/0564/3685/0790/files/multiProduct.json');
        const data = await response.json();
        displayProducts(data.categories);
    } catch (error) {
        console.error('Error fetching data:', error);
    }
};

const displayProducts = (categories) => {
    const container = document.getElementById('product-container');
    container.innerHTML = '';
    categories.forEach(category => {
        category.category_products.forEach(product => {
            const productDiv = document.createElement('div');
            productDiv.classList.add('product');
            productDiv.innerHTML = `
                <img src="${product.image}" alt="${product.title}">
                <div class="title">${product.title}</div>
                <div class="price">$${product.price}</div>
                <div class="compare-price">$${product.compare_at_price}</div>
                <div class="vendor">${product.vendor}</div>
                ${product.badge_text ? `<div class="badge">${product.badge_text}</div>` : ''}
            `;
            productDiv.dataset.category = category.category_name;
            container.appendChild(productDiv);
        });
    });
};

const filterProducts = (category) => {
    const products = document.querySelectorAll('.product');
    products.forEach(product => {
        if (category === 'All' || product.dataset.category === category) {
            product.style.display = 'block';
        } else {
            product.style.display = 'none';
        }
    });
};
