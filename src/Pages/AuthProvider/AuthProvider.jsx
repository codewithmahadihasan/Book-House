import React, { createContext, useEffect, useState } from "react";
import app from "../../Firebase/Firebase";
import {
  createUserWithEmailAndPassword,
  getAuth,
  GoogleAuthProvider,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
  updateProfile,
} from "firebase/auth";
import Swal from "sweetalert2";
import Loading from "../Shared/Loading/Loading";

export const AuthContext = createContext();
const auth = getAuth(app);
const AuthProvider = ({ children }) => {
  const [user, setUser] = useState();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState();
  const googleProvider = new GoogleAuthProvider();
  const [seler, setSeller] = useState(false);
  const [side, setSide] = useState(true);

  const EmailWithLogin = (name, email, url, pass) => {
    setLoading(true);

    createUserWithEmailAndPassword(auth, email, pass)
      .then((userCredential) => {
        // Signed in
        const user = userCredential.user;
        updateProfile(auth.currentUser, {
          displayName: name,
          photoURL: url,
        }).then(() => {
          getToken(email);
          Swal.fire(
            "Registration Sucessfuly",
            "You clicked the button!",
            "success"
          );
          saveUser(user.displayName, user.email, user.photoURL);
        });
      })
      .catch((error) => {
        const errorMessage = error.message;
        console.log(errorMessage);
        if (errorMessage === "Firebase: Error (auth/email-already-in-use).") {
          Swal.fire("User Not Found", " Please Try Again", "info");
        }
      });
  };

  const login = (email, password) => {
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        getToken(email);
        const user = userCredential.user;
        saveUser(user.displayName, user.email, user.photoURL);

        Swal.fire("Login  Sucessfuly", "Thanks for login", "success");
        setError("");
      })
      .catch((error) => {
        const errorMessage = error.message;
        console.log(errorMessage);
        if (errorMessage === "Firebase: Error (auth/user-not-found).") {
          Swal.fire("User Not Found", " Please Try Again", "info");
        }
        if (errorMessage === "Firebase: Error (auth/wrong-password).") {
          Swal.fire("Password is not correct", " Please Try Again", "info");
        }
      });
  };

  const google = () => {
    signInWithPopup(auth, googleProvider)
      .then((result) => {
        const credential = GoogleAuthProvider.credentialFromResult(result);
        const user = result.user;
        getToken(user?.email);
        saveUser(user?.displayName, user?.email, user?.photoURL);
        Swal.fire("Login Sucessfuly ", "Thanks for login", "success");
      })
      .catch((error) => {
        const errorMessage = error.message;
      });
  };

  const logOut = () => {
    signOut(auth)
      .then(() => {
        localStorage.removeItem("token");
      })
      .catch((error) => {
        // An error happened.
      });
  };

  const saveUser = (name, email, photoURL) => {
    const user = { name, email, photoURL, role: seler ? "Seller" : "Buyer" };
    fetch("https://serversite-liart.vercel.app/users", {
      method: "post",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(user),
    })
      .then((res) => res.json())
      .then((data) => {});
  };

  const getToken = (email) => {
    fetch(`https://serversite-liart.vercel.app/jwt?email=${email}`)
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        if (data.accessToken) {
          localStorage.setItem("token", data.accessToken);
        }
      });
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUser(user);
      setLoading(false);
    });
    return () => {
      unsubscribe();
    };
  }, []);

  const authInfo = {
    user,
    EmailWithLogin,
    logOut,
    login,
    error,
    google,
    setSeller,
    side,
    setSide,
    loading,
    setLoading,
  };

  return (
    <AuthContext.Provider value={authInfo}>{children}</AuthContext.Provider>
  );
};

export default AuthProvider;
