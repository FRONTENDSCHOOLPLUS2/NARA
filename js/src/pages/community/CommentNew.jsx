import Button from "@components/Button";
import useMutation from "@hooks/useMutation";
import { userState } from "@recoil/user/atoms";
import { useState } from "react";
import { useParams } from "react-router-dom";
import { useRecoilState } from "recoil";

function CommentNew({ refetch }) {
  const { _id } = useParams();
  const { send } = useMutation(`/posts/${_id}/replies`);
  const [content, setContent] = useState("");
  const user = useRecoilState(userState);
  const token = user[0]?.token?.accessToken;

  console.log(_id);

  const handleAddReply = async () => {
    try {
      const result = await send({
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          content,
        }),
      });
      console.log(result);
      refetch();
    } catch (err) {
      alert(err.message);
    }
  };

  return (
    <div className="p-4 border border-gray-200 rounded-lg">
      <h4 className="mb-4">새로운 댓글을 추가하세요.</h4>
      <form>
        <div className="mb-4">
          <textarea
            rows="3"
            cols="40"
            className="block p-2 w-full text-sm border rounded-lg border-gray-300 bg-gray-50 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white"
            placeholder="내용을 입력하세요."
            name="comment"
            value={content}
            onChange={(e) => setContent(e.target.value)}
          ></textarea>

          {/* 에러 메세지 출력 */}
          {/*
      <p className="ml-2 mt-1 text-sm text-red-500">
        에러 메세지
      </p>
      */}
        </div>
        <Button
          className="bg-orange-500 py-1 px-4 text-sm text-white font-semibold ml-2 hover:bg-amber-400 rounded"
          onClick={handleAddReply}
        >
          댓글 등록
        </Button>
      </form>
    </div>
  );
}

export default CommentNew;
