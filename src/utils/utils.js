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
    const itemList = document.getElementById('item-list');
    itemList.innerHTML = '';
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    const itemsToShow = items.slice(startIndex, endIndex);

    itemsToShow.forEach(item => {
        itemList.appendChild(generateFunc(item));
    });
    updatePaginationButtons(items.length, currentPage);
}

export function updatePaginationButtons(totalItems, currentPage) {
    const itemsPerPage = 10;
    const totalPages = Math.ceil(totalItems / itemsPerPage);
    const prevButton = document.getElementById('prev-btn');
    const nextButton = document.getElementById('next-btn');

    prevButton.disabled = currentPage === 1;
    nextButton.disabled = currentPage === totalPages;
}

export function registerPaginationEvents() {
    const prevButton = document.getElementById('prev-btn');
    const nextButton = document.getElementById('next-btn');
    const pageState = { currentPage: 1 };

    prevButton.addEventListener('click', function() {
        navigateLeft(pageState);
    });

    nextButton.addEventListener('click', () => {
        navigateRight(pageState);
    });
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
