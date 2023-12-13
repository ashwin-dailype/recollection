import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import MakePayments from "./pages/MakePayments";
import GetToken from "./pages/GetToken";

function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/trial" element={<GetToken />} />
        <Route path="/trial/payment/:user_id/:loan_id/:loan_installment_amt" element={<MakePayments />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
