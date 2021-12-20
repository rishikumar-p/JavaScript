document.getElementById("searchtable").addEventListener("input", searchTable);
document.getElementById("searchmenu").addEventListener("input", searchMenu);

function searchTable() {
    var input = document.getElementById("searchtable");
    input = input.value.toLowerCase();
    var tables = document.getElementsByClassName("tableItem");
    for (var i = 0; i < tables.length; i++) {
        var h2 = tables[i].getElementsByTagName("h2")[0];
        if (h2.innerHTML.toLowerCase().indexOf(input) > -1){
            tables[i].style.display = "";
        }
        else {
            tables[i].style.display = "none";
        }
            
    }
}

function searchMenu() {
    var input = document.getElementById("searchmenu");
    input = input.value.toLowerCase();
    var menuItems = document.getElementsByClassName("menuItem");
    for (var i = 0; i < menuItems.length; i++) {
        var nameElement = menuItems[i].getElementsByTagName("h2")[0];
        var categoryElement = menuItems[i].getElementsByClassName("category")[0];
        if (nameElement.innerHTML.toLowerCase().indexOf(input) > -1 || categoryElement.innerHTML.toLowerCase().indexOf(input) > -1){
            menuItems[i].style.display = "";
        }
        else {
            menuItems[i].style.display = "none";
        }
    }
}