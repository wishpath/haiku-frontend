import { jwtDecode } from 'jwt-decode'; //function to decode jwt - jason web tokens

export class LoginUtils {

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
}