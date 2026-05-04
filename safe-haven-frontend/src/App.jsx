import "./App.css";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import ListInsuranceProductComponent from "./components/ListInsuranceProductComponent";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import InsuranceProductViewPage from "./components/InsuranceProductComponent";
function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          {/* http://localhost:3000/ */}
          <Route path="/" element={<ListInsuranceProductComponent />}></Route>
          {/* http://localhost:3000/insurance-products */}
          <Route
            path="/insurance-products"
            element={<ListInsuranceProductComponent />}
          ></Route>
          {/* http://localhost:3000/insurance-products/:id */}
          <Route
            path="/insurance-products/:id"
            element={<InsuranceProductViewPage />}
          ></Route>
        </Routes>
      </BrowserRouter>
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
    </>
  );
}

export default App;
