﻿import { fetch, addTask } from 'domain-task';
import { Action, Reducer, ActionCreator } from 'redux';
import { AppThunkAction } from '../store/';
import {ShoppingListState} from '../store/ShoppingList'
import { ShoppingListKnownAction } from '../actions/ShoppingListActions'
import { ActionTypeKeys } from "../Actions/ActionTypes";
import { ShoppingListItem } from '../store/ShoppingListElement';


const initialState: ShoppingListState = {
    shoppingItems: new Array<ShoppingListItem>(),
    isLoading: false,
    page: 0,
    pageCount :1
};


export const reducer: Reducer<ShoppingListState> = (state: ShoppingListState = initialState, incomingAction: Action) => {

    const action = incomingAction as ShoppingListKnownAction;

    console.log("In reducer");

    console.log(action.type);
    
    switch (action.type) {
        case ActionTypeKeys.FETCH_SHOPPINGLIST_REQUEST:
            // 
            return Object.assign({}, state, {
                isLoading: true,
                page : action.page
            });

        case ActionTypeKeys.FETCH_SHOPPINGLIST_SUCCESS:
            // Only accept the incoming data if it matches the most recent request. This ensures we correctly
            // handle out-of-order responses.

            console.log("action page : " + action.page);
            console.log("state page : " + state.page);
            //console.log(action.shoppingList);

            if (action.page === state.page) {
                return Object.assign({}, state, {
                    shoppingItems: action.shoppingList,// [...action.shoppingList],
                    page: action.page,
                    isLoading: false,
                    pageCount : action.pageCount
                });
            }
            

            break;
        default:
            // The following line guarantees that every action in the KnownAction union has been covered by a case above
            const exhaustiveCheck: never = action;
    }

    return state;// || initialState;
};
