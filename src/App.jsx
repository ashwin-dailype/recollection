import { BrowserRouter, Routes, Route } from "react-router-dom";
import ShowTable from "./pages/ShowTable";
import Navbar from "./components/Navbar";
import MakePayments from "./pages/MakePayments";

function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={<ShowTable />} />
        <Route path="/payment/:user_id/:loan_id/:loan_installment_amt" element={<MakePayments />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
