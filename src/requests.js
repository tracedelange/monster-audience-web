import { baseURL } from "./globals";


export const getUserFeed = async () => {
    
    
    const token = localStorage.getItem('jwt')
    const method = "GET"
    const headers = { "Content-Type": "application/json", "Authorization": `Bearer ${token}` }
    const response = await fetch(`${baseURL}/feed`, { method: method, headers: headers })
    const data = await response.json()
    return data

}