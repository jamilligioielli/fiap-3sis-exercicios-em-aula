export class LocalStorageCtrl{


    setLocalStorageItems(itemName: string, value: any){
        const localStorageItem = JSON.stringify(value);
        localStorage.setItem(itemName, localStorageItem);
    }

    getLocalStorageItem(itemName: string){
        const item = localStorage.getItem(itemName) ?? "";
        if(itemName){
            return JSON.parse(item);
        }
        return null;
    }
}