import apiClient from "../utils/api-client";

export function addToCartAPI (id, quantity) {
    return apiClient.post(`/cart/${id}`, {quantity : quantity});
}


export function getCartAPI() {
    return apiClient.get("/cart")
}

export function removeCartAPI(id){
    return apiClient.patch(`/cart/remove/${id}`);
}

export function increaseCartQuantityAPI(id){
    return apiClient.patch(`/cart/increase/${id}`)
}


export function decreaseCartQuantityAPI(id){
    return apiClient.patch(`/cart/decrease/${id}`)
}