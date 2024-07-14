import { Link } from "react-router-dom";

function Community() {
  return (
    <main className="container mx-auto mt-10 p-4">
      <section className="text-center">
        <h1 className="text-4xl font-bold mb-4">
          케바케의 나라~그때그때 달라요~
        </h1>
        <p className="text-xl mb-6">
          다양한 주제의 커뮤니티와 활발한 소통을 위한 플랫폼입니다. 관심사에
          따라 참여하고, 의견을 나누세요.
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
            <h3 className="text-xl font-bold mb-2">극I나라</h3>
            <p className="mb-4">키보드 워리어 모여라</p>
            <Link to="/cadepend" className="text-orange-500 hover:underline">
              바로가기
            </Link>
          </div>
          <div className="bg-white p-6 rounded shadow dark:bg-gray-800">
            <h3 className="text-xl font-bold mb-2">어느 나라로 갈까요</h3>
            <p className="mb-4">자유롭게 이야기를 나누세요.</p>
            <Link to="/free" className="text-orange-500 hover:underline">
              바로가기
            </Link>
          </div>
          <div className="bg-white p-6 rounded shadow dark:bg-gray-800">
            <h3 className="text-xl font-bold mb-2">질문 게시판</h3>
            <p className="mb-4">궁금한 점을 질문하고 답변을 받아보세요.</p>
            <Link to="/qna" className="text-orange-500 hover:underline">
              바로가기
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}

export default Community;
