import * as utils from "../../utils/utils.js";
import * as popupHandler from '../../utils/popupHandler.js';
import * as localStorageHandler from "../../utils/localStorageHandler.js";
import * as selectedProdHandler from '../../prod/selectedProdHandler.js';

import * as config from "../../config/config.js";
import { DTOFactory } from "../../model/DTOFactory.js";
import { SaleState } from "../../model/SaleDTO.js";

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
        prodCode: params["prodCode"]
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
    
    const saleEditDTO = DTOFactory.createSaleDTO();
        
    saleEditDTO.builder()
        .setId(pageState.hasQueryString ? utils.getIdFromQueryString() : localStorageHandler.getNextId())
        .setDateDt(formData.get('data_dt'))
        .setDateNo(pageState.hasQueryString ? utils.getIdFromQueryString() : localStorageHandler.getNextId())
        .setProdCode(formData.get('prodCode'))
        .setQuantity(formData.get('quantity'))
        .setPrice(formData.get('price'))
        .setRemarks(formData.get('remarks'))
        .build();

    if (!saleEditDTO.validate()) return;
    
    localStorageHandler.addToStorage(config.SALE_CONFIG.SECRET_KEY, saleEditDTO);
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