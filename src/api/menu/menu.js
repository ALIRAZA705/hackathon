import {
    deleteRequest,
    getRequest, patchRequest, postFormDataRequest,
    postRequest
} from "../methodCalls";
import {
    getAllMenuItemsURI,
    editMenuItemURI,
    deleteMenuItemURI,
    addMenuItemURI,
    getMenuItemsByRestIdURI
} from "../endpoints";

export const getAllMenuItems = (params) => {
    return getRequest(`${getAllMenuItemsURI}/`);
}

export const getMenuItemsByRestId = (params) => {
    const id = params.id;
    const reqURI = getMenuItemsByRestIdURI.replace(':id', id);
    return getRequest(`${reqURI}`);
}

export const addNewMenuItem = (payload) => {
    return postFormDataRequest(addMenuItemURI, payload);
}

export const editMenuItem = (payload) => {
    const id = payload.menu_id;
    const reqURI = editMenuItemURI.replace(':id', id);
    return postFormDataRequest(reqURI, payload);
}

export const deleteMenuItem = (payload) => {
    const id = payload.id;
    const reqURI = deleteMenuItemURI.replace(':id', id);
    return deleteRequest(reqURI, payload);
}
