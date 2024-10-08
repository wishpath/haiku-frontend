import httpClient from './HttpCommonHaiku'; 

const getHaiku = (secret) => {
    return httpClient.get(`/gethaiku?secret=${encodeURIComponent(secret)}`);
};

const getSecret = (haiku) => {
    return httpClient.get(`/getsecret?haiku=${encodeURIComponent(haiku)}`);
};

export default { getHaiku, getSecret };