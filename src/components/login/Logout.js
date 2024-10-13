import { GoogleLogout } from 'react-google-login';

const clientId = process.env.REACT_APP_OATH_CLIENT_ID;




function Logout() {

    const onSuccess = () => {
        console.log("Logout successful!");
    }

    return(
        <div id='logoutButton'>
            <GoogleLogout
                clientId={clientId}
                buttonText="Logout"
                onLogoutSuccess={onSuccess}
            />
        </div>
    )
}

export default Logout;