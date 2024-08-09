import * as utils from "../../utils/utils.js";
import * as localStorageHandler from "../../utils/localStorageHandler.js";

import { MODE, URL } from "../../constants/config.js";

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

    const saleDateInput = document.querySelector('input[name="data_dt"]');
    saleDateInput.type = 'text';
    saleDateInput.value = params["data_dt"] + '-' + params["data_no"];
    saleDateInput.setAttribute('readonly', true);

    const prodDTOs = [{
        prodName: params["prodName"],
        prodCode: params["prodCode"]
    }];

    utils.generateSelectedProdItemElement(prodDTOs);

    const saleQuantityInput = document.querySelector('input[name="quantity"]');
    saleQuantityInput.value = params["quantity"];

    const salePriceInput = document.querySelector('input[name="price"]');
    salePriceInput.value = params["price"];

    const saleRemarksInput = document.querySelector('input[name="remarks"]');
    saleRemarksInput.value = params["remarks"];
}

export function openSearchProdPopup() {
    utils.openPopupWindow(URL.PROD);
}

export function updateSelectedProds(event) {
     //if (event.origin !== 'http://yourdomain.com') return;
     const selectedProds = event.data.selectedProds;
     if (selectedProds && selectedProds.length > 0) {
         utils.generateSelectedProdItemElement(selectedProds);
    }
}

export function addProdToStorage() {
    const formData = new FormData(document.querySelector('form'));
    const saleDate = formData.get('sale-date');
    const saleCode = document.querySelectorAll('.msg-prod')[0].dataset.code;
    // const saleProds = document.querySelectorAll('.prod');
    // const saleCodeArray = Array.from(saleProds).map(prod => prod.dataset.code);

    const saleAmount = formData.get('sale-quantity');
    const salePrice = formData.get('sale-price');
    const salePurpose = formData.get('sale-remarks');
    
    if (!saleDate.trim() || !saleCode.trim() || !saleAmount.trim() || !salePrice.trim() || !salePurpose.trim() ) {
        alert(ALERT_INPUT_MESSAGES.EMPTY_INPUT);
        return;
    }

    const newProd = {
        id: getNextId(),
        date: saleDate,
        code: saleCode,
        quantity: saleAmount,
        price: salePrice,
        remarks: salePurpose
    };
    
    localStorageHandler.addToStorage(SALE_KEY, newProd);
    closePopup();
}

export function editProdToStorage(id) {
    const params = parseURLParams();
    const saleId = params['sale-id'];
    const formData = new FormData(document.querySelector('form'));
    const saleDate = formData.get('sale-date');
    const saleCode = document.querySelectorAll('.prod')[0].dataset.code;
    // const saleProds = document.querySelectorAll('.prod');
    // const saleCodeArray = Array.from(saleProds).map(prod => prod.dataset.code);

    const saleAmount = formData.get('sale-quantity');
    const salePrice = formData.get('sale-price');
    const salePurpose = formData.get('sale-remarks');

    if (!saleDate.trim() || !saleCode.trim() || !saleAmount.trim() || !salePrice.trim() || !salePurpose.trim() ) {
        alert(ALERT_INPUT_MESSAGES.EMPTY_INPUT);
        return;
    }

    localStorageHandler.updateInStorage(SALE_KEY, { id: parseInt(saleId, 10), date: saleDate, code: saleCode, quantity: saleAmount, price: salePrice, remarks: salePurpose });
    closePopup();
}

export function deleteProdFromStorage() {
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

    const saleProdInput = document.querySelector('input[name="sale-prod"]');
    saleProdInput.value = '';

    const saleAmountInput = document.querySelector('input[name="sale-quantity"]');
    saleAmountInput.value = '';

    const salePriceInput = document.querySelector('input[name="sale-price"]');
    salePriceInput.value = '';

    const salePurposeInput = document.querySelector('input[name="sale-remarks"]');
    salePurposeInput.value = '';

    const container = document.getElementById('selected-prods-container');
    container.innerHTML = '';
}

export function closePopup() {
    window.close();
    if (window.opener) window.opener.location.reload();
}