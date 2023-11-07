import { RouterProvider, createBrowserRouter } from "react-router-dom";
import MainLayout from "./layouts/MainLayout";
import DashBoardPage from "./pages/DashboardPage";

function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <MainLayout />,
      children: [{ index: true, element: <DashBoardPage /> }],
    },
  ]);

  return <RouterProvider router={router} />;
}

export default App;
