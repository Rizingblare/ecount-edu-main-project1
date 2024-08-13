import * as utils from "../../utils/utils.js";
import * as popupHandler from '../../utils/popupHandler.js';
import * as localStorageHandler from "../../utils/localStorageHandler.js";
import * as selectedProdHandler from '../../prod/selectedProdHandler.js';

import * as config from "../../config/config.js";

export function init(pageState) {
    utils.allformsPreventSubmit();
    if (pageState.hasQueryString) {
        loadParams();
    }
}

export function loadParams() {
    const urlParams = window.location.search;
    const params = utils.parseURLParams(urlParams);

    const saleDateInput = document.querySelector('input[name="data_dt"]');
    saleDateInput.type = 'text';
    saleDateInput.value = params["data_dt"] + '-' + params["data_no"];
    saleDateInput.setAttribute('readonly', true);

    const prodDTOs = [{
        prodName: params["prodName"],
        prodCode: params["prodCode"],
        price: params["price"]
    }];

    selectedProdHandler.generateSelectedProdItemElement(prodDTOs);

    const saleQuantityInput = document.querySelector('input[name="quantity"]');
    saleQuantityInput.value = params["quantity"];

    const salePriceInput = document.querySelector('input[name="price"]');
    salePriceInput.value = params["price"];

    const saleRemarksInput = document.querySelector('input[name="remarks"]');
    saleRemarksInput.value = params["remarks"];
}

export function submitToStorage(pageState) {
    const formData = new FormData(document.querySelector('form'));

    var saleEditInputDTO;
    if (pageState.hasQueryString) {
       saleEditInputDTO = {
            id: utils.getIdFromQueryString(),
            date_dt: formData.get('data_dt').substring(0, 10),
            date_no: parseInt(formData.get('data_dt').substring(11)),
            prodCode: document.querySelector('.selectedProdItem').dataset.prodCode,
            prodName: document.querySelector('.selectedProdItem').dataset.prodName,
            quantity: parseInt(formData.get('quantity')),
            price: parseInt(formData.get('price')),
            remarks: formData.get('remarks')
        };
        localStorageHandler.updateInStorage(config.SALE_CONFIG.SECRET_KEY, 'id', saleEditInputDTO);
    }
    else {
        saleEditInputDTO = {
            id: localStorageHandler.getNextId(),
            date_dt: formData.get('data_dt'),
            date_no: localStorageHandler.getNextId(),
            prodCode: document.querySelector('.selectedProdItem').dataset.prodCode,
            prodName: document.querySelector('.selectedProdItem').dataset.prodName,
            quantity: parseInt(formData.get('quantity')),
            price: parseInt(formData.get('price')),
            remarks: formData.get('remarks')
        };
        localStorageHandler.addToStorage(config.SALE_CONFIG.SECRET_KEY, saleEditInputDTO);
    }
    popupHandler.closePopup();
}

export function editProdToStorage() {
    const formData = new FormData(document.querySelector('form'));
    const saleDate = formData.get('date_dt');
    const saleCode = document.querySelectorAll('.item')[0].dataset.prodCode;
    const saleAmount = formData.get('quantity');
    const salePrice = formData.get('price');
    const salePurpose = formData.get('remarks');

    if (!saleDate.trim() || !saleCode.trim() || !saleAmount.trim() || !salePrice.trim() || !salePurpose.trim() ) {
        alert(ALERT_INPUT_MESSAGES.EMPTY_INPUT);
        return;
    }

    localStorageHandler.updateInStorage(config.SALE_CONFIG.SECRET_KEY, { id: parseInt(saleId, 10), date: saleDate, code: saleCode, quantity: saleAmount, price: salePrice, remarks: salePurpose });
    popupHandler.closePopup();
}

export function deleteProdFromStorage() {
    const params = parseURLParams();
    localStorageHandler.deleteFromStorage(config.SALE_CONFIG.SECRET_KEY, params["sale-id"]);
    popupHandler.closePopup();
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