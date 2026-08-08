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
    // idToken is taken immediately from Google's login response: response.credential.
    // On success, backend verifies the token, creates a server-side session,
    // and browser automatically stores the returned SESSION_ID cookie.
    
    // Returns UserObject (200):
    // {
    //   googleId: "12345678901234567890",
    //   email: "john@example.com",
    //   given_name: "John",
    //   picture: "https://lh3.googleusercontent.com/..."
    // }
    
    // Returns 401 (Unauthorized) on authentication failure.
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

const getUserObject = () => {
    // Browser automatically sends the SESSION_ID cookie with this request (if one exists).
    // Backend uses the cookie to find the server-side UserObject.
    // Returns UserObject (200) when the session is valid, or 401 (Unauthorized) otherwise.
    return httpClient.get('/get-user-object');
};

export default { getHaiku, getSecret, backendAuthenticate, backendLogout, getUserObject };