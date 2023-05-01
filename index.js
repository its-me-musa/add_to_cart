import { initializeApp } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-app.js"
import { getDatabase, ref, push, onValue, remove } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-database.js"


const appSettings = {
    databaseURL:'https://realtime-database-f40a5-default-rtdb.asia-southeast1.firebasedatabase.app/'
}

const app = initializeApp(appSettings)
const database = getDatabase(app)
const shoppingListInDB = ref(database, 'shoppingList')

const addBtn = document.getElementById('add-button')
const inputField = document.getElementById('input-field')
const shoppingListEl = document.getElementById('shopping-list')

addBtn.addEventListener('click', function () {
    const inputValue = inputField.value
    if (inputValue !== '') push(shoppingListInDB, inputValue)
    clearInputField()
})

onValue(shoppingListInDB, function(snapshot) {
    if (snapshot.exists()) {
        const itemsArray = Object.entries(snapshot.val())
        clearShoppingListEl()
        itemsArray.forEach(item => {
            const [currItemId, currItemValue] = item
            appendItemToShoppingListEl(item)
        })
    } else {
        shoppingListEl.innerHTML = 'No items here... yet'
    }
    
})

function clearInputField() {
    inputField.value = ''    
}

function clearShoppingListEl() {
    shoppingListEl.innerHTML = ''    
}

function appendItemToShoppingListEl(item) {
    const [itemId, itemValue] = item
    
    const newEl = document.createElement('li')
    newEl.textContent = itemValue
    
    newEl.addEventListener('click', function() {        
        const exactLocationOfItemInDB = ref(database, `shoppingList/${itemId}`)
        remove(exactLocationOfItemInDB)
    })
    shoppingListEl.append(newEl)
}




