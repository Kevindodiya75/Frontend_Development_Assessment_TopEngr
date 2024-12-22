import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

// Global toast configuration
const toastOptions = {
  autoClose: 1000,
  hideProgressBar: false,
  closeOnClick: true,
  pauseOnHover: true,
  draggable: true,
  progress: undefined,
};

const ToastConfig = () => {
  return <ToastContainer {...toastOptions} />;
};

export default ToastConfig;
