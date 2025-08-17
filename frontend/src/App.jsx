import "./App.css";
import Fixed from "./components/Fixed";
import UserSignup from "./components/UserSingnup";
import UserLogin from "./components/UserLogin";
import LandingPage from "./LandingPage";
import AddProductForm from "./components/AddProductForm";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import ProductDetailPage from "./pages/ProductDetailsPage";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<UserLogin />}></Route>
          <Route path="/signup" element={<UserSignup />}></Route>
          <Route path="/home" element={<LandingPage />}></Route>
          <Route path="/addProduct" element={<AddProductForm />}></Route>
          <Route path="/product/:id" element={<ProductDetailPage />}></Route>
          <Route />
        </Routes>
      </BrowserRouter>
      {/* <LandingPage /> */}
    </>
  );
}

export default App;
