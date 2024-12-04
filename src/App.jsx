import { Outlet } from "react-router-dom";
import NavBar from "./components/NavBar/NavBar";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

function App() {
  const queryClient = new QueryClient();
  return (
    <>
      <div className="flex flex-col">
        <NavBar />

        <div className="p-5 mt-20">
          <QueryClientProvider client={queryClient}>
            <Outlet />
          </QueryClientProvider>
        </div>
      </div>
    </>
  );
}

export default App;
