export function isEmptyDTO(dto) {
    if (Object.values(dto).every(value => {
        if (Array.isArray(value)) return value.length === 0;
        return value === '';
    })) {
        return;
    }
}

export function allformsPreventSubmit() {
    const allForms = document.getElementsByTagName('form');
    for (const form of allForms) {
        form.addEventListener('submit', function(event) {
            event.preventDefault();
        })
    }
}


export function generateSelectedProdItemElement(prodDTOs) {
    const container = document.getElementById('selected-prod-container');
    container.innerHTML = '';
    prodDTOs.forEach(prodDTO => {
        const selectedProdElement = document.createElement('span');
        selectedProdElement.textContent = prodDTO["prodName"] + '(' + prodDTO["prodCode"] + ') [X]';
        selectedProdElement.dataset.code = prodDTO["prodCode"];
        selectedProdElement.classList.add('selected-prod');
        selectedProdElement.onclick = function() {
            container.removeChild(selectedProdElement);
        }
        container.appendChild(selectedProdElement);
    });
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

