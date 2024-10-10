import httpClientE from './HttpCommonEmployee'

const getAll = () => {
   return httpClientE.get('/load-all')
}

export default {getAll}