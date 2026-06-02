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
      return false;
    }
    const currentTime = Math.floor(Date.now() / 1000); 
    if (!userObject.exp || userObject.exp < currentTime) {
      return false;
    } 
    if (!userObject.email_verified) {
      return false;
    }
    return true;
  }

  static displayLoginOrLogout_dependentOnState(isLoggedIn) {
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
    let reactAppOathClientId = "178934486776-9u03nj51gi63idnl8lnphmias2frf8uf.apps.googleusercontent.com";
    /* global google */ //this comment has to be here, dont remove. defined in index.html as script http://accounts.google.com/gsi/client
    google.accounts.id.initialize({
      //client_id is Google OAuth identifier for my app.
      client_id: reactAppOathClientId,
      callback: whenSomeoneTriesToLogInWithGoogle
    });


    //just injects google button into this LogInDiv element
    google.accounts.id.renderButton(
      document.getElementById("LogInDiv"),
      { theme: "outline", size: "large" }
    );
  }


  static decodeResponse(response) {
    if (!response) {
        console.error("response is null");
        return null;
    }
    var returnedEncodedUserObject = response.credential;
    if (!returnedEncodedUserObject) {
        console.error("missing credential");
        return null;
    }
    var userObject = LoginUtils.decodeEncodedUserObject(returnedEncodedUserObject);
    if (!userObject) {
        console.error("invalid JWT (JSON web token) format");
        return null;
    }
    return userObject;
  }
}