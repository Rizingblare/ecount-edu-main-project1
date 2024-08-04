document.addEventListener('DOMContentLoaded', function() {
    allformsPreventSubmit();
    loadParams();
    addItemEvent();
})

function loadParams() {
    const params = new URLSearchParams(window.location.search);
    const itemCode = params.get('item-code');
    const itemName = params.get('item-name');

    const itemCodeInput = document.querySelector('input[name="item-code"]');
    itemCodeInput.value = itemCode;

    const itemNameInput = document.querySelector('input[name="item-name"]');
    itemNameInput.value = itemName;
}

function addItemEvent() {
    const submitBtn = document.querySelector('.submitBtn');
    submitBtn.addEventListener('click', addItem);
}

function addItem() {
    const formData = new FormData(document.querySelector('form'));
    const itemCode = formData.get('item-code');
    const itemName = formData.get('item-name');

    window.localStorage.setItem(itemCode);

    console.log(itemCode, itemName);
}


function saveToLocalStorage(tableData) {

}

function loadFromLocalStorage() {
    
}
