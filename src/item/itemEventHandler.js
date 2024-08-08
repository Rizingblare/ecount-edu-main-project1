import { ITEM_KEY } from '../constants/config.js';
import { ALERT_EVENT_MESSAGES } from '../constants/messageConstants.js';

import * as utils from '../utils/utils.js';
import * as pagenationHandler from '../utils/pagenationHandler.js';
import { loadFromStorage } from '../utils/localStorageHandler.js';

export function init() {
    utils.allformsPreventSubmit();
    utils.renderItems(generateItemElement, loadFromStorage(ITEM_KEY));
    pagenationHandler.registerPaginationEvents(generateItemElement, loadFromStorage(ITEM_KEY));
}

function generateItemElement(item) {
    const itemElement = document.createElement('tr');
    itemElement.dataset.id = item.id;
    itemElement.dataset.code = item.code;
    itemElement.dataset.name = item.name;
    itemElement.classList.add('item');
    itemElement.innerHTML = `
        <td class="item-select">
            <input type="checkbox">
        </td>    
        <td class="item-code">
            <a href="javascript:void(0);" class="select-link">
                ${item.code}
            </a>
        </td>
        <td class="item-name">${item.name}</td>
        <td class="item-update">
            <a href="javascript:void(0);" class="edit-link">
                수정
            </a>
        </td>
    `;
    return itemElement;
}

export function searchItemsByKeyword() {
    const items = loadFromStorage(ITEM_KEY);
    const itemCodeInput = document.querySelector('input[name="item-code"]').value.trim();
    const itemNameInput = document.querySelector('input[name="item-name"]').value.trim();
    const filteredItems = items.filter(item => {
        return item.code.includes(itemCodeInput) && item.name.includes(itemNameInput);
    });

    utils.renderItems(generateItemElement, filteredItems);  // 필터된 아이템 렌더링 및 페이지네이션 초기화
    pagenationHandler.registerPaginationEvents(generateItemElement, filteredItems);  // 필터된 결과에 맞게 페이지네이션 재설정
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


export function handleItemSelectLink(target) {
    const itemElement = target.closest('tr');

    const selectedItemDTO = {
        id: itemElement.dataset.id,
        code: itemElement.dataset.code,
        name: itemElement.dataset.name
    };
    if (window.opener) {
        window.opener.postMessage({ selectedItems: [ selectedItemDTO ] }, '*');
        window.close();
    }
    else {
        alert(ALERT_EVENT_MESSAGES.NO_PARENT_WINDOW);
    }
}


export function handleItemEditPopupLink(event) {
    const target = event.target.closest('.edit-link');
    
    if (target) {
        const itemElement = target.closest('tr');
        const itemEditDTO = {
            id: itemElement.dataset.id,
            code: itemElement.dataset.code,
            name: itemElement.dataset.name
        };
        openItemEditPopup(itemEditDTO);
    }
}

export function openItemEditPopup(dto) {
    if (dto) {
        window.open(
            `itemEdit.html?item-id=${dto.id}&item-code=${dto.code}&item-name=${dto.name}`,
            'itemEditPopup',
            'width=600,height=400'
        );
    }
    else {
        window.open(
            'itemEdit.html',
            'itemEditPopup',
            'width=600,height=400'
        );
    }
}

export function limitCheckboxSelection() {
    const maxSelectCount = getMaxSelectCountByHost();
    
    const checkboxes = document.querySelectorAll('#item-list .item-select input[type="checkbox"]');
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


export function submitItems() {
    const checkboxes = document.querySelectorAll('#item-list .item-select input[type="checkbox"]');
    const selectedItems = Array.from(checkboxes)
        .filter(checkbox => checkbox.checked)
        .map(checkbox => {
            const itemElement = checkbox.closest('.item');
            return {
                id: itemElement.dataset.id,
                code: itemElement.dataset.code,
                name: itemElement.dataset.name
            };
        });
    console.log('selectedItems:', selectedItems);
    if (selectedItems.length === 0) {
        alert(ALERT_EVENT_MESSAGES.NO_SELECTED_ITEM);
    } else {
        // 선택된 아이템을 부모 창에 전달
        if (window.opener) {
            window.opener.postMessage({ selectedItems: selectedItems }, '*');
        }
        window.close(); // 팝업 창 닫기
    }
}
