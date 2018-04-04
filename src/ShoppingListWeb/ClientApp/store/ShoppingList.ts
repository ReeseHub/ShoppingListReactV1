
import * as namespace from './ShoppingListElement'

export interface ShoppingListState {
    shoppingItems: namespace.ShoppingListItem[],
    page : number
}