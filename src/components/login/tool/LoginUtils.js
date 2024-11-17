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





}