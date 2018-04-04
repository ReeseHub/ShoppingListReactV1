import * as namespace from './ShoppingListElement'

export interface ShoppingItemDeletePromptState {
    show: boolean,
    item: namespace.ShoppingListItem,
    hideDelete: () => void,
    itemDelete: () => void
}