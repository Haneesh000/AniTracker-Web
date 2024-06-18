import React from "react";
import {createBrowserRouter, RouterProvider, Route, Link} from "react-router-dom";
import Nav from "./components/NavBar";
import Search from "./routes/Search";

const router = createBrowserRouter([
    {
        path: "/",
        element: <h1>Home</h1>
    },
    {
        path: "/search",
        element: <Search />
    }
]);

function Router() {
    return (
        <>
            <Nav />
            <br/>
            <RouterProvider router={router}>
                <Route />
            </RouterProvider>
        </>
);
}

export default Router;
