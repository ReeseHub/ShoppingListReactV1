export interface ShoppingListElementState {
    item: ShoppingListItem,
    showDelete: (item: ShoppingListItem)=>void,
}

export interface ShoppingListItem {

    id: number,
    item: string,
    quantity: number,
    category: { id: number, name: string }
}