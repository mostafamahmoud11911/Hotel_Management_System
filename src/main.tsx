import AOS from "aos";
import "aos/dist/aos.css";
import ReactDOM from "react-dom/client";
import "./locale/i18n.ts";
import App from "./App.tsx";
import { Provider } from "react-redux";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Store from "./Redux/Store.ts";
import "./Styles/global.scss";
import 'swiper/css';
import 'swiper/css/effect-fade';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
AOS.init();

ReactDOM.createRoot(document.getElementById("root")!).render(
    <Provider store={Store}>
      <App />
      <ToastContainer />
    </Provider>
);
