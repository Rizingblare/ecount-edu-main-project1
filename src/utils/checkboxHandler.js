import * as config from "../config/config.js";
import { ALERT_EVENT_MESSAGES } from "../config/messageConstants.js";


export function changeStateOfAllCheckboxes(pageState) {
    const { EXCEED_COUNT_MESSAGE } = getLimitSelectCountByHost(pageState);
    if (pageState.hasOpener) {
        alert(EXCEED_COUNT_MESSAGE);
        selectAllCheckbox.checked = false;
    }

    else {
        const checkboxes = document.querySelectorAll('#mainList .selectIndividualCheckbox input[type="checkbox"]');
        checkboxes.forEach(checkbox => {
            checkbox.checked = selectAllCheckbox.checked;
        });
    }
}


export function limitCheckboxSelection(pageState) {
    const { LIMIT_SELECT_COUNT, EXCEED_COUNT_MESSAGE } = getLimitSelectCountByHost(pageState);
    
    const checkboxes = document.querySelectorAll('#mainList .selectIndividualCheckbox input[type="checkbox"]');
    const selectedCheckboxes = Array.from(checkboxes).filter(checkbox => checkbox.checked);

    if (selectedCheckboxes.length > LIMIT_SELECT_COUNT) {
        alert(EXCEED_COUNT_MESSAGE);
        selectedCheckboxes[selectedCheckboxes.length - 1].checked = false;
    }

    const selectAllCheckbox = document.getElementById('selectAllCheckbox');
    if (selectedCheckboxes.length < checkboxes.length) {
        selectAllCheckbox.checked = false;
    }
}


function getLimitSelectCountByHost(pageState) {
    const limitSelectInfo = {
        LIMIT_SELECT_COUNT: null,
        EXCEED_COUNT_MESSAGE: null
    }

    if (pageState.hasOpener) {
        const openerURL = window.opener.location.href;
        
        if (openerURL.includes(config.URL.SALE_EDIT)) {
            limitSelectInfo.LIMIT_SELECT_COUNT = 1;
            limitSelectInfo.EXCEED_COUNT_MESSAGE = ALERT_EVENT_MESSAGES.EXCEED_COUNT_ONE;
        }
        
        else if (openerURL.includes(config.URL.SALE)) {
            limitSelectInfo.LIMIT_SELECT_COUNT = 3;
            limitSelectInfo.EXCEED_COUNT_MESSAGE = ALERT_EVENT_MESSAGES.EXCEED_COUNT_THREE;
        }
    }

    else {
        limitSelectInfo.LIMIT_SELECT_COUNT = 10;
        limitSelectInfo.EXCEED_COUNT_MESSAGE = ALERT_EVENT_MESSAGES.EXCEED_COUNT_TEN;
    }
    return limitSelectInfo;
}