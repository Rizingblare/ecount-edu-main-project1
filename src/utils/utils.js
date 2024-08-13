export function allformsPreventSubmit() {
    const allForms = document.getElementsByTagName('form');
    for (const form of allForms) {
        form.addEventListener('submit', function(event) {
            event.preventDefault();
        })
    }
}


export function isEmptyDTO(dto) {
    if (Object.values(dto).every(value => {
        if (Array.isArray(value)) return value.length === 0;
        return value === '';
    })) {
        return;
    }
}


export function getPrimaryKeyValueFromQueryString(PK) {
    const urlParams = new URLSearchParams(window.location.search);
    return parseInt(urlParams.get(PK));
}


export function parseURLParams(urlInfos) {
    const params = new URLSearchParams(urlInfos);
    const result = {};

    params.forEach((value, key) => {
        result[key] = value;
    });

    return result;
}


export function parseDateString(dateString) {
    const year = dateString.substring(0, 4);
    const month = dateString.substring(5, 7);
    const day = dateString.substring(8);
    
    return [year, month, day];
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