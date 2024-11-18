import { jwtDecode } from 'jwt-decode'; //function to decode jwt - jason web tokens

export class LoginUtils {

  static decodeEncodedUserObject(returnedEncodedUserObject) {
    try {
      return jwtDecode(returnedEncodedUserObject);
    } catch (error) {
      console.error("Invalid JWT format:", error);
      return null;
    }
  }

  static credentialIsValid(userObject) {
    const clientId = process.env.REACT_APP_OATH_CLIENT_ID;
    if (userObject.aud !== clientId) {
      console.log("audience (aud) doesn't match the app's client ID");
      return false;
    }
    const currentTime = Math.floor(Date.now() / 1000); 
    if (!userObject.exp || userObject.exp < currentTime) {
      console.log("token has expired");
      return false;
    } 
    if (!userObject.email_verified) {
      console.log("email is not verified");
      return false;
    }
    return true;
  }

  static displayLoginOrLogout(isLoggedIn) {
    document.getElementById("LogInDiv").style.display = isLoggedIn ? 'none' : 'flex';
    document.getElementById("LogOutDiv").hidden = !isLoggedIn;
    document.getElementById("LogOutButton").hidden = !isLoggedIn;
  }
  static displayLogoutButton() {
    document.getElementById("LogInDiv").style.display = 'none';
    document.getElementById("LogOutDiv").hidden = false;
    document.getElementById("LogOutButton").hidden = false;
  }
  static displayLoginButton() {
    document.getElementById("LogInDiv").style.display = 'flex';
    document.getElementById("LogOutDiv").hidden = true;
    document.getElementById("LogOutButton").hidden = true;
  }


  static initialiseAndRenderLoginButton(whenSomeoneTriesToLogInWithGoogle) {
    /* global google */ //this comment has to be here, dont remove. defined in index.html as script http://accounts.google.com/gsi/client
    google.accounts.id.initialize({
      client_id: process.env.REACT_APP_OATH_CLIENT_ID, // == System.getEnv(REACT_APP_OATH_CLIENT_ID) // this is my authentication for google api
      callback: whenSomeoneTriesToLogInWithGoogle
    });
    google.accounts.id.renderButton(
      document.getElementById("LogInDiv"),
      { theme: "outline", size: "large" }
    );
  }


  static decodeResponse(response) {
    var returnedEncodedUserObject = response.credential;
    if (!returnedEncodedUserObject) {
      console.log("missing credential");
      return; 
    }
    var userObject = LoginUtils.decodeEncodedUserObject(returnedEncodedUserObject);
    return userObject;
  }
}