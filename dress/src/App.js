import './App.css';
import Report from './Pages/Report/Report';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';
import { useState } from 'react';
import Navbar from './Components/Navbar/Navbar';
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import Footer from './Components/Footer/Footer';
import Caro from './Components/Carousel/Caro'
import Men from './Pages/Men/Men';
import Contact from './Pages/Contact/Contact';
import Cart from './Pages/Cart/Cart';
import MenTshirt from './Pages/MenTshirt/MenTshirt';
import Jean from './Pages/MenJean/Jean';
import Jacket from './Pages/Jacket/Jacket';
import Kurta from './Pages/Women/Kurta/Kurta';
import Saree from './Pages/Women/Saree/Saree';
import Tops from './Pages/Women/Tops/Tops';
import Bshirt from './Pages/Kids/Bshirt/Bshirt';
import Bpartywear from './Pages/Kids/Bpartywear/Bpartywear';
import Bjeans from './Pages/Kids/Bjeans/Bjeans';
import Allproduct from './Components/Allproducts/Allproduct';
import RegisterForm from './Pages/RegisterForm/RegisterForm';
import Login from './Pages/Login/Login';
import ProtectedRoute from './Pages/ProtectedRoute/ProtectedRoute';
import Profile from './Pages/Profile/Profile';
import OrderPage from "./Pages/OrderPage";
import AdminLogin from './Pages/AdminLogin';

function App() {
  return (
    <BrowserRouter>
      <AppContent />
    </BrowserRouter>
  );
}

function AppContent() {
  const [cart, setCart] = useState([]);
  const location = useLocation(); // Now it's inside <BrowserRouter>

  // Define paths where Navbar and Footer should be hidden
  const hiddenPaths = ['/login', '/admin','/register'];

  const addToCart = (item) => {
    const existingItem = cart.find((cartItem) => cartItem.id === item.id);
    if (existingItem) {
      setCart(cart.map((cartItem) =>
        cartItem.id === item.id
          ? { ...cartItem, quantity: cartItem.quantity + 1 }
          : cartItem
      ));
    } else {
      setCart([...cart, { ...item, quantity: 1 }]);
    }
  };

  const removeFromCart = (id) => {
    setCart(cart.filter((item) => item.id !== id));
  };

  const updateQuantity = (id, Quanamount) => {
    setCart(cart
      .map((item) =>
        item.id === id ? { ...item, quantity: item.quantity + Quanamount } : item
      )
      .filter((item) => item.quantity > 0)
    );
  };

  return (
    <>
      {/* Conditionally render Navbar */}
      {!hiddenPaths.includes(location.pathname) && <Navbar />}

      <Routes>
        <Route path='/admin' element={<AdminLogin />}></Route>
        <Route path='/login' element={<Login />} />
        <Route path='/register' element={<RegisterForm />} />


        <Route path='/orders' element={<ProtectedRoute><OrderPage /></ProtectedRoute>}></Route>
        <Route path='/home' element={<ProtectedRoute><Caro /></ProtectedRoute>}></Route>
        <Route path='/cart' element={<ProtectedRoute><Cart cart={cart} updateQuantity={updateQuantity} removeFromCart={removeFromCart} /></ProtectedRoute>}></Route>
        <Route path='/contactUser' element={<Contact />}></Route>
        <Route path='/report' element={<Report />}></Route>
        <Route path='/tshirt' element={<MenTshirt addToCart={addToCart} />}></Route>
        <Route path='/men' element={<Men addToCart={addToCart} />}></Route>
        <Route path='/jeans' element={<Jean addToCart={addToCart} />}></Route>
        <Route path='/jacket' element={<Jacket addToCart={addToCart} />}></Route>
        <Route path='/kurta' element={<Kurta addToCart={addToCart} />}></Route>
        <Route path='/saree' element={<Saree addToCart={addToCart} />}></Route>
        <Route path='/tops' element={<Tops addToCart={addToCart} />}></Route>
        <Route path='/boyshirt' element={<Bshirt addToCart={addToCart} />}></Route>
        <Route path='/partywear' element={<Bpartywear addToCart={addToCart} />}></Route>
        <Route path='/boyjeans' element={<Bjeans addToCart={addToCart} />}></Route>
        <Route path='/allproduct' element={<Allproduct addToCart={addToCart} />}></Route>
        <Route path='/profile' element={<ProtectedRoute><Profile /></ProtectedRoute>}></Route>
      </Routes>
      {/* Conditionally render Footer */}
      {!hiddenPaths.includes(location.pathname) && <Footer />}
    </>
  );
}



export default App;
