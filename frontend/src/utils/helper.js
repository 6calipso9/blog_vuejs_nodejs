export const server = {
    baseURL: 'http://localhost:3030'
}

export const headers = {
    Authorization : localStorage.getItem('jwt')
}