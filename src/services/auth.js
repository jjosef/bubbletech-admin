import { createContext, useContext, useEffect, useState } from 'react';
import firebase from 'firebase/app';
import 'firebase/auth';
// import request from 'superagent';

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
  const [idToken, setIdToken] = useState(null);
  const [profile, setProfile] = useState(null);

  const login = (email, password) => {
    return firebase
      .auth()
      .signInWithEmailAndPassword(email, password)
      .then(async response => {
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
    const unsub = firebase.auth().onAuthStateChanged(async changedUser => {
      if (changedUser) {
        try {
          const newToken = await firebase.auth().currentUser.getIdToken(true);
          setIdToken(newToken);
          setUser(changedUser);
          // const host = process.env.REACT_APP_API_HOST;
          // const res = await request.get(`${host}/admin/whoami`).set('Authorization', `Bearer ${newToken}`);
          const idTokenResult = await firebase.auth().currentUser.getIdTokenResult();
          setProfile(idTokenResult);
        } catch(err) {
          console.log(err);
          logout();
        }
      } else {
        setIdToken(null);
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
