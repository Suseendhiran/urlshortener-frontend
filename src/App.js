import "./App.css";
import Routers from "./Routers";
import Header from "./Components/Header";
import { ToastProvider } from "react-toast-notifications";
import AuthProvider from "./Providers/AuthProvider";

function App() {
  return (
    <AuthProvider>
      <ToastProvider autoDismiss={true} autoDismissTimeout={4000}>
        <div className="App ">
          <Header />
          <Routers />
        </div>
      </ToastProvider>
    </AuthProvider>
  );
}

export default App;
