import React, { useEffect } from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
  Outlet,
} from "react-router-dom";
import { Container } from "react-bootstrap";
import Header from "./components/Header";
// import Footer from "./components/Footer";
import LoginScreen from "./screens/LoginScreen";
import RegisterScreen from "./screens/RegisterScreen";
import InformScreen from "./screens/InformScreen";
import ConnectScreen from "./screens/ConnectScreen";
import TechScreen from "./screens/TechScreen";
import RescueScreen from "./screens/RescueScreen";
import CollabScreen from "./screens/CollabScreen";
import FavoritesScreen from "./screens/FavoritesScreen";
import UsersScreen from "./screens/UsersScreen";
import { useSelector, useDispatch } from "react-redux";
import { getUserDetails } from "./actions/userActions";
import { refresh } from "./actions/authActions";

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    let token = localStorage.getItem("profile");
    console.log(token + "token on app refresh from local storage");
    if (token) {
      try {
        dispatch(refresh(token));
        // console.log(accessToken + "accessToken after refresh");
        // try {
        //   dispatch(getUserDetails(accessToken));
        // } catch (error) {
        //   console.log(accessToken + "get user details with new access token fail");
        // }
      } catch (error) {
        console.log(token + "refresh fail")
      }
    }
  }, [dispatch]);

  return (
    <Router>
      <Header />
      <main className='py-3'>
        <Container>
          <Routes>
            <Route path='*' element={<Navigate replace to='/' />} />
            <Route path='/' element={<InformScreen />} />
            <Route path='/login' element={<LoginScreen />} />
            <Route path='/register' element={<RegisterScreen />} />
            <Route path='/connect' element={<ConnectScreen />} />
            <Route path='/tech' element={<TechScreen />} />
            <Route path='/rescue' element={<RescueScreen />} />
            <Route path='/collab' element={<CollabScreen />} />
            <Route path='/favorites' element={<FavoritesScreen />} />
            {/* <Route path='/users' element={<UsersScreen />} /> */}
          </Routes>
        </Container>
      </main>
      <section>
        <Outlet></Outlet>
      </section>
    </Router>
  );
}

export default App;
