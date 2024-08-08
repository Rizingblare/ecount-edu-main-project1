import * as utils from '../utils/utils.js';
import * as pagenationHandler from '../utils/pagenationHandler.js';
import { loadFromStorage } from '../utils/localStorageHandler.js';

import { SALE_KEY } from '../constants/config.js';
import { ALERT_EVENT_MESSAGES } from '../constants/messageConstants.js';


export function init() {
    utils.allformsPreventSubmit();
    utils.renderItems(generateSaleElement, loadFromStorage(SALE_KEY));
    pagenationHandler.registerPaginationEvents(generateSaleElement, loadFromStorage(SALE_KEY));
}

function generateSaleElement(sale) {
    const saleElement = document.createElement('tr');
    saleElement.dataset.id = sale.id;
    saleElement.dataset.date = sale.date;
    saleElement.dataset.dateCode = sale.dateCode;
    saleElement.dataset.itemCode = sale.itemCode;
    saleElement.dataset.name = sale.itemName;
    saleElement.dataset.amount = sale.amount;
    saleElement.dataset.price = sale.price;
    saleElement.dataset.purpose = sale.purpose;
    saleElement.classList.add('item');
    saleElement.innerHTML = `
        <td class="sale-select">
            <input type="checkbox">
        </td>    
        <td class="sale-date-code">
            <a href="javascript:void(0);" class="edit-link">
                ${sale.date}-${sale.dateCode}
            </a>
        </td>
        <td class="sale-item-code">${sale.itemCode}</td>
        <td class="sale-item-name">${sale.itemName}</td>
        <td class="sale-amount">${sale.amount}</td>
        <td class="sale-price">${sale.price}</td>
        <td class="sale-purpose">${sale.purpose}</td>
    `;
    return saleElement;
}

export function openSearchItemPopup() {
    window.open('item.html', 'itemPopup', 'width=600,height=400');
}

export function updateSelectedItems(event) {
   const selectedItems = event.data.selectedItems;
    if (selectedItems && selectedItems.length > 0) {
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

export function searchItemsByKeyword() {
    const searchInputDTO = {
        startDate : document.querySelector('input[name="start-date"]').value.trim(),
        endDate : document.querySelector('input[name="end-date"]').value.trim(),
        saleItems: [],
        salePurpose : document.querySelector('input[name="sale-purpose"]').value.trim()
    }

    const selectedArea = document.getElementById('selected-items-container');

    if (selectedArea.querySelector('input')) {
        const selectedValue = selectedArea.querySelector('input').value().trim().toUpperCase(); // input 태그 선택
        if (selectedValue) searchInputDTO.saleItems.push(selectedValue);
    }
    else {
        const selectedValues = selectedArea.querySelectorAll('.msg-item');
        Array.from(selectedValues).map(value => searchInputDTO.saleItems.push(value.dataset.code));
    }

    if (utils.isEmptyDTO(searchInputDTO)) return;

    const items = loadFromStorage(SALE_KEY);

    const filteredItems = items.filter(item => {
        return utils.targetInDateRange(item.date, searchInputDTO.startDate, searchInputDTO.endDate) &&
            utils.targetInTextarray(item.itemCode, searchInputDTO.saleItems) &&
            utils.targetInText(item.purpose, searchInputDTO.salePurpose);
    });

    utils.renderItems(generateSaleElement, filteredItems);
    pagenationHandler.registerPaginationEvents(generateSaleElement, filteredItems);
}

export function deliverClosestDatasetToPopup(event) {
    const target = event.target.closest('.edit-link');
    
    if (target) {
        const itemElement = target.closest('tr');
        const itemId = itemElement.dataset.id;
        const date = itemElement.dataset.date;
        const dateCode = itemElement.dataset.dateCode;
        const itemCode = itemElement.dataset.itemCode;
        const itemName = itemElement.dataset.name;
        const amount = itemElement.dataset.amount;
        const price = itemElement.dataset.price;
        const purpose = itemElement.dataset.purpose;

        openPopup(itemId, date, dateCode, itemCode, itemName, amount, price, purpose);
    }
}

export function openPopup(id, date, dateCode, itemCode, itemName, amount, price, purpose) {
    if (!id || !date || !dateCode || !itemCode || !itemName || !amount || !price || !purpose) {
        window.open(
            'saleEdit.html',
            'saleEditPopup',
            'width=600,height=400'
        );
    }
    else {
        window.open(
            `saleEdit.html?sale-id=${id}&sale-date=${date}&sale-date-code=${dateCode}&sale-item-code=${itemCode}&sale-item-name=${itemName}&sale-amount=${amount}&sale-price=${price}&sale-purpose=${purpose}`,
            'saleEditPopup',
            'width=600,height=400'
        );
    }
}

export function limitCheckboxSelection(isOpened) {
    const checkboxes = document.querySelectorAll('#item-list .item-select input[type="checkbox"]');
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