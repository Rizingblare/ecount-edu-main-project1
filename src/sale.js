import * as saleEventHandler from './saleEventHandler.js';

document.addEventListener('DOMContentLoaded', function() {
    const hasOpener = saleEventHandler.saleInit();
    registerSearchEvent();
    registerSearchItemPopupEvent();
    registerMessageEvent();
    registerAddPopupEvent();
    registerEditPopupEvent();
    registerIndividualCheckboxEvent();
    registerSelectAllEvent();
})

function registerSearchEvent(items) {
    const searchBtn = document.getElementById('search-btn');
    searchBtn.addEventListener('click', function() {
        searchItemsByKeyword(items);
    });
}

function registerSearchItemPopupEvent() {
    const searchItemBtn = document.getElementById('search-item-btn');
    
    searchItemBtn.addEventListener('click', function() {
        saleEventHandler.openSearchItemPopup();
    });

}

function registerMessageEvent() {
    window.addEventListener('message', function(event) {
        updateSelectedItems(event);
    });
}

function searchItemsByKeyword(items) {
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
    
            openPopup(itemId, date, dateCode, itemCode, itemName, amount, price, purpose);
        }
    });
}


function registerSelectAllEvent() {
    const selectAllCheckbox = document.getElementById('select-all');
    selectAllCheckbox.addEventListener('change', function() {
        const checkboxes = document.querySelectorAll('#item-list .item-select input[type="checkbox"]');
        checkboxes.forEach(checkbox => {
            checkbox.checked = selectAllCheckbox.checked;
        });
    });
}

function registerIndividualCheckboxEvent() {
    const checkboxes = document.querySelectorAll('#item-list .item-select input[type="checkbox"]');
    checkboxes.forEach(checkbox => {
        checkbox.addEventListener('change', function() {
            limitCheckboxSelection();
        });
    });
}

function limitCheckboxSelection() {
    const checkboxes = document.querySelectorAll('#item-list .item-select input[type="checkbox"]');
    const selectedCheckboxes = Array.from(checkboxes).filter(checkbox => checkbox.checked);
    const selectAllCheckbox = document.getElementById('select-all');
    if (selectedCheckboxes.length < checkboxes.length) {
        selectAllCheckbox.checked = false;
    }
}