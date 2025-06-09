import WalletPage from './WalletPage';
import ProtectedRoute from "@/components/protectedRoute";


export default function Page() {
  return  <ProtectedRoute allowedRoles={["CUSTOMER"]}><WalletPage /></ProtectedRoute>;
}
