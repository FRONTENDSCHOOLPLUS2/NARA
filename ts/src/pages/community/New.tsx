import { NewBoardItemRespons } from "#types/board";
import Button from "@components/Button";
import Submit from "@components/Submit";
import useMutation from "@hooks/useMutation";
import { userState } from "@recoil/user/atoms";
import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useRecoilState } from "recoil";

function New() {
  const { send } = useMutation("/posts");
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [titleError, setTitleError] = useState("");
  const [contentError, setContentError] = useState("");
  const navigate = useNavigate();
  const [user] = useRecoilState(userState);
  const token = user?.token?.accessToken;
  const { type } = useParams();

  const handleRegister = async () => {
    try {
      const boardData: {
        title: string;
        content: string;
        type?: string;
      } = { title, content };

      if (type === "cadepend") {
        boardData.type = "cadepend";
      }

      const result: NewBoardItemRespons = await send({
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(boardData),
      });

      console.log(result);
      navigate(`/${type}/${result.item._id}`);
    } catch (err) {
      if (err instanceof TypeError) {
        alert(err.message);
      } else if (err instanceof Error) {
        alert(err.message);
      }
    }
  };

  const handleValidation = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!title.trim()) {
      setTitleError("내용을 입력해주시기 바랍니다.");
    } else {
      setTitleError("");
    }
    if (!content.trim()) {
      setContentError("내용을 입력해주시기 바랍니다.");
    } else {
      setContentError("");
    }
    if (title.trim() && content.trim()) {
      handleRegister();
    }
  };

  return (
    <main className="min-w-[320px] p-4">
      <div className="text-center py-4">
        <h2 className="text-2xl font-bold text-gray-700 dark:text-gray-200">
          게시글 등록
        </h2>
      </div>
      <section className="mb-8 p-4">
        <form onSubmit={handleValidation}>
          <div className="my-4">
            <label className="block text-lg content-center" htmlFor="title">
              제목
            </label>
            <input
              id="title"
              type="text"
              placeholder="제목을 입력하세요."
              className="w-full py-2 px-4 border rounded-md dark:bg-gray-700 border-gray-300 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
              name="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
            {/* 입력값 검증 에러 출력 */}
            <p className="ml-2 mt-1 text-sm text-red-500 dark:text-red-400">
              {titleError}
            </p>
          </div>
          <div className="my-4">
            <label className="block text-lg content-center" htmlFor="content">
              내용
            </label>
            <textarea
              id="content"
              rows={15}
              placeholder="내용을 입력하세요."
              className="w-full p-4 text-sm border rounded-lg border-gray-300 bg-gray-50 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white"
              name="content"
              value={content}
              onChange={(e) => setContent(e.target.value)}
            ></textarea>
            {/* 입력값 검증 에러 출력 */}
            <p className="ml-2 mt-1 text-sm text-red-500 dark:text-red-400">
              {contentError}
            </p>
          </div>
          <hr />
          <div className="flex justify-end my-6">
            <Submit className="bg-orange-500 py-1 px-4 text-base text-white font-semibold ml-2 hover:bg-amber-400 rounded">
              등록
            </Submit>
            <Button
              type="reset"
              className="bg-gray-900 py-1 px-4 text-base text-white font-semibold ml-2 hover:bg-amber-400 rounded"
              onClick={() => {
                history.back();
              }}
            >
              취소
            </Button>
          </div>
        </form>
      </section>
    </main>
  );
}

export default New;
