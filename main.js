/**------------------------------- call the IDs ----------------------------------**/

let title = document.getElementById("title");
let price = document.getElementById("price");
let taxes = document.getElementById("taxes");
let ads = document.getElementById("ads");
let discount = document.getElementById("discount");
let total = document.getElementById("total");
let count = document.getElementById("count");
let category = document.getElementById("category");
let create = document.getElementById("create");
let search = document.getElementById("search");
let searchByTitle = document.getElementById("searchByTitle");
let searchByCategory = document.getElementById("searchByCategory");

/**----------------- create item , save it in local storage -----------------**/

let products;

if(localStorage.product != null){
    products = JSON.parse(localStorage.product); // to convert string to array
}
else{
    products = [];
}


create.onclick = function()
    {
        let newItem = {
            title:title.value,
            price:price.value,
            taxes:taxes.value,
            ads:ads.value,
            discount:discount.value,
            total:total.value,
            count:count.value,
            category:category.value
        }
        products.push(newItem);
        localStorage.setItem('product',JSON.stringify(products)); // to convert array to string
        clearInputs(); // to clear fields after creation
        showProducts();
        
        
    }


/**----------------- get total price after tax, ads, and discounts -----------------**/


function getTotal()
{
    if(price.value != '')
    {
        let result = (+price.value + +taxes.value + +ads.value) - +discount.value;
        total.innerHTML = result ;
        total.style.backgroundColor = '#040'
    }
    else
    {
        total.innerHTML = '';
        total.style.backgroundColor = 'red'
    }
}

/**----------------------------- clear fields after creation-------------------------**/


function clearInputs(){

    title.value = '';
    price.value = '';
    taxes.value = '';
    ads.value = '';
    discount.value = '';
    total.innerHTML = '';
    count.value = '';
    category.value = '';
}

/**----------------------------- show products -------------------------**/

function showProducts(){
    let table = '';
    for (let i = 0; i < products.length; i++){
        table += `
            <tr>
                    <td>${i}</td>
                    <td>${products[i].title}</td>
                    <td>${products[i].price}</td>
                    <td>${products[i].taxes}</td>
                    <td>${products[i].ads}</td>
                    <td>${products[i].discount}</td>
                    <td>${products[i].count}</td>
                    <td>${products[i].category}</td>
                    <td><button>update</button></td>
                    <td><button onclick="deleteItem(${i})">delete</button></td>
            </tr>
        `;
    }
    document.getElementById('tbody').innerHTML = table;

}

showProducts();

/**----------------------------- delete Item -------------------------**/

function deleteItem(i){

    products.splice(i,1);
    localStorage.product = JSON.stringify(products);
    showProducts();

}