import { SUCCESS_MESSAGES } from "../config/messageConstants.js";
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
        const addedDummysID = dummys[storageKey].map((item, index) => ({
            id: index + 1,
            ...item
        }));
        saveToStorage(storageKey, addedDummysID);
        return addedDummysID;
    }
}

export function addToStorage(storageKey, newValue) {
    let values = loadFromStorage(storageKey);
    newValue.id = getNextId();
    values.push(newValue);
    localStorage.setItem(storageKey, JSON.stringify(values));
    window.alert(SUCCESS_MESSAGES.SUCCESS_TO_SAVE);
}

export function updateInStorage(storageKey, primaryKey, updatedValue) {
    let values = loadFromStorage(storageKey);
    let index = values.findIndex(value => value[primaryKey] === updatedValue[primaryKey]);
    if (index !== -1) {
        values[index] = updatedValue;
        localStorage.setItem(storageKey, JSON.stringify(values));
    }
    window.alert(SUCCESS_MESSAGES.SUCCESS_TO_UPDATE);
}

export function deleteFromStorage(storageKey, primaryKey) {
    let values = loadFromStorage(storageKey);
    let index = values.findIndex(value => value[primaryKey] === primaryKey);
    if (index !== -1) {
        values.splice(index, 1);
        localStorage.setItem(storageKey, JSON.stringify(values));
    }
    window.alert(SUCCESS_MESSAGES.SUCCESS_TO_DELETE);
}