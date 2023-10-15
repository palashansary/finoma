import SignIn from "./components/SignIn";
import SignUp from "./components/SignUp";
import { Provider } from "react-redux";
import store from "./store/index.js";
import Root from "./components/Root";
import TableMenu from "./components/TableMenu";

import NewExpense from "./components/NewExpense";

import EditExpense from "./components/EditExpense";

import { createBrowserRouter, RouterProvider } from "react-router-dom";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    children: [
      { index: true, element: <SignUp /> },
      { path: "signIn", element: <SignIn /> },
      { path: "expenses", element: <TableMenu /> },
      { path: "new", element: <NewExpense /> },
      { path: "edit", element: <EditExpense /> },
    ],
  },
]);

function App() {
  return (
    <div>
      <Provider store={store}>
        <p className="text-red-600 text-[5rem]">{import.meta.env.NAME}</p>
        <RouterProvider router={router} />
      </Provider>
    </div>
  );
}

export default App;
