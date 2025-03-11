import { Routes, Route } from "react-router-dom";
import Test from "./components/Test";
import ShopOwnerRoutes from "./routes/ShopOwnerRoutes";
import FarmerRoutes from "./routes/FarmerRoutes";
import TransportRoutes from "./routes/TransportRoutes";
import FinanceRoutes from "./routes/FinanceRoutes";
import AdminRoutes from "./routes/AdminRoutes";

function App() {
   return (
      <Routes>
         <Route path="/" element={<Test />}></Route>
         <Route path="/shopOwner/*" element={<ShopOwnerRoutes />}></Route>
         <Route path="/farmer/*" element={<FarmerRoutes />}></Route>
         <Route path="/transport/*" element={<TransportRoutes />}></Route>
         <Route path="/admin/*" element={<AdminRoutes />}></Route>
         <Route path="/finance/*" element={<FinanceRoutes />}></Route>
      </Routes>
   );
}

export default App;
