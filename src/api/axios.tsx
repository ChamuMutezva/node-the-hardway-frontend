import axios from "axios";

export default axios.create({
    baseURL: 'https://cooperative-tuna-spacesuit.cyclic.app/api/notes'
})