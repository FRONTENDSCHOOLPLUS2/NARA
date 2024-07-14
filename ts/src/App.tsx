import { RouterProvider } from "react-router-dom";
import useThemeStore from "@zustand/themeStore";
import { RecoilRoot } from "recoil";
import router from "@routes/routes";

function App() {
  const { isDarkMode } = useThemeStore();

  if (isDarkMode) {
    document.documentElement.classList.add("dark");
  } else {
    document.documentElement.classList.remove("dark");
  }

  return (
    <div className="flex flex-col min-h-screen dark:bg-gray-700 dark:text-gray-200 transition-color duration-500 ease-in-out">
      <RecoilRoot>
        <RouterProvider router={router} />
      </RecoilRoot>
    </div>
  );
}

export default App;
