import * as config from '../config/config.js';
import * as utils from '../utils/utils.js';
import * as pagingHandler from '../utils/pagingHandler.js';
import * as popupHandler from '../utils/popupHandler.js';
import { loadFromStorage } from '../utils/localStorageHandler.js';

export function init() {
    //localStorage.clear();
    utils.allformsPreventSubmit();
    pagingHandler.renderItems(generateProdItemElement, loadFromStorage(config.PROD_CONFIG.SECRET_KEY));
    pagingHandler.registerPaginationEvents(generateProdItemElement, loadFromStorage(config.PROD_CONFIG.SECRET_KEY));
}

function generateProdItemElement(prodItem) {
    const prodElement = document.createElement('tr');
    prodElement.dataset.id = prodItem.id;
    prodElement.dataset.prodCode = prodItem.prodCode;
    prodElement.dataset.prodName = prodItem.prodName;
    prodElement.dataset.price = prodItem.price;
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
        <td>${prodItem.price}</td>
        <td>
            <a href="javascript:void(0);" class="editLink">
                수정
            </a>
        </td>
    `;
    return prodElement;
}

export function handleProdEditPopupLink(event) {
    const target = event.target.closest('.editLink');
    
    if (target) {
        const prodElement = target.closest('tr');
        const prodEditDTO = {
            id: prodElement.dataset.id,
            prodCode: prodElement.dataset.prodCode,
            prodName: prodElement.dataset.prodName,
            price: prodElement.dataset.price
        };
        popupHandler.openPopup(config.URL.PROD_EDIT, prodEditDTO);
    }
}


export function searchProdsByKeyword() {
    const prods = loadFromStorage(config.PROD_CONFIG.SECRET_KEY);
    const prodCodeInput = document.querySelector('input[name="prodCode"]').value.trim();
    const prodNameInput = document.querySelector('input[name="prodName"]').value.trim();
    const priceInput = document.querySelector('input[name="price"]').value.trim();
    const filteredProds = prods.filter(prod => {
        return prod.prodCode.includes(prodCodeInput) && prod.prodName.includes(prodNameInput);
    });

    pagingHandler.renderItems(generateProdItemElement, filteredProds);
    pagingHandler.registerPaginationEvents(generateProdItemElement, filteredProds);
}