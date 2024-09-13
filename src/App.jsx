import { Outlet } from "react-router-dom";
import NavBar from "./components/NavBar/NavBar";

function App() {
  return (
    <>
      <div className="flex flex-col">
        <NavBar />

        <div className="p-5 mt-20">
          <Outlet />
        </div>
      </div>
    </>
  );
}

export default App;
