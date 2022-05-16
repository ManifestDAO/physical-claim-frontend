import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import Root from "./Root";

const query = document.getElementById("root") as HTMLElement;
const root = ReactDOM.createRoot(query);

root.render(<Root />);
