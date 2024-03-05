import { UPDATE_CART } from "./type"

export const updateCart = (value) => dispatch => {
    dispatch({
        type: UPDATE_CART,
        payload: { value }
    })
}