import httpClientE from '../http-common-employee'

const getAll = () => {
   return httpClientE.get('/load-all')
}

export default {getAll}