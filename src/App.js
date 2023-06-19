import { Switch, Route, Redirect } from "react-router-dom";
import "./App.css";
// import AuthForm from './component/Auth/AuthForm';
import HomePage from "./component/Pages/HomePages";
import AuthPage from "./component/Pages/AuthPage";
// import { useContext } from "react";
// import AuthContext from "./store/auth-context";
import ProfilePage from "./component/StartingPage/ProfilePage";
import ResetPassword from "./component/Auth/ResetPassword";
import authimg from './assets/auth.jpg'

import { useSelector } from "react-redux";

function App() {
  // const authCtx = useContext(AuthContext);
  const isLoggedIn=useSelector(state=>state.authentication.isAuthenticated)


  return (
    <div
      className="App"
      style={{
        backgroundImage: `srcassetsauth.jpg(/${authimg})`,
        backgroundSize:'cover', // To adjust the background image size
        width: '100%', // Set the desired width
        height: '100vh',
      }}
    >
      {/* <div>
      <img src={authimage} alt="auth image"></img>
      </div> */}
      <Switch>
        <Route path="/" exact>
          <AuthPage />
        </Route>
        {isLoggedIn && (
          <Route path="/home" exact>
            <HomePage />
          </Route>
        )}

        {isLoggedIn && (
          <Route path="/home/profile">
            <ProfilePage />
          </Route>
        )}

        <Route path="/resetpassword">
          <ResetPassword />
        </Route>

        <Route path="*">
          <Redirect to="/" />
        </Route>
      </Switch>
    </div>
  );
}

export default App;
