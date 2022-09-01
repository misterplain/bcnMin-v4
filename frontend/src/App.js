import React from "react";
import { BrowserRouter as Router, Route, Routes, Navigate } from "react-router-dom";
import { Container } from "react-bootstrap";
import Header from "./components/Header";
import Footer from "./components/Footer";
import HomeScreen from "./screens/HomeScreen";
import LoginScreen from "./screens/LoginScreen";
import RegisterScreen from "./screens/RegisterScreen";
import InformScreen from "./screens/InformScreen";
import ConnectScreen from "./screens/ConnectScreen";
import ReduceScreen from "./screens/ReduceScreen";
import TechScreen from "./screens/TechScreen";
import CollabScreen from "./screens/CollabScreen";
import FavoritesScreen from "./screens/FavoritesScreen";

function App() {
  return (
    <Router>
      <Header />
      <main className='py-3'>
        <Container>
          <Routes>
            <Route path='*' element={<Navigate replace to='/' />} />
            <Route path='/' element={<HomeScreen />} exact />
            <Route path='/login' element={<LoginScreen />} />
            <Route path='/register' element={<RegisterScreen />} />
            <Route path='/inform' element={<InformScreen />} />
            <Route path='/connect' element={<ConnectScreen />} />
            <Route path='/reduce' element={<ReduceScreen />} />
            <Route path='/tech' element={<TechScreen />} />
            <Route path='/collab' element={<CollabScreen />} />
            <Route path='/favorites' element={<FavoritesScreen />} />
            
          </Routes>
        </Container>
      </main>
      <Footer />
    </Router>
  );
}

export default App;
