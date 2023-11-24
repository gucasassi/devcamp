import { RouterProvider, createBrowserRouter } from "react-router-dom";

import {
  LandingPage,
  LoginPage,
  RegisterPage,
  ResetPasswordPage,
  UpdatePasswordPage,
  ManageAccountPage,
  ManageBootcampPage,
  AddBootcampPage,
  ViewBootcampsPage,
  ViewReviewsPage,
  ManageReviewPage,
  AddReviewPage,
} from "./pages";

import RootLayout from "./components/layouts/RootLayout";

const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    children: [{ index: true, element: <LandingPage /> }],
  },
  {
    path: "/auth",
    element: <RootLayout />,
    children: [
      { index: true, element: <LoginPage /> },
      { path: "login", element: <LoginPage /> },
      { path: "register", element: <RegisterPage /> },
      { path: "reset-password", element: <ResetPasswordPage /> },
    ],
  },
  {
    path: "/accounts",
    element: <RootLayout />,
    children: [
      { index: true, element: <ManageAccountPage /> },
      { path: "update-password", element: <UpdatePasswordPage /> },
    ],
  },
  {
    path: "/bootcamps",
    element: <RootLayout />,
    children: [
      { index: true, element: <ViewBootcampsPage /> },
      { path: "add", element: <AddBootcampPage /> },
      { path: "manage", element: <ManageBootcampPage /> },
    ],
  },
  {
    path: "/reviews",
    element: <RootLayout />,
    children: [
      { index: true, element: <ViewReviewsPage /> },
      { path: "add", element: <AddReviewPage /> },
      { path: "manage", element: <ManageReviewPage /> },
    ],
  },
]);

const App = () => {
  return <RouterProvider router={router} />;
};

export default App;
