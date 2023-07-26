let menu = {
    'Cake': 200,
    'Chicken Tikka': 250,
    'Crusty Garlic Focaccia': 100,
    'Pasta Mixed Sauce': 180,
    'Pasta Red Sauce': 120,
    'Pasta White Sauce': 150,
    'Spaghetti': 300
}


let tablesTemplate = {
    // 'table-id': {dishName: {number: 1, price: 1}, ...}
    'table-no-1': {},
    'table-no-2': {},
    'table-no-3': {},
    'table-no-4': {}
}

function splitAndCapitalizeString(str) {
    return str.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');
}

function getTablesFromStorage() {
    return JSON.parse(sessionStorage.getItem('tables'));
}


function addTablesToStorage(tables) {
    sessionStorage.setItem('tables', JSON.stringify(tables));
}


function updateTable(dishId, tableId) {
    let tables = getTablesFromStorage();
    // Add the dish price on the table.
    if (dishId in tables[tableId]) {
        tables[tableId][dishId]['price'] += menu[dishId];
        tables[tableId][dishId]['number'] += 1
    } else {
        tables[tableId][dishId] = {}
        tables[tableId][dishId]['price'] = menu[dishId];
        tables[tableId][dishId]['number'] = 1
    }

    addTablesToStorage(tables);
    displayTables();
}


function addDragAndDropEvents() {

    // Function to apply drag and drop logic along with menu update
    // on tables.
    const dragElements = document.querySelectorAll('.menu-card');

    dragElements.forEach((draggable) => {
        draggable.addEventListener('dragstart', (event) => {
            const id = event.target.id;
            event.dataTransfer.setData('id', id);
        });
    });

    const dropElement = document.getElementsByClassName('table-cards')[0];

    dropElement.addEventListener('dragover', (event) => {
        event.preventDefault();
    });

    dropElement.addEventListener('drop', (event) => {
        event.preventDefault();
        const target = event.target;
        if (target.classList.contains('table-card')) {
            const tableId = String(target.id);
            const dishId = event.dataTransfer.getData('id');
            updateTable(dishId, tableId);
        }
    });
}

// Displays the initial data.
function displayMenu(menu) {
    menuDiv =  document.getElementsByClassName('menu-cards')[0];
    for (let dish in menu) {
        const cardDiv = document.createElement('div');
        cardDiv.className = 'menu-card';
        cardDiv.draggable = true;
        cardDiv.id = dish;

        const foodItemHeading = document.createElement('h2');
        foodItemHeading.className = 'food-item';
        foodItemHeading.textContent = dish;

        const priceParagraph = document.createElement('p');
        priceParagraph.className = 'price';
        priceParagraph.textContent = `Price: INR ${menu[dish]}`;

        cardDiv.appendChild(foodItemHeading);
        cardDiv.appendChild(priceParagraph);

        menuDiv.appendChild(cardDiv);
    }
}

function getTablesTotal(tables, tableNumber) {
    let total = 0;
    let count = 0;

    for (let dish in tables[tableNumber]) {
        total += tables[tableNumber][dish]['price'];
        count += tables[tableNumber][dish]['number'];
    }

    return [total, count]
}

function changeOrder(elem) {
    console.log(elem.parent);
}

function deleteRow(rowId, dishName, tableName) {

    let tables = getTablesFromStorage();
    delete tables[tableName][dishName];
    addTablesToStorage(tables);

    document.getElementById(rowId).remove();
}

// Logic to create modal
function createTableInfo(tableName) {
    let tables = getTablesFromStorage();

    const tableBody = document.querySelector("#table tbody");
    tableBody.textContent = '';

    // 'table-id': {dishName: {number: 1, price: 1}, ...}
    let count = 0;
    for (let dishName in tables[tableName]) {
        console.log("Coming inside the loop!")
        let newRow = document.createElement("tr");
        newRow.id = `${dishName}-${tableName}`;
        newRow.innerHTML = `
            <td>${++count}</td>
            <td>${dishName}</td>
            <td>${tables[tableName][dishName].price}</td>
            <td>
                <input type="number" value="${tables[tableName][dishName].number}" min="0" step="1" onchange="changeOrder(this)">
            </td>
            <td>
                <button onclick="deleteRow('${newRow.id}', '${dishName}', '${tableName}')">Delete</button>
            </td>
        `;
        tableBody.appendChild(newRow);
    }
}

function closeButton() {
    let closeButton = document.createElement('span');
    closeButton.className = 'close';
    closeButton.textContent = 'x';

    return closeButton;
}

function modalDisplay() {
    let modal = document.getElementsByClassName('modal-backdrop')[0];
    let modalTitle = document.getElementById('modal-title');

    let closButton = closeButton();
    closButton.onclick = () => {
        modal.style.display = 'none';
        displayTables();
    }

    const tableDivs = document.getElementsByClassName('table-cards')[0];
    
    tableDivs.addEventListener('click', (e) => {
        e.preventDefault();
        const tableId = e.target.id;
        tableName = splitAndCapitalizeString(tableId);

        // Create header
        const title = document.createElement('p');
        title.textContent = `${tableName} | Order details`;
        title.appendChild(closButton);
        modalTitle.textContent = '';
        modalTitle.appendChild(title);

        // Create main content
        createTableInfo(tableId);

        modal.style.display = 'block';
    });
}

function displayTables() {
    // 'table-id': {dishName: {number: 1, price: 1}, ...}
    let tables = getTablesFromStorage();
    tableDiv =  document.getElementsByClassName('table-cards')[0];
    tableDiv.innerHTML = '';

    for (let key in tables) {
        const cardDiv = document.createElement('div');
        cardDiv.className = 'table-card';
        cardDiv.id = key;

        const tableNumberHeading = document.createElement('h2');
        tableNumberHeading.className = 'table-number';
        tableNumberHeading.textContent = splitAndCapitalizeString(key);

        const itemCountParagraph = document.createElement('p');
        itemCountParagraph.className = 'item count';

        if (Object.keys(tables[key]).length == 0) {
            itemCountParagraph.textContent = "Rs 0 | Total items: 0";
        } else {
            [total, count] = getTablesTotal(tables, key);
            itemCountParagraph.textContent = `Rs ${total} | Total items: ${count}`;
        }
        cardDiv.appendChild(tableNumberHeading);
        cardDiv.appendChild(itemCountParagraph);

        tableDiv.appendChild(cardDiv);
    }

    // Attach the events for modals on the table cards
    modalDisplay() ;
}

window.addEventListener('load', (e) => {
    addTablesToStorage(tablesTemplate);
    displayMenu(menu);
    displayTables(tablesTemplate);
    addDragAndDropEvents();
})

window.onclick = function(event) {
    let modal = document.getElementsByClassName('modal-backdrop')[0];
    if (event.target == modal) {
      modal.style.display = "none";
    }
  }  