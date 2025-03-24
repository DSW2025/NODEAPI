const API_URL = "/api/products";

async function fetchProducts() {
    const response = await fetch(API_URL);
    const products = await response.json();
    const list = document.getElementById("productList");
    list.innerHTML = "";
    products.forEach(product => {
        const li = document.createElement("li");
        li.innerHTML = `
            ${product.name} - ${product.quantity} unidades - $${product.price}
            <button onclick="editProduct('${product._id}')">✏️</button>
            <button onclick="deleteProduct('${product._id}')">❌</button>
        `;
        list.appendChild(li);
    });
}

async function createProduct() {
    const name = document.getElementById("name").value;
    const quantity = document.getElementById("quantity").value;
    const price = document.getElementById("price").value;

    await fetch(API_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, quantity, price }),
    });

    fetchProducts();
}

async function deleteProduct(id) {
    await fetch(`${API_URL}/${id}`, { method: "DELETE" });
    fetchProducts();
}

async function editProduct(id) {
    const newName = prompt("Nuevo nombre:");
    const newQuantity = prompt("Nueva cantidad:");
    const newPrice = prompt("Nuevo precio:");

    if (newName && newQuantity && newPrice) {
        await fetch(`${API_URL}/${id}`, {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ name: newName, quantity: newQuantity, price: newPrice }),
        });
        fetchProducts();
    }
}

fetchProducts();
