import { Link } from "react-router-dom";

function Community() {
  return (
    <main className="container mx-auto mt-10 p-4">
      <section className="text-center">
        <h1 className="text-4xl font-bold mb-4">
          과경
          <br />
          ~CROSS THE BORDER~
        </h1>
        <p className="text-xl mb-6">
          다양한 타입의 사람들이 모인 커뮤니티입니다. <br />
          관심사에 따라 참여하고, 의견을 나누세요.
        </p>
        <Link
          to="/"
          className="bg-orange-500 text-white px-6 py-3 rounded hover:bg-orange-600"
        >
          커뮤니티 참여하기
        </Link>
      </section>

      <section className="mt-16">
        <h2 className="text-2xl font-bold mb-4 text-center">주요 기능</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="bg-white p-6 rounded shadow dark:bg-gray-800">
            <h3 className="text-xl font-bold mb-2 text-purple-400">극I나라</h3>
            <p className="mb-4 ">(*´∀`*)ゞ키보드 워리어 모여라</p>
            <Link to="/cadepend" className="text-orange-500 hover:underline">
              바로가기
            </Link>
          </div>
          <div className="bg-white p-6 rounded shadow dark:bg-gray-800">
            <h3 className="text-xl font-bold mb-2 text-blue-500">
              어느 나라로 갈까요
            </h3>
            <p className="mb-4">
              ( ◜◡‾)◜◡‾)◜◡‾)◜◡‾)◜◡‾)₎⁾⁾모두가 있는 곳으로 고고!
            </p>
            <Link to="/all" className="text-orange-500 hover:underline">
              바로가기
            </Link>
          </div>
          <div className="bg-white p-6 rounded shadow dark:bg-gray-800">
            <h3 className="text-xl font-bold mb-2 text-yellow-500">극E나라</h3>
            <p className="mb-4">(((o(*ﾟ▽ﾟ*)o)))넘치는 텐션을 공유!</p>
            <Link to="/service" className="text-orange-500 hover:underline">
              바로가기
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}

export default Community;
