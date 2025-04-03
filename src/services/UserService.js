const BASE_URL = "https://18.222.216.105/"

export async function getAllUsers(params) {
    const response = await fetch(BASE_URL+ '/users/')
    return response.json();   
}