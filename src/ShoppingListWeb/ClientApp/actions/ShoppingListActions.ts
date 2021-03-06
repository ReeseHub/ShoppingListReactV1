﻿import { ActionTypeKeys }  from "./ActionTypes";
import { ShoppingListElementState, ShoppingListItem } from '../store/ShoppingListElement'
import { AppThunkAction } from '../store/';
import ShoppingListApi from "../api/ShoppingListApi";
import { fetch, addTask } from 'domain-task';
import { Navigator } from '../navigator'

interface FetchShoppingListRequestAction {
    type: ActionTypeKeys.FETCH_SHOPPINGLIST_REQUEST 
    page: number,
    size: number
}

interface FetchShoppingListSuccessAction {
    type: ActionTypeKeys.FETCH_SHOPPINGLIST_SUCCESS 
    shoppingList: ShoppingListItem[],
    page: number;
    pageCount: number;
}

interface FetchShoppingListErrorAction {
    type: ActionTypeKeys.FETCH_SHOPPINGLIST_ERROR,
    errorMessage : string
}

// Action creatores
export const fetchShoppingListRequest = (page: number, size: number) : FetchShoppingListRequestAction=> ({
    type: ActionTypeKeys.FETCH_SHOPPINGLIST_REQUEST,
    page,
    size
});

export const fetchShoppingListSuccess = (data: FetchShoppingListJsonResponse): FetchShoppingListSuccessAction =>
{
    //console.log("item count=" + data.items.length);
    const object: FetchShoppingListSuccessAction = {

        type: ActionTypeKeys.FETCH_SHOPPINGLIST_SUCCESS,
        shoppingList: data.items,  // [] as ShoppingListItem[],    // new Array<ShoppingListItem>(),<ShoppingListItem[]>[]
        page: data.pageIndex,
        pageCount : data.totalPages
    };

    console.log("fetch success : " + object.pageCount);

    return object;
};

 interface FetchShoppingListJsonResponse {
    pageIndex: number,
    totalPages: number,
    hasPreviousPage: boolean,
    hasNextPage: boolean,
    items : ShoppingListItem[]
};

export const fetchShoppingListError = (errorMessage: string): FetchShoppingListErrorAction => ({
    type: ActionTypeKeys.FETCH_SHOPPINGLIST_ERROR,
    errorMessage
});

export type ShoppingListKnownAction = FetchShoppingListRequestAction | FetchShoppingListSuccessAction


export const actionCreators = {
    fetchShoppingList: (page: number, size: number = 10): AppThunkAction<ShoppingListKnownAction> => (dispatch, getState) => {
        
        const currentPage = getState().shoppingList.page;


        console.log('in action creator fetch shopping list. Page =' + page + ' Current Page=' + currentPage);

        if (page !== currentPage) {

            // inform app of action to fetch
         
            let fetchTask = ShoppingListApi.getShoppingList(page, size)
                .then(response => response.json())
                .then(data => {
                    console.log('after json call');
                    dispatch(fetchShoppingListSuccess(data as FetchShoppingListJsonResponse));
                });

            addTask(fetchTask); // Ensure server-side prerendering waits for this to complete

            dispatch(fetchShoppingListRequest(page, size));

        }
    },
    changePage: (page: number, size: number = 10): AppThunkAction<ShoppingListKnownAction> => (dispatch, getState) => {
       
        const currentPage = getState().shoppingList.page;

        const newUrl = `/ShoppingList/${page}`;

        Navigator.navigateTo(newUrl);

        //console.log(newUrl);
        //push(newUrl);

        
        
    }

};
