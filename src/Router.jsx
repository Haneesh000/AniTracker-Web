import React from "react";
import {createBrowserRouter, RouterProvider, Route, Link} from "react-router-dom";
import Nav from "./components/NavBar";
import Search from "./routes/Search";
import Favourites from "./routes/Favourites";

const router = createBrowserRouter([
    {
        path: "/",
        element: <h1>Home</h1>
    },
    {
        path: "/search",
        element: <Search />
    },
    {
        path: "/favourites",
        element: <Favourites />
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
