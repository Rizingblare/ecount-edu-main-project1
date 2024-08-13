export function renderItems(generateFunc, items, currentPage=1) {
    const itemsPerPage = 10;
    const itemList = document.getElementById('mainList');
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
    const prevButton = document.getElementById('prevBtn');
    const nextButton = document.getElementById('nextBtn');

    prevButton.disabled = currentPage === 1;
    nextButton.disabled = currentPage === totalPages;
}


export function registerPaginationEvents(generateFunc, items) {
    const prevButton = document.getElementById('prevBtn');
    const nextButton = document.getElementById('nextBtn');
    const pageState = { currentPage: 1 };

    prevButton.addEventListener('click', function() {
        navigateLeft(generateFunc, items, pageState);
    });

    nextButton.addEventListener('click', () => {
        navigateRight(generateFunc, items, pageState);
    });
}

export function navigateLeft(generateFunc, items, pageState) {
    if (pageState.currentPage > 1) {
        pageState.currentPage--;
        renderItems(generateFunc, items, pageState.currentPage);
    }
}

export function navigateRight(generateFunc, items, pageState) {
    const totalPages = Math.ceil(items.length / 10);
    if (pageState.currentPage < totalPages) {
        pageState.currentPage++;
        renderItems(generateFunc, items, pageState.currentPage);
    }
}
