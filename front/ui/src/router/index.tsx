import { createHashRouter } from "react-router-dom";
import AppLayout from "../layouts/AppLayout";
import HomePage from "../pages/Home";
import LoginPage from "../pages/Login";

export const router = createHashRouter([
    {
        path: "/",
        element: <AppLayout />,
        children: [{ index: true, element: <HomePage /> }],
    },
    {
        path: "/login",
        element: <LoginPage />,
    },
]);