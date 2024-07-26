import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import "./i18n";
import { store } from "./redux/store.ts";
import { Provider } from "react-redux";

// eslint-disable-next-line react-refresh/only-export-components

ReactDOM.createRoot(document.getElementById("root")!).render(
  <Provider store={store}>
    <App />
  </Provider>
);
