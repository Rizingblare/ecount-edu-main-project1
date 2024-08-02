document.addEventListener('DOMContentLoaded', function() {
    allformsPreventSubmit();
    addItemEvent();
})

function saveToLocalStorage(tableData) {

}

function loadFromLocalStorage() {

}

function allformsPreventSubmit() {
    const allForms = document.getElementsByTagName('form');
    for (const form of allForms) {
        form.addEventListener('submit', function(event) {
            event.preventDefault();
        })
    }
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