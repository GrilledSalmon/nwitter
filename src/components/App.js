import { useEffect, useState } from "react";
import AppRouter from "components/Router";
import { authService } from "fbase";

function App() {
  const [init, setInit] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(
    authService.getAuth().currentUser
  );
  const [userObj, setUserObj] = useState(null);
  const auth = authService.getAuth();

  useEffect(() => {
    authService.onAuthStateChanged(auth, (user) => {
      if (user) {
        setIsLoggedIn(true);
        setUserObj(user);
      } else {
        setIsLoggedIn(false);
      }
      setInit(true);
    });
  }, []);

  return (
    <>
      {init ? (
        <AppRouter isLoggedIn={isLoggedIn} userObj={userObj} />
      ) : (
        <p>Initializing...</p>
      )}
      <footer>
        &copy; {new Date().getFullYear()} 온글잎 화이팅
      </footer>
    </>
  );
}

export default App;
