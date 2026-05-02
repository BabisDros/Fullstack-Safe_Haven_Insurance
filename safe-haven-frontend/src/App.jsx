import "./App.css";
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
    </>
  );
}

export default App;
