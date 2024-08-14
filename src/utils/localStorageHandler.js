import { FAIL_MESSAGES, SUCCESS_MESSAGES } from "../config/messageConstants.js";
import { dummys } from "../dummys/dummys.js";

export function getNextId() {
    let nextId = parseInt(localStorage.getItem('nextId') || '0', 10);
    localStorage.setItem('nextId', (nextId + 1).toString());
    return nextId;
}

export function saveToStorage(storageKey, values) {
    localStorage.setItem(storageKey, JSON.stringify(values));
}

export function loadFromStorage(storageKey) {
    const storedItems = localStorage.getItem(storageKey);
    if (storedItems) {
        return JSON.parse(storedItems);
    }
    else {
        const addedDummysID = dummys[storageKey].map((item) => ({
            id: getNextId(),
            ...item
        }));
        saveToStorage(storageKey, addedDummysID);
        return addedDummysID;
    }
}

export function addToStorage(storageKey, newValue) {
    let values = loadFromStorage(storageKey);
    //newValue.id = getNextId();
    values.push(newValue);
    console.log(newValue);
    saveToStorage(storageKey, values);
    window.alert(SUCCESS_MESSAGES.SUCCESS_TO_SAVE);
}

export function updateInStorage(storageKey, primaryKeyAttr, updatedValue) {
    let values = loadFromStorage(storageKey);
    let index = values.findIndex(value => value[primaryKeyAttr] === updatedValue[primaryKeyAttr]);
    if (index !== -1) {
        values[index] = updatedValue;
        saveToStorage(storageKey, values);
        window.alert(SUCCESS_MESSAGES.SUCCESS_TO_UPDATE);
    }
    else {
        window.alert(FAIL_MESSAGES.FAIL_TO_UPDATE);
    }
}

export function deleteFromStorage(storageKey, primaryKeyAttr, primaryKeyValue) {
    console.log(primaryKeyValue);
    let values = loadFromStorage(storageKey);
    let index = values.findIndex(value => value[primaryKeyAttr] === primaryKeyValue);
    if (index !== -1) {
        console.log(values[index]);
        values.splice(index, 1);
        saveToStorage(storageKey, values);
        window.alert(SUCCESS_MESSAGES.SUCCESS_TO_DELETE);
    }
    else {
        window.alert(FAIL_MESSAGES.FAIL_TO_DELETE);
    }
}