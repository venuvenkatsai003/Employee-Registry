import { createBrowserRouter, RouterProvider } from "react-router-dom"
import Home from "./Components/Home"
import CreateEmp from "./Components/CreateEmp"
import ViewEmp from "./Components/ViewEmp"
import UpdateEmp from "./Components/UpdateEmp"
import PageNotFound from "./Components/PageNotFound"

let router=createBrowserRouter([
  {
    path:"/",
    element:<Home/>
  },
  {
    path:"/createEmp",
    element:<CreateEmp/>
  },
  {
    path:"/viewEmp/:id",
    element:<ViewEmp/>
  },
  {
    path:"/updateEmp/:id",
    element:<UpdateEmp/>
  },
  {
    path:"*",
    element:<PageNotFound/>
  }
])
const App = () => {
  return (
  <RouterProvider router={router}/>
  )
}
export default App