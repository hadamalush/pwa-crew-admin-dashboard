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

const DashBoardPage = lazy(() => import("./pages/DashboardPage"));
const InboxLayout = lazy(() => import("./layouts/InboxLayout"));
const InboxPage = lazy(() => import("./pages/InboxPage"));
const InboxMessageDetailsPage = lazy(() => import("./pages/Inbox/InboxMessageDetailsPage"));

function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <MainLayout />,
      children: [
        {
          index: true,
          element: (
            <Suspense fallback={null}>
              <DashBoardPage />
            </Suspense>
          ),
        },
        {
          path: "inbox",
          element: (
            <Suspense fallback={null}>
              <InboxLayout />
            </Suspense>
          ),
          children: [
            {
              index: true,
              element: (
                <Suspense fallback={null}>
                  <InboxPage />
                </Suspense>
              ),
            },
            {
              path: ":messageId",
              element: (
                <Suspense fallback={null}>
                  <InboxMessageDetailsPage />
                </Suspense>
              ),
            },
            {
              path: "sent",
              element: (
                <Suspense fallback={null}>
                  <InboxSentPage />
                </Suspense>
              ),
            },
            {
              path: "featured",
              element: (
                <Suspense fallback={null}>
                  <InboxFeaturedPage />
                </Suspense>
              ),
            },
            {
              path: "featured/:messageId",
              element: (
                <Suspense fallback={null}>
                  <InboxMessageDetailsPage />
                </Suspense>
              ),
            },
            {
              path: "spam",
              element: (
                <Suspense fallback={null}>
                  <InboxSpamPage />
                </Suspense>
              ),
            },
            {
              path: "spam/:messageId",
              element: (
                <Suspense fallback={null}>
                  <InboxMessageDetailsPage />
                </Suspense>
              ),
            },
            {
              path: "trash",
              element: (
                <Suspense fallback={null}>
                  <InboxTrashPage />
                </Suspense>
              ),
            },
            {
              path: "trash/:messageId",
              element: (
                <Suspense fallback={null}>
                  <InboxMessageDetailsPage />
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
