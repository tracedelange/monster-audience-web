export const baseURL = process.env.REACT_APP_BASE_URL;

export const websocket = process.env.REACT_APP_WEBSOCKET;

export const capitalize = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
}