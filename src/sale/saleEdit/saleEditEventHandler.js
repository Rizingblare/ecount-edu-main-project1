import * as utils from "../../utils/utils.js";
import * as windowHandler from '../../utils/pageHandler.js';
import * as localStorageHandler from "../../utils/localStorageHandler.js";

import * as config from "../../constants/config.js";

export function init(urlParams) {
    utils.allformsPreventSubmit();
    const mode = urlParams === '' ? config.MODE.ADD : config.MODE.EDIT;
    if (mode === config.MODE.EDIT) {
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
    windowHandler.openPopupWindow(config.PROD_CONFIG.PROD.URL);
}

export function updateSelectedProds(event) {
     //if (event.origin !== 'http://yourdomain.com') return;
     const selectedProdItemsDTO = event.data.selectedProdItemsDTO;
     if (selectedProdItemsDTO && selectedProdItemsDTO.length > 0) {
         utils.generateSelectedProdItemElement(selectedProdItemsDTO);
    }
}

export function addProdToStorage() {
    const formData = new FormData(document.querySelector('form'));
    const saleDate = formData.get('date_dt');
    const saleCode = document.querySelectorAll('.selectedProdItem')[0].dataset.prodCode;
    // const saleProds = document.querySelectorAll('.item');
    // const saleCodeArray = Array.from(saleProds).map(prod => prod.dataset.prodCode);

    const saleAmount = formData.get('quantity');
    const salePrice = formData.get('price');
    const salePurpose = formData.get('remarks');
    
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
    
    localStorageHandler.addToStorage(config.SALE_CONFIG.KEY, newProd);
    closePopup();
}

export function editProdToStorage() {
    const formData = new FormData(document.querySelector('form'));
    const saleDate = formData.get('date_dt');
    const saleCode = document.querySelectorAll('.item')[0].dataset.prodCode;
    // const saleProds = document.querySelectorAll('.item');
    // const saleCodeArray = Array.from(saleProds).map(prod => prod.dataset.prodCode);

    const saleAmount = formData.get('quantity');
    const salePrice = formData.get('price');
    const salePurpose = formData.get('remarks');

    if (!saleDate.trim() || !saleCode.trim() || !saleAmount.trim() || !salePrice.trim() || !salePurpose.trim() ) {
        alert(ALERT_INPUT_MESSAGES.EMPTY_INPUT);
        return;
    }

    localStorageHandler.updateInStorage(config.SALE_CONFIG.KEY, { id: parseInt(saleId, 10), date: saleDate, code: saleCode, quantity: saleAmount, price: salePrice, remarks: salePurpose });
    closePopup();
}

export function deleteProdFromStorage() {
    const params = parseURLParams();
    localStorageHandler.deleteFromStorage(config.SALE_CONFIG.KEY, params["sale-id"]);
    closePopup();
}

export function resetSaleFormData(isEdit) {
    const urlParams = window.location.search;
    if (isEdit) {
        loadParams(urlParams);
        return;
    }

    const saleDateInput = document.querySelector('input[name="date_dt"]');
    saleDateInput.value = '';

    const saleProdInput = document.querySelector('input[name="sale-prod"]');
    saleProdInput.value = '';

    const saleAmountInput = document.querySelector('input[name="quantity"]');
    saleAmountInput.value = '';

    const salePriceInput = document.querySelector('input[name="price"]');
    salePriceInput.value = '';

    const salePurposeInput = document.querySelector('input[name="remarks"]');
    salePurposeInput.value = '';

    const container = document.getElementById('selectedProdsContainer');
    container.innerHTML = '';
}

export function closePopup() {
    window.close();
    if (window.opener) window.opener.location.reload();
}