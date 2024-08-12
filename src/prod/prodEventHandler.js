import * as config from '../constants/config.js';
import { ALERT_EVENT_MESSAGES } from '../constants/messageConstants.js';

import * as utils from '../utils/utils.js';
import * as pageHandler from '../utils/pageHandler.js';
import * as windowHandler from '../utils/pageHandler.js';
import { loadFromStorage } from '../utils/localStorageHandler.js';

export function init() {
    utils.allformsPreventSubmit();
    pageHandler.renderItems(generateProdItemElement, loadFromStorage(config.PROD_CONFIG.KEY));
    pageHandler.registerPaginationEvents(generateProdItemElement, loadFromStorage(config.PROD_CONFIG.KEY));
}

function generateProdItemElement(prodItem) {
    const prodElement = document.createElement('tr');
    prodElement.dataset.prodCode = prodItem.prodCode;
    prodElement.dataset.prodName = prodItem.prodName;
    prodElement.classList.add('item');
    prodElement.innerHTML = `
        <td class="selectIndividualCheckbox">
            <input type="checkbox">
        </td>    
        <td>
            <a href="javascript:void(0);" class="selectLink">
                ${prodItem.prodCode}
            </a>
        </td>
        <td>${prodItem.prodName}</td>
        <td>
            <a href="javascript:void(0);" class="editLink">
                수정
            </a>
        </td>
    `;
    return prodElement;
}

export function submitProdItemByLink(target) {
    const prodElement = target.closest('tr');

    const selectedProdDTO = {
        prodCode: prodElement.dataset.prodCode,
        prodName: prodElement.dataset.prodName
    };

    if (window.opener) {
        window.opener.postMessage({ selectedProdItemsDTO: [ selectedProdDTO ] }, '*');
        //window.close();
    }
    else {
        alert(ALERT_EVENT_MESSAGES.NO_PARENT_WINDOW);
    }
}

export function submitProdItemsByBtn() {
    const checkboxes = document.querySelectorAll('#mainList .selectIndividualCheckbox input[type="checkbox"]');
    const selectedProdItemsDTO = Array.from(checkboxes)
        .filter(checkbox => checkbox.checked)
        .map(checkbox => {
            const prodElement = checkbox.closest('.item');
            return {
                prodCode: prodElement.dataset.prodCode,
                prodName: prodElement.dataset.prodName
            };
        });
    if (selectedProdItemsDTO.length === 0) {
        alert(ALERT_EVENT_MESSAGES.NO_SELECTED_PROD);
    }
    else {
        if (window.opener) {
            window.opener.postMessage({ selectedProdItemsDTO: selectedProdItemsDTO }, '*');
        }
        window.close();
    }
}


export function handleProdEditPopupLink(event) {
    const target = event.target.closest('.editLink');
    
    if (target) {
        const prodElement = target.closest('tr');
        const prodEditDTO = {
            code: prodElement.dataset.prodCode,
            name: prodElement.dataset.prodName
        };
        windowHandler.openPopupWindow(config.PROD_CONFIG.PROD_EDIT.URL, prodEditDTO);
    }
}


export function searchProdsByKeyword() {
    const prods = loadFromStorage(config.PROD_CONFIG.KEY);
    const prodCodeInput = document.querySelector('input[name="prodCode"]').value.trim();
    const prodNameInput = document.querySelector('input[name="prodName"]').value.trim();
    const filteredProds = prods.filter(prod => {
        return prod.code.includes(prodCodeInput) && prod.name.includes(prodNameInput);
    });

    pageHandler.renderItems(generateProdItemElement, filteredProds);
    pageHandler.registerPaginationEvents(generateProdItemElement, filteredProds);
}