 import axios from 'axios'
 
 const axios_create = axios.create({
    baseURL:'https://ill-lime-coral-toga.cyclic.app'
    // baseURL:'http://localhost:4600'
})

export default axios_create;