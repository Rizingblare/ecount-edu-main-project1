import * as utils from "../utils/utils.js";
import * as localStorageHandler from "../utils/localStorageHandler.js";

import { MODE } from "../constants/config.js";

export function init(urlParams) {
    utils.allformsPreventSubmit();
    const mode = urlParams === '' ? MODE.ADD_MODE : MODE.EDIT_MODE;
    if (mode === MODE.EDIT_MODE) {
        loadParams(urlParams);
    }
    
    return mode;
}

export function loadParams(urlParams) {
    const params = utils.parseURLParams(urlParams);

    const saleDateInput = document.querySelector('input[name="sale-date"]');
    saleDateInput.type = 'text';
    saleDateInput.value = params["sale-date"] + '-' + params["sale-date-code"];
    saleDateInput.setAttribute('readonly', true);

    const saleItemInput = document.querySelector('input[name="sale-item"]');
    saleItemInput.value = params["sale-item-code"];
    saleItemInput.setAttribute('readonly', true);

    const saleAmountInput = document.querySelector('input[name="sale-amount"]');
    saleAmountInput.value = params["sale-amount"];

    const salePriceInput = document.querySelector('input[name="sale-price"]');
    salePriceInput.value = params["sale-price"];

    const salePurposeInput = document.querySelector('input[name="sale-purpose"]');
    salePurposeInput.value = params["sale-purpose"];
}

export function openSearchItemPopup() {
    window.open('item.html', 'itemPopup', 'width=600,height=400');
}

export function updateSelectedItems(event) {
     //if (event.origin !== 'http://yourdomain.com') return;
     const selectedItems = event.data.selectedItems;
     if (selectedItems && selectedItems.length > 0) {
         console.log('Received selected items:', selectedItems);
         const container = document.getElementById('selected-items-container');
         container.innerHTML = '';

         selectedItems.forEach(item => {
             const itemElement = document.createElement('span');
             itemElement.textContent = item.name + '(' + item.code + ') ';
             itemElement.dataset.id = item.id;
             itemElement.dataset.code = item.code;
             itemElement.classList.add('msg-item');
             container.appendChild(itemElement);
         });
    }
}

export function addItemToStorage() {
    const formData = new FormData(document.querySelector('form'));
    const saleDate = formData.get('sale-date');
    const saleCode = document.querySelectorAll('.msg-item')[0].dataset.code;
    // const saleItems = document.querySelectorAll('.item');
    // const saleCodeArray = Array.from(saleItems).map(item => item.dataset.code);

    const saleAmount = formData.get('sale-amount');
    const salePrice = formData.get('sale-price');
    const salePurpose = formData.get('sale-purpose');
    
    if (!saleDate.trim() || !saleCode.trim() || !saleAmount.trim() || !salePrice.trim() || !salePurpose.trim() ) {
        alert(ALERT_INPUT_MESSAGES.EMPTY_INPUT);
        return;
    }

    const newItem = {
        id: getNextId(),
        date: saleDate,
        code: saleCode,
        amount: saleAmount,
        price: salePrice,
        purpose: salePurpose
    };
    
    localStorageHandler.addToStorage(SALE_KEY, newItem);
    closePopup();
}

export function editItemToStorage(id) {
    const params = parseURLParams();
    const saleId = params['sale-id'];
    const formData = new FormData(document.querySelector('form'));
    const saleDate = formData.get('sale-date');
    const saleCode = document.querySelectorAll('.item')[0].dataset.code;
    // const saleItems = document.querySelectorAll('.item');
    // const saleCodeArray = Array.from(saleItems).map(item => item.dataset.code);

    const saleAmount = formData.get('sale-amount');
    const salePrice = formData.get('sale-price');
    const salePurpose = formData.get('sale-purpose');

    if (!saleDate.trim() || !saleCode.trim() || !saleAmount.trim() || !salePrice.trim() || !salePurpose.trim() ) {
        alert(ALERT_INPUT_MESSAGES.EMPTY_INPUT);
        return;
    }

    localStorageHandler.updateInStorage(SALE_KEY, { id: parseInt(saleId, 10), date: saleDate, code: saleCode, amount: saleAmount, price: salePrice, purpose: salePurpose });
    closePopup();
}

export function deleteItemFromStorage() {
    const params = parseURLParams();
    localStorageHandler.deleteFromStorage(SALE_KEY, params["sale-id"]);
    closePopup();
}

export function resetSaleFormData(isEdit) {
    const urlParams = window.location.search;
    if (isEdit) {
        loadParams(urlParams);
        return;
    }

    const saleDateInput = document.querySelector('input[name="sale-date"]');
    saleDateInput.value = '';

    const saleItemInput = document.querySelector('input[name="sale-item"]');
    saleItemInput.value = '';

    const saleAmountInput = document.querySelector('input[name="sale-amount"]');
    saleAmountInput.value = '';

    const salePriceInput = document.querySelector('input[name="sale-price"]');
    salePriceInput.value = '';

    const salePurposeInput = document.querySelector('input[name="sale-purpose"]');
    salePurposeInput.value = '';

    const container = document.getElementById('selected-items-container');
    container.innerHTML = '';
}

export function closePopup() {
    window.close();
    if (window.opener) window.opener.location.reload();
}