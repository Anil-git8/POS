// function getProducts() {
//     return JSON.parse(localStorage.getItem("inventory")) || [];
// }

// // Function to save products to localStorage
// function saveProducts(products) {
//     localStorage.setItem("inventory", JSON.stringify(products));
// }
let products = [];
for (let i = 1; i <= 10; i++) {
    products.push({
        id: i,
        productId: `P${i}`,
        name: `Product ${i}`,
        category: `Category ${Math.floor(i / 100) + 1}`,
        Baseprice: 100 + (i % 100),
        Discount: Math.floor(Math.random() * 20),
        GST: 18,
        stockQuantity: Math.floor(Math.random() * 100) + 1,
        supplier: `Supplier ${Math.floor(i / 50)}`
    });
}

let productToDelete = null;
let currentEditProductId = null;
const stockThreshold = 10;

function renderTable() {
    const tableBody = document.getElementById("productTableBody");
    tableBody.innerHTML = "";
    
    // let products = JSON.parse(localStorage.getItem("inventory")) || [];

    products.forEach((product, index) => {
        let stockClass = product.stockQuantity === 0 ? "outOfStock" :
                         product.stockQuantity <= 10 ? "lowStock" : "inStock";

        tableBody.innerHTML += `
            <tr>
                <td>${index + 1}</td>
                <td>${product.productId}</td>
                <td>${product.name}</td>
                <td>${product.category}</td>
                <td>${product.Baseprice}</td>
                <td>${product.Discount}</td>
                <td>${product.GST}</td>
                <td class="${stockClass}">${product.stockQuantity}</td>
                <td>${product.supplier}</td>
                <td class="${stockClass}">${stockClass.replace(/([A-Z])/g, ' $1')}</td>
                <td>
                    <button onclick="openEditPopup(${product.id})">Edit</button>
                    <button onclick="confirmDelete(${product.id})">Delete</button>
                </td>
            </tr>`;
    });
}


function openAddPopup() {
    currentEditProductId = null;
    document.getElementById("popupTitle").textContent = "Add Product";
    document.getElementById("productID").value = "";
    document.getElementById("productName").value = "";
    document.getElementById("category").value = "";
    document.getElementById("Baseprice").value = "";
    document.getElementById("Discount").value = "";
    document.getElementById("GST").value = "";
    document.getElementById("stockQuantity").value = "";
    document.getElementById("supplier").value = "";

    document.getElementById("popup").style.display = "flex";
}

function openEditPopup(productId) {
    const product = products.find(p => p.id === productId);
    currentEditProductId = productId;
    document.getElementById("popupTitle").textContent = "Edit Product";
    document.getElementById("productID").value = product.productId;
    document.getElementById("productName").value = product.name;
    document.getElementById("category").value = product.category;
    document.getElementById("Baseprice").value = product.Baseprice;
    document.getElementById("Discount").value = product.Discount;
    document.getElementById("GST").value = product.CGST;
    // document.getElementById("SGST").value = product.SGST;
    document.getElementById("stockQuantity").value = product.stockQuantity;
    document.getElementById("supplier").value = product.supplier;

    document.getElementById("popup").style.display = "flex";
}

function saveProduct() {
   
    const newProduct = {
        id: currentEditProductId ? currentEditProductId : products.length + 1,
        productId: document.getElementById("productID").value,
        name: document.getElementById("productName").value,
        category: document.getElementById("category").value,
        Baseprice: parseFloat(document.getElementById("Baseprice").value),
        Discount: parseFloat(document.getElementById("Discount").value),
        CGST: parseFloat(document.getElementById("GST").value),
        // SGST: parseFloat(document.getElementById("SGST").value),
        stockQuantity: parseInt(document.getElementById("stockQuantity").value),
        supplier: document.getElementById("supplier").value
    };

    if (currentEditProductId) {
        const index = products.findIndex(p => p.id === currentEditProductId);
        products[index] = newProduct;
    } else {
        products.push(newProduct);
    }
 
    renderTable();
    closePopup();
}

function closePopup() {
    document.getElementById("popup").style.display = "none";
}

function confirmDelete(productId) {
    productToDelete = productId;
    document.getElementById("deleteConfirmation").style.display = "flex";
}

function deleteProduct() {
    products = products.filter(p => p.id !== productToDelete);
    renderTable();
    closeDeleteConfirmation();
}

function closeDeleteConfirmation() {
    document.getElementById("deleteConfirmation").style.display = "none";
}

function searchTable() {
    const searchText = document.getElementById("searchBar").value.toLowerCase();
    const rows = document.querySelectorAll("#productTable tbody tr");

    rows.forEach(row => {
        const cells = Array.from(row.getElementsByTagName("td"));
        const matches = cells.some(cell => cell.textContent.toLowerCase().includes(searchText));
        row.style.display = matches ? "" : "none";
    });
}

renderTable();