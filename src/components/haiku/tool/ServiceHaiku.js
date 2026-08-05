import httpClient from './HttpCommonHaiku'; 

// encodeURIComponent makes string URL-safe (e.g.: "hello world" -> "hello%20world")
const getHaiku = (secret) => {
    // Browser automatically sends the SESSION_ID cookie with this request (if one exists)
    return httpClient.get(`/gethaiku?secret=${encodeURIComponent(secret)}`);
};


const getSecret = (haiku) => {
    // Browser automatically sends the SESSION_ID cookie with this request (if one exists)
    return httpClient.get(`/getsecret?haiku=${encodeURIComponent(haiku)}`);
};

const backendAuthenticate = (idToken) => {
    //idToken — is taken imediately from response from google: response.credential
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

const backendLogout = () => {
    // Browser automatically sends the SESSION_ID cookie with this request (if one exists).
    // Backend removes the session and instructs the browser to delete the cookie.
    return httpClient.post('/logout');
};

export default { getHaiku, getSecret, backendAuthenticate, backendLogout };