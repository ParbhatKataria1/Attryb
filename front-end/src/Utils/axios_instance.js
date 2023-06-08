 import axios from 'axios'
 
 const axios_create = axios.create({
    baseURL:'https://ill-lime-coral-toga.cyclic.app'
})

export default axios_create;