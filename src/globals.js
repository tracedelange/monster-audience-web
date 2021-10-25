export const baseURL = process.env.REACT_APP_BASE_URL;

export const websocket = 'ws://monster-audience-web.herokuapp.com/cable'

export const capitalize = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
}