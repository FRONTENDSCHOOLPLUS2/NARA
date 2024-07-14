import Footer from "@components/layout/Footer";
import Header from "@components/layout/Header";
import { Outlet } from "react-router-dom";

function Layout() {
  return (
    <div className="flex flex-col min-h-screen dark:bg-gray-700 dark:text-gray-200 transition-color duration-500 ease-in-out">
      {/* 페이지 본문 */}
      <Header />
      <Outlet />
      <Footer />
    </div>
  );
}

export default Layout;
