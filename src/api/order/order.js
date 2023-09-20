import {
    deleteRequest,
    getRequest, patchRequest, postFormDataRequest,
    postRequest
} from "../methodCalls";
import {
    getOrdersByRestIdURI,
    addOrderByRestIdURI,
    editOrderURI,
    deleteOrderURI,
    changeOrderStatusURI
} from "../endpoints";


export const getOrdersByRestId = (params) => {
    // const id = params.id;
    const reqURI = getOrdersByRestIdURI;
    return getRequest(`${reqURI}`);
}

export const addOrderByRestId = (payload) => {
    const id = payload.id;
    const reqURI = addOrderByRestIdURI.replace(':id', id);
    return postRequest(`${reqURI}`, payload);
}

export const changeOrderStatus = (payload) => {
    const id = payload.id;
    const reqURI = changeOrderStatusURI.replace(':id', id);
    return postFormDataRequest(reqURI, payload);
}

export const deleteOrder = (payload) => {
    const id = payload.id;
    const reqURI = deleteOrderURI.replace(':id', id);
    return deleteRequest(reqURI, payload);
}

