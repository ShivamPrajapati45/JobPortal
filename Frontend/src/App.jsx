import { Route, Routes } from "react-router-dom"
import { allRoutes } from "./utils/routes.jsx"
import Landing from "./Pages/Landing"

const App = () => {
  return (
      <>
          <Routes>
            <Route path="/" element={<Landing/>} />
            {
              allRoutes.map((route, index) => {
                return <Route key={index} {...route} />
              })
            }
          </Routes>
      </>
  )
}

export default App