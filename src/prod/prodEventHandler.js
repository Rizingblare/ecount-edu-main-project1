import { PROD_KEY } from '../constants/config.js';
import { ALERT_EVENT_MESSAGES } from '../constants/messageConstants.js';

import * as utils from '../utils/utils.js';
import * as pagenationHandler from '../utils/pagenationHandler.js';
import { loadFromStorage } from '../utils/localStorageHandler.js';

export function init() {
    utils.allformsPreventSubmit();
    utils.renderItems(generateProdElement, loadFromStorage(PROD_KEY));
    pagenationHandler.registerPaginationEvents(generateProdElement, loadFromStorage(PROD_KEY));
}

function generateProdElement(item) {
    const prodElement = document.createElement('tr');
    prodElement.dataset.id = item.id;
    prodElement.dataset.code = item.code;
    prodElement.dataset.name = item.name;
    prodElement.classList.add('item');
    prodElement.innerHTML = `
        <td class="prod-select">
            <input type="checkbox">
        </td>    
        <td class="prod-code">
            <a href="javascript:void(0);" class="select-link">
                ${prod.code}
            </a>
        </td>
        <td class="prod-name">${prod.name}</td>
        <td class="prod-update">
            <a href="javascript:void(0);" class="edit-link">
                수정
            </a>
        </td>
    `;
    return prodElement;
}

export function searchProdsByKeyword() {
    const prods = loadFromStorage(PROD_KEY);
    const prodCodeInput = document.querySelector('input[name="prod-code"]').value.trim();
    const prodNameInput = document.querySelector('input[name="prod-name"]').value.trim();
    const filteredProds = prods.filter(prod => {
        return prod.code.includes(prodCodeInput) && prod.name.includes(prodNameInput);
    });

    utils.renderProds(generateProdElement, filteredProds);  // 필터된 아이템 렌더링 및 페이지네이션 초기화
    pagenationHandler.registerPaginationEvents(generateProdElement, filteredProds);  // 필터된 결과에 맞게 페이지네이션 재설정
}

export function changeStateOfAllCheckboxes() {
    const hasOpener = window.opener ? true : false;
    if (hasOpener) {
        alert(ALERT_EVENT_MESSAGES.EXCEED_COUNT_ONE);
    }
    else {
        alert(ALERT_EVENT_MESSAGES.EXCEED_COUNT_THREE);
    }
    selectAllCheckbox.checked = false;
}


export function handleProdSelectLink(target) {
    const prodElement = target.closest('tr');

    const selectedProdDTO = {
        id: prodElement.dataset.id,
        code: prodElement.dataset.code,
        name: prodElement.dataset.name
    };
    if (window.opener) {
        window.opener.postMessage({ selectedProds: [ selectedProdDTO ] }, '*');
        window.close();
    }
    else {
        alert(ALERT_EVENT_MESSAGES.NO_PARENT_WINDOW);
    }
}


export function handleProdEditPopupLink(event) {
    const target = event.target.closest('.edit-link');
    
    if (target) {
        const prodElement = target.closest('tr');
        const prodEditDTO = {
            id: prodElement.dataset.id,
            code: prodElement.dataset.code,
            name: prodElement.dataset.name
        };
        utils.openPopupWindow(prodEditDTO);
    }
}

export function limitCheckboxSelection() {
    const maxSelectCount = getMaxSelectCountByHost();
    
    const checkboxes = document.querySelectorAll('#prod-list .prod-select input[type="checkbox"]');
    const selectedCheckboxes = Array.from(checkboxes).filter(checkbox => checkbox.checked);
    console.log('selectedCheckboxes:', selectedCheckboxes.length);
    if (hasOpener) {
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

function getMaxSelectCountByHost() {
    const openerURL = window.opener.location.href;
    if (openerURL.includes('saleEdit.html')) {
        return 1;
    }
    else if (openerURL.includes('sale.html')) {
        return 1;
    }
    else {
        return 10;
    }
}


export function submitProds() {
    const checkboxes = document.querySelectorAll('#prod-list .prod-select input[type="checkbox"]');
    const selectedProds = Array.from(checkboxes)
        .filter(checkbox => checkbox.checked)
        .map(checkbox => {
            const prodElement = checkbox.closest('.prod');
            return {
                id: prodElement.dataset.id,
                code: prodElement.dataset.code,
                name: prodElement.dataset.name
            };
        });
    console.log('selectedProds:', selectedProds);
    if (selectedProds.length === 0) {
        alert(ALERT_EVENT_MESSAGES.NO_SELECTED_PROD);
    } else {
        // 선택된 아이템을 부모 창에 전달
        if (window.opener) {
            window.opener.postMessage({ selectedProds: selectedProds }, '*');
        }
        window.close(); // 팝업 창 닫기
    }
}
