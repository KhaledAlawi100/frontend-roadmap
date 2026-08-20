import { Outlet } from "react-router-dom";
import Header from "../components/Header";
import Footer from "../components/Footer";

function MainLayout() {
  return (
    <div  className="min-h-screen bg-gray-100 flex flex-col justify-between">
      <Header />

      <main className=" flex-1 mx-auto max-w-7xl px-4 py-8">
        <Outlet />
      </main>

      <Footer />
    </div>
  );
}

export default MainLayout;
