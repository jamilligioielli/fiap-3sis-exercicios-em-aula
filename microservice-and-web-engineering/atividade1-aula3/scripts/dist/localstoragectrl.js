export class LocalStorageCtrl {
    setLocalStorageItems(itemName, value) {
        const localStorageItem = JSON.stringify(value);
        localStorage.setItem(itemName, localStorageItem);
    }
    getLocalStorageItem(itemName) {
        const item = localStorage.getItem(itemName);
        if (itemName && item) {
            return JSON.parse(item);
        }
        return null;
    }
}
