import Index from "./pages/User/Index";
import { Route, Routes } from "react-router-dom";
import Shop from "./pages/User/Shop";
import About from "./pages/User/About";
import Contact from "./pages/User/Contact";
import Detail_Product from "./pages/User/Detail_Product";
import Sign_In from "./pages/User/Sign_In";
import Sign_Up from "./pages/User/Sign_Up";
import Cart from "./pages/User/Cart";
import Unknown_page from "./pages/User/Unknown_page";
import Provider from "./pages/Provider";
import Home from "./pages/Admin/Home";
import Oder_Manager from "./pages/Admin/Oder_Manager";
import User_Manager from "./pages/Admin/User_Manager";
import Product_Manager from "./pages/Admin/Product_Manager";
import Category_Manager from "./pages/Admin/Category_Manager";
import ProviderU from "./pages/providerU";
import History from "./pages/User/History";
import { BackTop, Button } from "antd";
import { CaretUpOutlined, UpOutlined } from "@ant-design/icons";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<ProviderU />}>
          <Route index element={<Index />} />
          <Route path="/shop" element={<Shop />} />
          <Route path="/about-us" element={<About />} />
          <Route path="/contact-us" element={<Contact />} />
          <Route path="/product/:id" element={<Detail_Product />} />
          <Route path="/sign-in" element={<Sign_In />} />
          <Route path="/sign-up" element={<Sign_Up />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/history" element={<History />} />
        </Route>
        <Route path="*" element={<Unknown_page />} />
        <Route path="/admin" element={<Provider />}>
          <Route index element={<Home />} />
          <Route path="oder" element={<Oder_Manager />} />
          <Route path="user" element={<User_Manager />} />
          <Route path="product" element={<Product_Manager />} />
          <Route path="categories" element={<Category_Manager />} />
        </Route>
      </Routes>
      <BackTop>
        <Button className="flex justify-center items-center w-10 h-10 ">
          <UpOutlined />
        </Button>
      </BackTop>
    </>
  );
}

export default App;
