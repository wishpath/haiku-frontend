import httpClientU from './HttpCommonUpload'

const upload = data => {
    return httpClientU.put('/', data);
 }

export default {upload}