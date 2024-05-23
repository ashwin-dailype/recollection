import { Outlet } from "react-router-dom";
import Topbar from "./pages/Topbar";

const RootLayout = () => {
  return (
    <div className="w-full">
      <Topbar />

      <section className="flex flex-1 h-full">
        <Outlet />
      </section>

    </div>
  );
};

export default RootLayout;
