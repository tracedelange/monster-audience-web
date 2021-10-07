import {baseURL} from './globals.js'

export const submitSignup = async (signupObject) => {

    const method = "POST"
    const headers = { "Content-Type": "application/json" }
    const body = signupObject
    const response = await fetch(`${baseURL}/signup`, { method: method, headers: headers, body: JSON.stringify(body) })
    const data = await response.json()
    return data
}

export const submitLogin = async (loginObject) => {

    const method = "POST"
    const headers = { "Content-Type": "application/json" }
    const body = loginObject
    const response = await fetch(`${baseURL}/login`, { method: method, headers: headers, body: JSON.stringify(body) })
    const data = await response.json()
    return data
}

export const getUserInfo = async (token) => {

    const method = "GET"
    const headers = { "Content-Type": "application/json", "Authorization": `Bearer ${token}` }
    const response = await fetch(`${baseURL}/me`, { method: method, headers: headers })
    const data = await response.json()
    return data


}