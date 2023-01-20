import { createRoot } from "react-dom/client";
import "./style.css";
import App from "./App.js";

const root = createRoot(document.querySelector("#root"));
const toto = "tata";

root.render(
  <div>
    <App children={<h1>Ola</h1>}></App>
  </div>
);
