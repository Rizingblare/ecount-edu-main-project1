import { renderItems } from './utils.js';

export function registerPaginationEvents(generateFunc, items) {
    const prevButton = document.getElementById('prev-btn');
    const nextButton = document.getElementById('next-btn');
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
