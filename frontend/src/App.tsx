import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import { RouteApp } from "./routes";

function App() {
  return (
    <>
      <RouteApp />
      <ToastContainer />
    </>
  );
}

export default App;
