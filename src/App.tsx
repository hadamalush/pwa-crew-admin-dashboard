import { RouterProvider, createBrowserRouter } from "react-router-dom";
import UsersPage from "./pages/UsersPage";
import EventsPage from "./pages/EventsPage";
import SettingsPage from "./pages/SettingsPage";
import { Provider as ReduxProvider } from "react-redux/es/exports";
import { store } from "./global/store";
import { lazy, Suspense } from "react";
import MainLayout from "./layouts/MainLayout";
import InboxSentPage from "./pages/Inbox/InboxSentPage";
import InboxSpamPage from "./pages/Inbox/InboxSpamPage";
import InboxTrashPage from "./pages/Inbox/InboxTrashPage";
import InboxFeaturedPage from "./pages/Inbox/InboxFeaturedPage";
import InboxMessageDetailsPage from "./pages/Inbox/InboxMessageDetailsPage";

const DashBoardPage = lazy(() => import("./pages/DashboardPage"));
const InboxLayout = lazy(() => import("./layouts/InboxLayout"));
const InboxPage = lazy(() => import("./pages/InboxPage"));

function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <MainLayout />,
      children: [
        {
          index: true,
          element: (
            <Suspense fallback={<div>Loading...</div>}>
              <DashBoardPage />
            </Suspense>
          ),
        },
        {
          path: "inbox",
          element: (
            <Suspense fallback={<div>Loading...</div>}>
              <InboxLayout />
            </Suspense>
          ),
          children: [
            {
              index: true,
              element: (
                <Suspense fallback={<div>Loading...</div>}>
                  <InboxPage />
                </Suspense>
              ),
            },
            {
              path: ":messageId",
              element: <InboxMessageDetailsPage />,
            },
            {
              path: "sent",
              element: (
                <Suspense fallback={<div>Loading...</div>}>
                  <InboxSentPage />
                </Suspense>
              ),
            },
            {
              path: "featured",
              element: (
                <Suspense fallback={<div>Loading...</div>}>
                  <InboxFeaturedPage />
                </Suspense>
              ),
            },
            {
              path: "spam",
              element: (
                <Suspense fallback={<div>Loading...</div>}>
                  <InboxSpamPage />
                </Suspense>
              ),
            },
            {
              path: "trash",
              element: (
                <Suspense fallback={<div>Loading...</div>}>
                  <InboxTrashPage />
                </Suspense>
              ),
            },
          ],
        },
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
