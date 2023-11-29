import { RouterProvider, createBrowserRouter } from "react-router-dom";

import { Provider as ReduxProvider } from "react-redux/es/exports";
import { store } from "./global/store";
import { lazy, Suspense } from "react";

import InboxSentPage from "./pages/Inbox/InboxSentPage";
import InboxSpamPage from "./pages/Inbox/InboxSpamPage";
import InboxTrashPage from "./pages/Inbox/InboxTrashPage";
import InboxFeaturedPage from "./pages/Inbox/InboxFeaturedPage";
import HomePage from "./pages/HomePage";
import PersistLogin from "./layouts/PersistLogin";
import { loader as rootLoader } from "./pages/HomePage";

const DashBoardPage = lazy(() => import("./pages/DashboardPage"));
const InboxLayout = lazy(() => import("./layouts/InboxLayout"));
const InboxPage = lazy(() => import("./pages/InboxPage"));
const InboxMessageDetailsPage = lazy(() => import("./pages/Inbox/InboxMessageDetailsPage"));
const UsersPage = lazy(() => import("./pages/UsersPage"));
const SettingsPage = lazy(() => import("./pages/SettingsPage"));
const MainLayout = lazy(() => import("./layouts/MainLayout"));

function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      children: [
        {
          element: <HomePage />,
          index: true,
          loader: rootLoader,
        },
        {
          element: <PersistLogin />,
          children: [
            {
              element: <MainLayout />,
              children: [
                {
                  path: "dashboard",
                  element: <DashBoardPage />,
                },
                {
                  path: "inbox",
                  element: <InboxLayout />,
                  children: [
                    {
                      index: true,
                      element: <InboxPage />,
                    },
                    {
                      path: ":messageId",
                      element: <InboxMessageDetailsPage />,
                    },
                    {
                      path: "sent",
                      element: <InboxSentPage />,
                    },
                    {
                      path: "featured",
                      element: <InboxFeaturedPage />,
                    },
                    {
                      path: "featured/:messageId",
                      element: <InboxMessageDetailsPage />,
                    },
                    {
                      path: "spam",
                      element: <InboxSpamPage />,
                    },
                    {
                      path: "spam/:messageId",
                      element: <InboxMessageDetailsPage />,
                    },
                    {
                      path: "trash",
                      element: <InboxTrashPage />,
                    },
                    {
                      path: "trash/:messageId",
                      element: <InboxMessageDetailsPage />,
                    },
                  ],
                },
                {
                  path: "/users",
                  element: <UsersPage />,
                },
                { path: "/settings", element: <SettingsPage /> },
              ],
            },
          ],
        },
      ],
    },
  ]);

  return (
    <ReduxProvider store={store}>
      <Suspense fallback={null}>
        <RouterProvider router={router} />
      </Suspense>
    </ReduxProvider>
  );
}

export default App;
