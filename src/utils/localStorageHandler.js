import { SUCCESS_MESSAGES } from "../constants/messageConstants.js";
import { dummys } from "../dummys/dummys.js";

export function getNextId() {
    let nextId = parseInt(localStorage.getItem('nextId') || '0', 10);
    localStorage.setItem('nextId', (nextId + 1).toString());
    return nextId;
}

export function saveToStorage(key, values) {
    localStorage.setItem(key, JSON.stringify(values));
}

export function loadFromStorage(key) {
    const storedItems = localStorage.getItem(key);
    if (storedItems) {
        return JSON.parse(storedItems);
    }
    else {
        saveToStorage(key, JSON.stringify(dummys[key]));
        loadFromStorage(key);
    }
}

export function addToStorage(key, newValue) {
    let values = loadFromStorage(key);
    values.push(newValue);
    localStorage.setItem(key, JSON.stringify(values));
    window.alert(SUCCESS_MESSAGES.SUCCESS_TO_SAVE);
}

export function updateInStorage(key, updatedValue) {
    let values = loadFromStorage(key);
    let index = values.findIndex(value => value.id === updatedValue.id);
    if (index !== -1) {
        values[index] = updatedValue;
        localStorage.setItem(key, JSON.stringify(values));
    }
    window.alert(SUCCESS_MESSAGES.SUCCESS_TO_UPDATE);
}

export function deleteFromStorage(key, id) {
    let values = loadFromStorage(key);
    let index = values.findIndex(value => value.id === parseInt(id, 10));
    if (index !== -1) {
        values.splice(index, 1);
        localStorage.setItem(key, JSON.stringify(values));
    }
    window.alert(SUCCESS_MESSAGES.SUCCESS_TO_DELETE);
}