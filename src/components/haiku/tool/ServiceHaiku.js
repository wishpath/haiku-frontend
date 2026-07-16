import httpClient from './HttpCommonHaiku'; 

// encodeURIComponent makes string URL-safe (e.g.: "hello world" -> "hello%20world")
const getHaiku = (secret) => {
    return httpClient.get(`/gethaiku?secret=${encodeURIComponent(secret)}`);
};


const getSecret = (haiku) => {
    return httpClient.get(`/getsecret?haiku=${encodeURIComponent(haiku)}`);
};

const backendAuthenticate = (idToken) => {
    //idToken
        //is taken imediately from response from google: response.credential
    //returns 
        // UserObject and response code 200, when success.
            //UserObject
                //As JSON in the HTTP response body, e.g. { "id":1, "email":"a@b.com", "roles":["USER"] }
        //returns 401 (unauthorized) when failure.
        
    return httpClient.post(
        '/authenticate', 
        // request body (data sent to backend)
        { idToken }
    );
};

export default { getHaiku, getSecret, backendAuthenticate };