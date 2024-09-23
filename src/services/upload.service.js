import httpClientU from '../http-common-upload'

const upload = data => {
    return httpClientU.put('/', data);
 }

export default {upload}