import { createBrowserRouter } from "react-router-dom";
import Home from "../pages/Home";
import Edit from "../pages/Edit";
import List from "../pages/List";
import App from "../App";

const router = createBrowserRouter([
    {
        path:'/',
        element:<App/>,
        children:[
            {
                path: "/",
                element: <Home />,
              },
              {
                  path: "/edit",
                  element: <Edit />,
              },
              {
                  path: "/list",
                  element: <List />,
              },
        ]
    }
  ]);

export default router