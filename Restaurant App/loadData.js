
function loadTables() {
    for (var i = 0; i < tables.length; i++) {
        var divElement = document.createElement("div");
        var h2 = document.createElement("h2");
        var price = document.createElement("p");
        var items = document.createElement("p");

        divElement.className = "tableItem";
        divElement.id = "table"+ tables[i].id;
        divElement.setAttribute("id", tables[i].id);
        h2.textContent = tables[i].name;

        const tableId = i+1;
        price.id = "table-totalprice" + tableId;
        price.textContent = "Total : "  + 0 + " Rs";
        items.id = "table-totalitems" + tableId;
        items.textContent = "No Of Items: "  + 0;

        divElement.appendChild(h2);
        divElement.appendChild(price);
        divElement.appendChild(items);
        divElement.addEventListener("drop", onDrop);
        divElement.addEventListener("dragover", allowDrop);
        divElement.addEventListener("click", openOrderDetails);
        document.getElementById("tableContainer").appendChild(divElement);
    }
}

function loadMenu() {
    
    for (var i = 0; i < menuItems.length;) {
        var menuRow = document.createElement("div");
        menuRow.className = "menurow"
        for(var j = 0; j<2 && i< menuItems.length; j++, i++){
            var menucol = document.createElement("div");
            var h2 = document.createElement("h2");
            var price = document.createElement("p");
            var category = document.createElement("p");
            
            menucol.className = "menuItem";
            menucol.setAttribute("id", menuItems[i].id);
            h2.textContent = menuItems[i].itemName;

            price.className = "menuitem-price";
            price.textContent = "Rs: " + menuItems[i].price;

            category.className= "category";
            category.textContent = menuItems[i].category;

            menucol.appendChild(h2);
            menucol.appendChild(price);
            menucol.appendChild(category);
            menucol.setAttribute("draggable", "true");
            menucol.addEventListener("dragstart",onDragStart);
            menuRow.appendChild(menucol);
        }
        document.getElementById("menuContainer").appendChild(menuRow);
    }
}

loadTables();
loadMenu();

let selectedItemPrice, selectedItemId, selectedTableId;

function onDragStart(){
    selectedItemId = this.id;
    selectedItemPrice = menuItems[selectedItemId-1].price;
}

function allowDrop(ev) {
    ev.preventDefault();
}

function onDrop(ev){
    let tableId = this.id;
    let items = tables[tableId-1].items;
    if(items.get(selectedItemId) != undefined)
        items.set(selectedItemId, items.get(selectedItemId)+1);
    else
        items.set(selectedItemId, 1);
    tables[tableId-1].totalBill += selectedItemPrice;
    tables[tableId-1].noOfItems++;
    document.getElementById("table-totalprice"+ tableId).textContent = "Total : "  + tables[tableId-1].totalBill + " Rs";
    document.getElementById("table-totalitems" + tableId).textContent = "No Of Items: "  + tables[tableId-1].noOfItems;
}

document.getElementsByClassName("detailsclose")[0].addEventListener("click", closeOrderDetails);

function openOrderDetails(ev){
    let tableId = this.id;
    selectedTableId = tableId;
    document.getElementById("orderDetails").style.visibility = "visible";
    document.getElementById("maincontainer").style.opacity = "0.5";
    document.getElementById("orderDetailsHeader").textContent = "Table - "+ tableId+ "  | Order Details";
    document.getElementById("generatebill").addEventListener("click", closeSession);
    insertRows();
}

function insertRows(){
    let rows = document.getElementsByClassName("orderDetailsRow");
    for(let i=rows.length-1; i>=0;i--){
        rows[i].remove();
    }
    let selectedItems = tables[selectedTableId-1].items;
    let i=1;
    for(let [itemId, noOfItems] of selectedItems){
        let row = document.createElement("tr");
        let col1 = document.createElement("td");
        let col2 = document.createElement("td");
        let col3 = document.createElement("td");
        let col4 = document.createElement("td");
        let col5 = document.createElement("td");

        row.className = "orderDetailsRow";
        row.id = "orderDetailsRow"+i;
        col1.textContent = i;
        col2.textContent = menuItems[itemId-1].itemName;
        col3.textContent = menuItems[itemId-1].price;
        
        let quantity = document.createElement("input");
        quantity.type = "number";
        quantity.setAttribute("min",1);
        quantity.id = menuItems[itemId-1].id;
        quantity.className = "orderQuantity"+i;
        quantity.setAttribute("value", noOfItems);
        quantity.addEventListener("change", updateOrderQuantity);
        col4.appendChild(quantity);
        let deleteButton = document.createElement("button");
        deleteButton.className = "deleteItem";
        deleteButton.id = menuItems[itemId-1].id;
        deleteButton.title = "Delete";
        deleteButton.textContent="Delete Item";
        deleteButton.addEventListener("click", deleteItemInOrder)
        col5.appendChild(deleteButton);
        row.appendChild(col1);
        row.appendChild(col2);
        row.appendChild(col3);
        row.appendChild(col4);
        row.appendChild(col5);
        document.getElementById("orderedItemsTableBody").appendChild(row);
        i++;
    }
    document.getElementById("orderDetailsBill").textContent = "Total : "+ tables[selectedTableId-1].totalBill; + " Rs."
}

function deleteItemInOrder(){
    let itemId = this.id;
    tables[selectedTableId-1].totalBill -= menuItems[itemId-1].price * tables[selectedTableId-1].items.get(itemId);
    tables[selectedTableId-1].noOfItems -= tables[selectedTableId-1].items.get(itemId);
    tables[selectedTableId-1].items.delete(itemId);
    insertRows();
    updateTableUi();
}

function updateOrderQuantity(){
    let updatedQuantity = parseInt(this.value);
    let itemId = this.id;
    let tableId = selectedTableId;
    let diffQuantity = updatedQuantity - tables[tableId-1].items.get(itemId);
    let diffPrice = diffQuantity * menuItems[itemId-1].price;

    tables[tableId-1].noOfItems += diffQuantity;
    tables[tableId-1].totalBill += diffPrice;
    tables[tableId-1].items.set(itemId, updatedQuantity);
    document.getElementById("orderDetailsBill").textContent = "Total : "+ tables[selectedTableId-1].totalBill; + " Rs."
    updateTableUi();
}

function closeSession(){
    tables[selectedTableId-1].items = new Map();
    tables[selectedTableId-1].totalBill = 0;
    tables[selectedTableId-1].noOfItems = 0;
    updateTableUi();
    closeOrderDetails();
}

function updateTableUi(){
    document.getElementById("table-totalprice"+ selectedTableId).textContent = "Total : "  + tables[selectedTableId-1].totalBill + " Rs";
    document.getElementById("table-totalitems" + selectedTableId).textContent = "No Of Items: "  + tables[selectedTableId-1].noOfItems;
}

function closeOrderDetails(){
    document.getElementById("orderDetails").style.visibility = "hidden";
    let rows = document.getElementsByClassName("orderDetailsRow");
    for(let i=rows.length-1; i>=0;i--){
        rows[i].remove();
    }
    document.getElementById("maincontainer").style.opacity = "1";
}
