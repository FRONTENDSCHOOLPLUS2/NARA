import Button from "@components/Button";
import Pagination from "@components/Pagination";
import Search from "@components/Search";
import Spinner from "@components/Spinner";
import useFetch from "@hooks/useFetch";
import ListItem from "@pages/community/ListItem";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

function List() {
  // `posts?type=${type}&page=${pageNum}&limit=${limitNum}`

  // FIXME: env 파일로 설정하기
  // const type = "cadepend";
  // const pageNum = 1;
  // const limitNum = 10;
  const navigate = useNavigate();
  const { type } = useParams();
  const [searchKeyword, setSearchKeyword] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const limitNum = 10;

  const boardType = type === "cadepend" ? "cadepend" : "";
  const boardUrl = boardType
    ? `/posts?type=${boardType}&page=${currentPage}&limit=${limitNum}${
        searchKeyword ? `&keyword=${searchKeyword}` : ""
      }`
    : `/posts?page=${currentPage}&limit=${limitNum}${
        searchKeyword ? `&keyword=${searchKeyword}` : ""
      }`;

  const { data, loading, error, refetch } = useFetch(boardUrl);

  useEffect(() => {
    refetch(boardUrl);
  }, [searchKeyword, currentPage]);

  const handleSearchKeyword = (keyword) => {
    setSearchKeyword(keyword);
    setCurrentPage(1);
  };

  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
  };

  console.log(data);

  // MEMO: 스피너로 바꾸자!!
  // if (loading) return <Spinner />;
  // if (error) return <p>{error.message}</p>;

  const postList = data?.item.map((item) => (
    <ListItem key={item._id} data={item} type={type} />
  ));
  console.log(postList);
  const totalPages = data ? data.pagination.totalPages : 0;

  return (
    <main className="min-w-80 p-10">
      <div className="text-center py-4">
        <h2 className="pb-4 text-2xl font-bold text-gray-700 dark:text-gray-200">
          극I나라
        </h2>
      </div>
      <div className="flex justify-end mr-4">
        {/* 검색 */}
        <Search onClick={handleSearchKeyword} />
        <Button
          className="bg-orange-500 py-1 px-4 text-base text-white font-semibold ml-2 hover:bg-amber-400 rounded"
          onClick={() => {
            navigate("/cadepend/new");
          }}
        >
          글작성
        </Button>
      </div>
      <section className="pt-10">
        <table className="border-collapse w-full table-fixed">
          <colgroup>
            <col className="w-[10%] sm:w-[10%]" />
            <col className="w-[60%] sm:w-[30%]" />
            <col className="w-[30%] sm:w-[15%]" />
            <col className="w-0 sm:w-[10%]" />
            <col className="w-0 sm:w-[10%]" />
            <col className="w-0 sm:w-[25%]" />
          </colgroup>
          <thead>
            <tr className="border-b border-solid border-gray-600">
              <th className="p-2 whitespace-nowrap font-semibold">번호</th>
              <th className="p-2 whitespace-nowrap font-semibold">제목</th>
              <th className="p-2 whitespace-nowrap font-semibold">글쓴이</th>
              <th className="p-2 whitespace-nowrap font-semibold hidden sm:table-cell">
                조회수
              </th>
              <th className="p-2 whitespace-nowrap font-semibold hidden sm:table-cell">
                댓글수
              </th>
              <th className="p-2 whitespace-nowrap font-semibold hidden sm:table-cell">
                작성일
              </th>
            </tr>
          </thead>
          <tbody>
            {/* 로딩 상태 표시 */}
            <tr>
              {loading && (
                <td colSpan="6" className="py-20 text-center">
                  <Spinner />
                </td>
              )}
            </tr>
            {/* 에러 메세지 출력 */}
            <tr>
              {error && (
                <td colSpan="6" className="py-20 text-center">
                  {error.message}
                </td>
              )}
            </tr>
            {/* 본문 출력 */}
            {postList}
          </tbody>
        </table>
        <hr />
      </section>
      {data && (
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={handlePageChange}
        />
      )}
    </main>
  );
}

export default List;
