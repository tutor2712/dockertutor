import axios from 'axios'

const api = axios.create({
    baseURL: 'http://192.168.99.100:8080/api',
})

export const insertMovie = payload => api.post(`/movie`, payload)
export const getBisection = () => api.get(`/BisectionEx`)
export const getfalse = () => api.get(`/falseEX`)
export const getnewton = () => api.get(`/newtonEX`)
export const getsecant = () => api.get(`/secantEX`)
export const getcomposite  = () => api.get(`/compositeEX`)
export const getdiff  = () => api.get(`/diffEX`)
export const updateMovieById = (id, payload) => api.put(`/movie/${id}`, payload)
export const deleteMovieById = id => api.delete(`/movie/${id}`)
export const getMovieById = id => api.get(`/movie/${id}`)

const apis = {
    insertMovie,
    getBisection,
    getfalse,
    updateMovieById,
    deleteMovieById,
    getMovieById,
    getnewton,
    getsecant,
    getcomposite,
    getdiff
}

export default apis