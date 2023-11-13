import { RouterProvider, createBrowserRouter } from "react-router-dom";
// import MainLayout from "./layouts/MainLayout";
// import DashBoardPage from "./pages/DashboardPage";
import InboxPage from "./pages/InboxPage";
import UsersPage from "./pages/UsersPage";
import EventsPage from "./pages/EventsPage";
import SettingsPage from "./pages/SettingsPage";
import { Provider as ReduxProvider } from "react-redux/es/exports";
import { store } from "./global/store";
import { lazy } from "react";

const MainLayout = lazy(() => import("./layouts/MainLayout"));
const DashBoardPage = lazy(() => import("./pages/DashboardPage"));

function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <MainLayout />,
      children: [
        { index: true, element: <DashBoardPage /> },
        { path: "inbox", element: <InboxPage /> },
        { path: "/users", element: <UsersPage /> },
        { path: "/events", element: <EventsPage /> },
        { path: "/settings", element: <SettingsPage /> },
      ],
    },
  ]);

  return (
    <ReduxProvider store={store}>
      <RouterProvider router={router} />
    </ReduxProvider>
  );
}

export default App;
