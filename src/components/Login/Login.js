import React, { useContext } from "react";
import { initializeApp } from "firebase/app";
import firebaseConfig from "./firebase.config";
import {
  getAuth,
  signInWithPopup,
  GoogleAuthProvider,
  getIdToken,
} from "firebase/auth";
import { UserContext } from "../../App";
import { useHistory } from "react-router-dom";
import { useLocation } from "react-router-dom";

const Login = () => {
  const [loggedInUser, setLoggedInUser] = useContext(UserContext);

  const history = useHistory();
  const location = useLocation();

  let { from } = location.state || { from: { pathname: "/" } };

  const app = initializeApp(firebaseConfig);
  //Google Sign in
  const googleProvider = new GoogleAuthProvider();
  const handelGoogleSignIn = () => {
    const auth = getAuth();
    signInWithPopup(auth, googleProvider)
      .then((result) => {
        const credential = GoogleAuthProvider.credentialFromResult(result);
        const token = credential.accessToken;
        const user = result.user;
        const { displayName, email } = user;
        const signedInUser = { name: displayName, email };
        setLoggedInUser(signedInUser);
        storeAuthToken();
        history.replace(from);
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        const email = error.email;
        const credential = GoogleAuthProvider.credentialFromError(error);
        console.log("errorCode:", errorCode);
        console.log("errorMessage:", errorMessage);
        console.log("email:", email);
        console.log("credential:", credential);
      });
  };

  const storeAuthToken = () => {
    const auth = getAuth();
    const user = auth.currentUser;

    if (user) {
      getIdToken(user)
        .then((idToken) => {
          sessionStorage.setItem("token", idToken);
        })
        .catch((error) => {
          console.log(error);
        });
    }
  };

  return (
    <div>
      <h1>This is Login</h1>
      <button onClick={handelGoogleSignIn}>Google Sign in</button>
    </div>
  );
};

export default Login;
