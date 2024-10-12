async function fetchProducts() {
    const response = await fetch('http://localhost:5000/api/products');
    const products = await response.json();
    const productsSection = document.getElementById('products');
    
    products.forEach(product => {
        const productElement = document.createElement('div');
        productElement.innerHTML = `
            <h2>${product.name}</h2>
            <p>${product.description}</p>
            <p>Precio: ${product.price}</p>
        `;
        productsSection.appendChild(productElement);
    });
}

// Llama a la función para obtener productos al cargar la página
fetchProducts();
