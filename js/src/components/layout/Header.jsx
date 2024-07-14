import Theme from "@components/Theme";
import { userState } from "@recoil/user/atoms";
import { useNavigate } from "react-router-dom";
import { useRecoilState } from "recoil";

function Header() {
  const [user, setUser] = useRecoilState(userState);
  const navigate = useNavigate();
  console.log(user);

  const handleLogout = () => {
    setUser(null);
    navigate("/");
  };

  return (
    <header className="px-8 min-w-80 bg-slate-100 dark:bg-gray-600 text-gray-800 dark:text-gray-200 transition-color duration-500 ease-in-out">
      <nav className="flex flex-wrap justify-center items-center p-4 md:flex-nowrap md:justify-between">
        <div className="w-1/2 order-1 md:w-auto">
          <a href="/" className="flex items-center gap-2">
            <img
              className="mr-3 h-6 sm:h-9"
              src="src/assets/home.png"
              alt="로고 이미지"
            />
            <span className="text-lg font-bold">집사랑</span>
          </a>
        </div>
        <div className="w-auto order-2 text-base mt-4 md:mt-0">
          <ul className="flex items-center gap-6 uppercase">
            <li className="hover:text-amber-500 hover:font-semibold">
              <a href="/cadepend">극I나라</a>
            </li>
            <li className="hover:text-amber-500 hover:font-semibold">
              <a href="/free">랜덤국가</a>
            </li>
            <li className="hover:text-amber-500 a:font-semibold">
              <a href="/qna">질문게시판</a>
            </li>
          </ul>
        </div>

        <div className="w-1/2 order-1 flex justify-end items-center md:order-2 md:w-auto">
          {user ? (
            <p className="flex items-center">
              <img
                className="w-8 rounded-full mr-2"
                src={`http://api.fesp.shop/${user?.profileImage}`}
              />
              {user.name}
              <button
                type="button"
                className="bg-gray-900 py-1 px-2 text-sm text-white font-semibold ml-2 hover:bg-amber-400 rounded"
                onClick={handleLogout}
              >
                로그아웃
              </button>
            </p>
          ) : (
            <div className="flex justify-end">
              <button
                type="button"
                className="bg-orange-500 py-1 px-2 text-sm text-white font-semibold ml-2 hover:bg-amber-400 rounded"
                onClick={() => navigate("/user/login")}
              >
                로그인
              </button>
              <button
                type="button"
                className="bg-gray-900 py-1 px-2 text-sm text-white font-semibold ml-2 hover:bg-amber-400 rounded"
                onClick={() => navigate("/user/signup")}
              >
                회원가입
              </button>
            </div>
          )}
          {/* 라이트/다크 모드 전환 */}
          <Theme />
        </div>
      </nav>
    </header>
  );
}

export default Header;
