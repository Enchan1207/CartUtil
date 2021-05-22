//
// ウィッシュリスト
//

class WishList{

    constructor(items = []){
        this.items = items;
    }

    getItems(){
        return this.items;
    }

    addItem(item){
        this.items.push(item);
    }

    removeItem(item){
        // ... 
    }

    updateItem(id, newItem){
        // ... 
    }
}


