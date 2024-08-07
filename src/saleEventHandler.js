import { SALE_KEY } from './constants/config.js';
import { ALERT_EVENT_MESSAGES } from './constants/messageConstants.js';
import { allformsPreventSubmit } from './utils/utils.js';
import { loadFromStorage } from './utils/localStorageHandler.js';

export function saleInit() {
    //localStorage.clear();
    allformsPreventSubmit();
    renderItems();
}

export function renderItems(currentPage=1) {
    let sales = loadFromStorage(SALE_KEY)
    const itemsPerPage = 10;
    const saleList = document.getElementById('sale-list');
    saleList.innerHTML = '';
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    const itemsToShow = sales.slice(startIndex, endIndex);

    itemsToShow.forEach(sale => {
        const itemElement = document.createElement('tr');
        itemElement.dataset.id = sale.id;
        itemElement.dataset.date = sale.date;
        itemElement.dataset.dateCode = sale.dateCode;
        itemElement.dataset.itemCode = sale.itemCode;
        itemElement.dataset.name = sale.itemName;
        itemElement.dataset.amount = sale.amount;
        itemElement.dataset.price = sale.price;
        itemElement.dataset.purpose = sale.purpose;
        itemElement.classList.add('item');
        itemElement.innerHTML = `
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
        saleList.appendChild(itemElement);
    });
    updatePaginationButtons(sales.length, currentPage);
}

export function updatePaginationButtons(totalItems, currentPage) {
    const itemsPerPage = 10;
    const totalPages = Math.ceil(totalItems / itemsPerPage);
    const prevButton = document.getElementById('prev-btn');
    const nextButton = document.getElementById('next-btn');

    prevButton.disabled = currentPage === 1;
    nextButton.disabled = currentPage === totalPages;
}

export function navigateLeft(pageState) {
    if (pageState.currentPage > 1) {
        pageState.currentPage--;
        renderItems(pageState.currentPage);
    }
}

export function navigateRight(pageState) {
    const items = loadFromStorage(ITEM_KEY);
    const totalPages = Math.ceil(items.length / 10);
    if (pageState.currentPage < totalPages) {
        pageState.currentPage++;
        renderItems(pageState.currentPage);
    }
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

export function searchItemsByKeyword(items) {
    console.log('searchItemsByKeyword');
    const startDateInput = document.querySelector('input[name="start-date"]').value.trim();
    const endDateInput = document.querySelector('input[name="end-date"]').value.trim();
    
    const saleItems = document.querySelectorAll('.msg-item');
    const saleItemCodeArray = Array.from(saleItems).map(item => item.dataset.code);
    console.log('saleItemCodeArray:', saleItemCodeArray.length, saleItemCodeArray[0]);

    const salePurposeInput = document.querySelector('input[name="sale-purpose"]').value.trim();
    const filteredItems = items.filter(item => {
        const itemDate = new Date(item.date);
        const startDate = startDateInput ? new Date(startDateInput) : new Date(-8640000000000000); // 최소 날짜
        const endDate = endDateInput ? new Date(endDateInput) : new Date(8640000000000000); // 최대 날짜

        // 날짜 범위 체크
        const isDateInRange = itemDate >= startDate && itemDate <= endDate;

        // 품목 코드 체크
        const isItemCodeIncluded = saleItemCodeArray.length === 0 || saleItemCodeArray.includes(item.itemCode.trim().toUpperCase());

        // 목적 체크
        const isPurposeIncluded = salePurposeInput === '' || item.purpose.includes(salePurposeInput);

        // 모든 조건이 참인 경우 필터링
        return isDateInRange && isItemCodeIncluded && isPurposeIncluded;
    });

    renderItems(filteredItems, 1);  // 필터된 아이템 렌더링 및 페이지네이션 초기화
    registerPaginationEvents(filteredItems);  // 필터된 결과에 맞게 페이지네이션 재설정
}

function registerAddPopupEvent() {
    const addBtn = document.getElementById('add-btn');
    addBtn.addEventListener('click', function() {
        openPopup();
    });
}

function registerEditPopupEvent() {
    document.getElementById('sale-list').addEventListener('click', function(event) {
        
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
    
            openEditPopup(itemId, date, dateCode, itemCode, itemName, amount, price, purpose);
        }
    });
}

function openEditPopup(id, date, dateCode, itemCode, itemName, amount, price, purpose) {
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

function registerSelectAllEvent(isOpened) {
    const selectAllCheckbox = document.getElementById('select-all');
    selectAllCheckbox.addEventListener('change', function() {
        const checkboxes = document.querySelectorAll('#item-list .item-select input[type="checkbox"]');
        checkboxes.forEach(checkbox => {
            checkbox.checked = selectAllCheckbox.checked;
        });
    });
}

function registerIndividualCheckboxEvent(isOpened) {
    const checkboxes = document.querySelectorAll('#item-list .item-select input[type="checkbox"]');
    checkboxes.forEach(checkbox => {
        checkbox.addEventListener('change', function() {
            limitCheckboxSelection(isOpened);
        });
    });
}

function limitCheckboxSelection(isOpened) {
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