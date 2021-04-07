import React, { createContext, useContext, useEffect, useState } from 'react';
import firebase from 'firebase/app';
import 'firebase/auth';

const authContext = createContext();

export function useAuth() {
  return useContext(authContext);
}

export function AuthProvider({ children }) {
  const auth = useAuthProvider();
  return (
    <authContext.Provider value={auth}>
      {children}
    </authContext.Provider>
  );
}

function useAuthProvider() {
  const [user, setUser] = useState({});

  const login = (email, password) => {
    return firebase
      .auth()
      .signInWithEmailAndPassword(email, password)
      .then(response => {
        setUser(response.user);
        return response.user;
      });
  };

  const logout = async () => {
    return firebase
      .auth()
      .signOut()
      .then(() => {
        setUser(null);
      });
  };

  useEffect(() => {
    const unsub = firebase.auth().onAuthStateChanged(changedUser => {
      console.log(`User changed`, changedUser);
      if (changedUser) {
        setUser(changedUser);
      } else {
        setUser(null);
      }
    });

    return () => unsub();
  }, []);

  return {
    user,
    login,
    logout
  };
}
