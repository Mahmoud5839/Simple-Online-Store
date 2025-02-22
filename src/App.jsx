import { Routes, Route, Navigate } from "react-router-dom";
import Registration from "./component/Registration";
import ProductsPage from "./component/ProductsPage";
import Login from "./component/Login";
import Layout from "./component/Layout";
import "./App.css";

function App() {
  return (
    <Layout>
      <Routes>
        <Route path="/" element={<ProductsPage />} />
        <Route path="/register" element={<Registration />} />
        <Route path="/login" element={<Login />} />
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </Layout>
  );
}

export default App;
