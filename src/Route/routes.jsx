import { createBrowserRouter } from "react-router-dom";
import Layout from "../Layout/Layout.jsx";
import App from "../App.jsx";
import SignIn from "../Pages/SignIn.jsx";
import SignUp from "../Pages/SignUp.jsx";
import VideoDetails from "../Pages/VideoDetails.jsx";
import Channel from "../Pages/Channel.jsx";

const router = createBrowserRouter([
  {
    element: <Layout />,
    children: [
      {
        path: "/",
        element: <App />,
      },
      {
        path: "/signin",
        element: <SignIn />,
      },
      {
        path: "/signup",
        element: <SignUp />,
      },
      {
        path: "/video/:id",
        element: <VideoDetails />,
      },
      {
        path: "/channel/:id",
        element: <Channel />,
      },
    ],
  },
]);

export default router;
