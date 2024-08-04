import { allformsPreventSubmit } from './utils/preventFormSubmit.js';

const items = [
    { id: 1, code: 'P100001', name: '진라면' },
    { id: 2, code: 'P200003', name: '신라면' },
    { id: 3, code: 'P200004', name: '안성탕면' },
    { id: 4, code: 'P300001', name: '짜파게티' }
];

document.addEventListener('DOMContentLoaded', function() {
    allformsPreventSubmit();
    loadItems();
    addEditlink();
})

function loadItems() {
    const itemList = document.getElementById('item-list');
    itemList.innerHTML = '';
    items.forEach(item => {
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
                <a href="javascript:void(0);" class="edit-link">
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
        itemList.appendChild(itemElement);
    });
}

function addEditlink() {
    const editLinks = document.querySelectorAll('.edit-link');
    editLinks.forEach(link => {
        link.addEventListener('click', function(event) {
            event.preventDefault();
            const itemElement = this.closest('tr');
            const itemId = itemElement.dataset.id; // 또는 row.getAttribute('data-id');
            const itemCode = itemElement.dataset.code; // 또는 row.getAttribute('data-code');
            const itemName = itemElement.dataset.name; // 또는 row.getAttribute('data-name');
    
            // 여기에 팝업 창 열기 등의 로직 추가
            openPopup(itemId, itemCode, itemName);
        });
    });
}

// 팝업 창 열기 함수 (예시)
function openPopup(id, code, name) {
    window.open(
        `itemEdit.html?item-code=${code}&item-name=${name}`,
        'itemEditPopup',
        'width=600,height=400'
    );
}