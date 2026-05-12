import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import SupplierPage from "./Pages/Supplier";
import RequisitionPage from "./Pages/RequisitionPage";
import ApprovalPage from "./Pages/ApprovalPage";
import BuyerLogin from "./Pages/BuyerLogin";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/supplier" element={<SupplierPage/>} />
        <Route path="/requisition" element={<RequisitionPage />} />
        <Route path="/approved" element={<ApprovalPage />} />
        <Route path="/" element={<BuyerLogin />} />
      </Routes>
    </Router>
  );
}

export default App;