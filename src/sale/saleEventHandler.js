import * as config from '../config/config.js';
import * as utils from '../utils/utils.js';
import * as pagingHandler from '../utils/pagingHandler.js';
import * as popupHandler from '../utils/popupHandler.js';
import { loadFromStorage } from '../utils/localStorageHandler.js';



export function init() {
    utils.allformsPreventSubmit();
    pagingHandler.renderItems(generateSaleItemElement, loadFromStorage(config.SALE_CONFIG.SECRET_KEY));
    pagingHandler.registerPaginationEvents(generateSaleItemElement, loadFromStorage(config.SALE_CONFIG.SECRET_KEY));
}

function generateSaleItemElement(saleItem) {
    const saleElement = document.createElement('tr');
    const [saleYear, saleMonth, saleDay] = utils.parseDateString(saleItem.data_dt);
    saleElement.dataset.id = saleItem.id;
    saleElement.dataset.data_dt = saleItem.data_dt;
    saleElement.dataset.data_no = saleItem.data_no;
    saleElement.dataset.prodCode = saleItem.prodCode;
    saleElement.dataset.prodName = saleItem.prodName;
    saleElement.dataset.quantity = saleItem.quantity;
    saleElement.dataset.price = saleItem.price;
    saleElement.dataset.remarks = saleItem.remarks;
    saleElement.classList.add('item');
    saleElement.innerHTML = `
        <td class="selectIndividualCheckbox">
            <input type="checkbox">
        </td>    
        <td>
            <a href="javascript:void(0);" class="editLink">
                ${saleYear}/${saleMonth}/${saleDay}-${saleItem.data_no}
            </a>
        </td>
        <td>${saleItem.prodCode}</td>
        <td>${saleItem.prodName}</td>
        <td>${saleItem.quantity}</td>
        <td>${saleItem.price}</td>
        <td>${saleItem.remarks}</td>
    `;
    return saleElement;
}

export function handleSaleEditPopupLink(event) {
    const target = event.target.closest('.editLink');
    
    if (target) {
        const saleElement = target.closest('tr');
        const saleEditDTO = {
            id: saleElement.dataset.id,
            data_dt: saleElement.dataset.data_dt,
            data_no: saleElement.dataset.data_no,
            prodCode: saleElement.dataset.prodCode,
            prodName: saleElement.dataset.prodName,
            quantity: saleElement.dataset.quantity,
            price: saleElement.dataset.price,
            remarks: saleElement.dataset.remarks
        };
        popupHandler.openPopup(config.URL.SALE_EDIT, saleEditDTO);
    }
}

export function searchSalesByKeyword() {
    const searchInputDTO = {
        startDate : document.querySelector('input[name="startDate"]').value.trim(),
        endDate : document.querySelector('input[name="endDate"]').value.trim(),
        saleProds: [],
        saleRemarks : document.querySelector('input[name="remarks"]').value.trim()
    }

    const prodContainer = document.getElementById('prodContainer');
    const selectedValues = prodContainer.querySelectorAll('.selectedProdItem');
    const selectedValue = prodContainer.querySelector('input').value.trim().toUpperCase();

    if (selectedValues) {
        Array.from(selectedValues).map(value => searchInputDTO.saleProds.push(value.dataset.prodCode));
    }

    if (selectedValue) {
        searchInputDTO.saleProds.push(selectedValue);
    }

    if (utils.isEmptyDTO(searchInputDTO)) return;

    const items = loadFromStorage(config.SALE_CONFIG.SECRET_KEY);
    const filteredItems = items.filter(item => {
        return utils.targetInDateRange(item.data_dt, searchInputDTO.startDate, searchInputDTO.endDate) &&
            utils.targetInTextarray(item.prodCode, searchInputDTO.saleProds) &&
            utils.targetInText(item.remarks, searchInputDTO.saleRemarks);
    });
    pagingHandler.renderItems(generateSaleItemElement, filteredItems);
    pagingHandler.registerPaginationEvents(generateSaleItemElement, filteredItems);
}