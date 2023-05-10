import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import 'antd/dist/reset.css';
import "./styles.css";
import {
    createBrowserRouter,
    RouterProvider,
    Route,
    Link,
} from "react-router-dom";
import Config from "./pages/config";
const router = createBrowserRouter([
    {
        path: "/",
        element: <App />,
    },
    {
        path: "/config",
        element: <Config />,
    },
]);

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
    <React.StrictMode>
        <RouterProvider router={router} />
    </React.StrictMode>
);
