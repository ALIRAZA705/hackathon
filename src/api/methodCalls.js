import axiosClient from "./apiClient";

export function getRequest(URL) {
    return axiosClient.get(`/${URL}`).then(response => response).catch(err => err);
}

export function postRequest(URL, payload) {
    return axiosClient.post(`/${URL}`, payload).then(response => response).catch(err => err);
}

export function patchRequest(URL, payload) {
    return axiosClient.patch(`/${URL}`, payload).then(response => response).catch(err => err);
}

export function deleteRequest(URL) {
    return axiosClient.delete(`/${URL}`).then(response => response).catch(err => err);
}

export function postFormDataRequest(URL, payload) {
    const accessToken = localStorage.getItem("accessToken");
    return axiosClient.post(`/${URL}`, payload, {headers: {
            "Content-Type": "multipart/form-data",
            'Authorization': `Bearer ${accessToken}`,
            Accept: 'application/json'
        }}
    ).then(response => response).catch(err => err);
}