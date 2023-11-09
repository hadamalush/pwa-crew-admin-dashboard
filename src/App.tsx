import { RouterProvider, createBrowserRouter } from "react-router-dom";
import MainLayout from "./layouts/MainLayout";
import DashBoardPage from "./pages/DashboardPage";
import InboxPage from "./pages/InboxPage";
import UsersPage from "./pages/UsersPage";
import EventsPage from "./pages/EventsPage";
import SettingsPage from "./pages/SettingsPage";

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

  return <RouterProvider router={router} />;
}

export default App;
