export function isEmptyDTO(dto) {
    if (Object.values(dto).every(value => {
        if (Array.isArray(value)) return value.length === 0;
        return value === '';
    })) {
        return;
    }
}

export function parseURLParams(urlInfos) {
    const params = new URLSearchParams(urlInfos);
    const result = {};

    params.forEach((value, key) => {
        result[key] = value;
    });

    return result;
}

export function allformsPreventSubmit() {
    const allForms = document.getElementsByTagName('form');
    for (const form of allForms) {
        form.addEventListener('submit', function(event) {
            event.preventDefault();
        })
    }
}

export function renderItems(generateFunc, items, currentPage=1) {
    const itemsPerPage = 10;
    const itemList = document.getElementById('main-list');
    itemList.innerHTML = '';
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    const itemsToShow = items.slice(startIndex, endIndex);

    itemsToShow.forEach(item => {
        itemList.appendChild(generateFunc(item));
    });
    updatePaginationButtons(items.length, currentPage);
}

function updatePaginationButtons(totalItems, currentPage) {
    const itemsPerPage = 10;
    const totalPages = Math.ceil(totalItems / itemsPerPage);
    const prevButton = document.getElementById('prev-btn');
    const nextButton = document.getElementById('next-btn');

    prevButton.disabled = currentPage === 1;
    nextButton.disabled = currentPage === totalPages;
}

export function targetInDateRange(target, startDateCondition, endDateCondition) {
    const targetDate = new Date(target);
    const startDate = startDateCondition ? new Date(startDateCondition) : new Date(-8640000000000000);
    const endDate = endDateCondition ? new Date(endDateCondition) : new Date(8640000000000000);

    return startDate <= targetDate && targetDate <= endDate;
}

export function targetInTextarray(target, arrayCondition) {
    return arrayCondition.length === 0 || arrayCondition.includes(target.trim().toUpperCase());
}

export function targetInText(target, textCondition) {
    return textCondition === '' || target.includes(textCondition);
}

export function openPopup(queryStringDTO) {
    const baseUrl = 'saleEdit.html';
    const popupOptions = 'width=600,height=400';

    if (!queryStringDTO) {
        window.open(baseUrl, 'saleEditPopup', popupOptions);
    } else {
        // 쿼리 스트링을 동적으로 생성합니다.
        const queryParams = new URLSearchParams();

        // queryStringDTO 객체의 모든 키-값 쌍을 순회하면서 쿼리 스트링을 만듭니다.
        for (const [key, value] of Object.entries(queryStringDTO)) {
            if (value !== undefined && value !== null) { // null 또는 undefined 값은 무시합니다.
                queryParams.append(key, value);
            }
        }

        // 최종 URL 생성
        const finalUrl = `${baseUrl}?${queryParams.toString()}`;
        window.open(finalUrl, 'saleEditPopup', popupOptions);
    }
}