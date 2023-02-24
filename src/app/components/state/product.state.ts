



export interface AppDataState<T> {
  dataState: DataStateEnum;
  data?: T;
  errorMessage?: string;
}

export enum DataStateEnum {
  LOADING, LOADED, ERROR
}

export enum ProductActionType {
  GET_ALL_PRODUCTS = "[Product] Get All Products",
  GET_SELECTED_PRODUCTS = "[Product] Get Selected Products",
  GET_AVAILABLE_PRODUCTS = "[Product] Get available Products",
  SEARCH_PRODUCTS = "[Product] Search Products",
  SELECT_PRODUCT = "[Product] Select Product",
  NEW_PRODUCT = "[Product] New Product",
  EDIT_PRODUCT = "[Product] Edit Product",
  DELETE_PRODUCT = "[Product] Delete Product",
  PRODUCT_ADDED = "[Product] Add Product",
  PRODUCT_UPDATED = "[Product] Product Updated",
}

export interface ActionEvent {
  type: ProductActionType,
  payload?: any
}
