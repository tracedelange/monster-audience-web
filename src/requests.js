import { baseURL } from "./globals";


export const getUserFeed = async (page=0) => {
    
    
    const token = localStorage.getItem('jwt')
    const method = "GET"
    const headers = { "Content-Type": "application/json", "Authorization": `Bearer ${token}` }
    const response = await fetch(`${baseURL}/feed?page=${page}`, { method: method, headers: headers })
    const data = await response.json()
    return data

}

export const getSpecificUserFeed = async (id, page=0) => {
       
    const token = localStorage.getItem('jwt')
    const method = "GET"
    const headers = { "Content-Type": "application/json", "Authorization": `Bearer ${token}` }
    const response = await fetch(`${baseURL}/feed/${id}?page=${page}`, { method: method, headers: headers })
    const data = await response.json()
    return data

}

export const postReview = async (newReview) => {

    const token = localStorage.getItem('jwt')
    const method = "POST"
    const body = newReview
    const headers = { "Content-Type": "application/json", "Authorization": `Bearer ${token}` }
    const response = await fetch(`${baseURL}/reviews`, { method: method, headers: headers, body: JSON.stringify(body) })
    const data = await response.json()
    return data

}


export const deleteReview = async (review_id) => {

    const token = localStorage.getItem('jwt')
    const method = "DELETE"
    const headers = { "Content-Type": "application/json", "Authorization": `Bearer ${token}` }
    const response = await fetch(`${baseURL}/reviews/${review_id}`, { method: method, headers: headers })
    const data = await response
    return data
}


export const searchUsers = async (query) => {

    const token = localStorage.getItem('jwt')
    const method = "GET"
    const headers = { "Content-Type": "application/json", "Authorization": `Bearer ${token}` }
    const response = await fetch(`${baseURL}/users/search?query=${query}`, { method: method, headers: headers })
    const data = await response.json()
    return data
}
export const searchSubjects = async (query) => {

    const token = localStorage.getItem('jwt')
    const method = "GET"
    const headers = { "Content-Type": "application/json", "Authorization": `Bearer ${token}` }
    const response = await fetch(`${baseURL}/subjects/search?query=${query}`, { method: method, headers: headers })
    const data = await response.json()
    return data
}

export const createFriendShip = async (user_id) => {

    const token = localStorage.getItem('jwt')
    const method = "POST"
    const headers = { "Content-Type": "application/json", "Authorization": `Bearer ${token}` }
    const response = await fetch(`${baseURL}/friendships?friend_id=${user_id}`, { method: method, headers: headers })
    const data = await response.json()
    return data
}
export const destroyFriendShip = async (user_id) => {

    const token = localStorage.getItem('jwt')
    const method = "DELETE"
    const headers = { "Content-Type": "application/json", "Authorization": `Bearer ${token}` }
    const response = await fetch(`${baseURL}/friendships/${user_id}`, { method: method, headers: headers })
    const data = await response
    return data
}

