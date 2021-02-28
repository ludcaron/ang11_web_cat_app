export enum DataStateEnum {
    LOADING,
    LOADED,
    ERROR
}

export interface AppDataState<T> {
    dataState?: DataStateEnum,
    data?: T,
    errorMessage?: string
}

export enum ProducActionsTypes {
    GET_ALL_PRODUCTS = "[Product] Get All products",
    GET_SELECTED_PRODUCTS = "[Product] Get Selected products",
    GET_ALLVAILABLE_RODUCTS = "[Product] Get Available products",
    SEARCH_PRODUCTS = "[Product] Search products",
    NEW_PRODUCT = "[Product] New product",
    SELECT_PRODUCT = "[Product] Select product",
    EDIT_PRODUCT = "[Product] Edit product",
    DELETE_PRODUCT = "[Product] Delete product"
}

export interface ActionEvent {
    type: ProducActionsTypes,
    payload?: any
}