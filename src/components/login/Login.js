//src/components/login/Login.js

import { GoogleLogin } from 'react-google-login';
const clientId = process.env.REACT_APP_OATH_CLIENT_ID;

function Login() {

    const onSuccess = (res) => {
        console.log("LOGIN SUCCESS! Current user: ", res.profileObj);
    }

    const onFailure = (res) => {
        console.log("LOGIN FAILED! res: ", res);
    }

    return(
        <div id='signInButton'>
            <GoogleLogin
                clientId={clientId}
                buttonText="Login"
                onSuccess={onSuccess}
                onFailure={onFailure}
                cookiePolicy={'single_host_origin'}
                isSignedIn={true} 
            />
        </div>
    )
}

export default Login;