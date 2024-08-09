import * as utils from '../utils/utils.js';
import * as windowHandler from '../utils/windowHandler.js';
import * as pagenationHandler from '../utils/pagingHandler.js';
import { loadFromStorage, saveToStorage } from '../utils/localStorageHandler.js';

import { SALE_KEY, URL } from '../constants/config.js';
import { ALERT_EVENT_MESSAGES } from '../constants/messageConstants.js';


export function init() {
    utils.allformsPreventSubmit();
    utils.renderItems(generateSaleItemElement, loadFromStorage(SALE_KEY));
    pagenationHandler.registerPaginationEvents(generateSaleItemElement, loadFromStorage(SALE_KEY));
}

function generateSaleItemElement(sale) {
    const itemElement = document.createElement('tr');
    itemElement.dataset.data_dt = sale.data_dt;
    itemElement.dataset.data_no = sale.data_no;
    itemElement.dataset.prodCode = sale.prodCode;
    itemElement.dataset.prodName = sale.prodName;
    itemElement.dataset.quantity = sale.quantity;
    itemElement.dataset.price = sale.price;
    itemElement.dataset.remarks = sale.remarks;
    itemElement.classList.add('item');
    itemElement.innerHTML = `
        <td class="sale-select">
            <input type="checkbox">
        </td>    
        <td>
            <a href="javascript:void(0);" class="edit-link">
                ${sale.data_dt}-${sale.data_no}
            </a>
        </td>
        <td>${sale.prodCode}</td>
        <td>${sale.prodName}</td>
        <td>${sale.quantity}</td>
        <td>${sale.price}</td>
        <td>${sale.remarks}</td>
    `;
    return itemElement;
}

export function openSearchProdPopup() {
    windowHandler.openPopupWindow(URL.PROD);
}

export function updateSelectedProds(event) {
   const selectedProds = event.data.selectedProds;
    if (selectedProds && selectedProds.length > 0) {
        utils.generateSelectedProdItemElement(selectedProds);
    }
}

export function searchProdsByKeyword() {
    const searchInputDTO = {
        startDate : document.querySelector('input[name="start-date"]').value.trim(),
        endDate : document.querySelector('input[name="end-date"]').value.trim(),
        saleProds: [],
        saleRemarks : document.querySelector('input[name="sale-remarks"]').value.trim()
    }

    const selectedArea = document.getElementById('selected-prods-container');

    if (selectedArea.querySelector('input')) {
        const selectedValue = selectedArea.querySelector('input').value.trim().toUpperCase();
        if (selectedValue) searchInputDTO.saleProds.push(selectedValue);
    }
    else {
        const selectedValues = selectedArea.querySelectorAll('.msg-prod');
        Array.from(selectedValues).map(value => searchInputDTO.saleProds.push(value.dataset.code));
    }

    if (utils.isEmptyDTO(searchInputDTO)) return;

    const items = loadFromStorage(SALE_KEY);
    const filteredItems = items.filter(item => {
        return utils.targetInDateRange(item.data_dt, searchInputDTO.startDate, searchInputDTO.endDate) &&
            utils.targetInTextarray(item.prodCode, searchInputDTO.saleProds) &&
            utils.targetInText(item.remarks, searchInputDTO.saleRemarks);
    });
    utils.renderItems(generateSaleElement, filteredItems);
    pagenationHandler.registerPaginationEvents(generateSaleElement, filteredItems);
}



export function handleSaleEditPopupLink(event) {
    const target = event.target.closest('.edit-link');
    
    if (target) {
        const prodElement = target.closest('tr');
        const prodEditDTO = {
            data_dt: prodElement.dataset.data_dt,
            data_no: prodElement.dataset.data_no,
            prodCode: prodElement.dataset.prodCode,
            prodName: prodElement.dataset.prodName,
            quantity: prodElement.dataset.quantity,
            price: prodElement.dataset.price,
            remarks: prodElement.dataset.remarks
        };
        windowHandler.openPopupWindow(URL.SALE_EDIT, prodEditDTO);
    }
}

export function limitCheckboxSelection(isOpened) {
    const checkboxes = document.querySelectorAll('#prod-list .prod-select input[type="checkbox"]');
    const selectedCheckboxes = Array.from(checkboxes).filter(checkbox => checkbox.checked);
    console.log('selectedCheckboxes:', selectedCheckboxes.length);
    if (isOpened) {
        if (selectedCheckboxes.length > 1) {
            alert(ALERT_EVENT_MESSAGES.EXCEED_COUNT_ONE);
            selectedCheckboxes[selectedCheckboxes.length - 1].checked = false;
        }
    }
    else {
        if (selectedCheckboxes.length > 3) {
            alert(ALERT_EVENT_MESSAGES.EXCEED_COUNT_THREE);
            selectedCheckboxes[selectedCheckboxes.length - 1].checked = false;
        }
    }
    
    const selectAllCheckbox = document.getElementById('select-all');
    if (selectedCheckboxes.length < checkboxes.length) {
        selectAllCheckbox.checked = false;
    }
}