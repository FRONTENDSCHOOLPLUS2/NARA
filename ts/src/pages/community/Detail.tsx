import { BoardItemResponse } from "#types/board";
import Button from "@components/Button";
import useFetch from "@hooks/useFetch";
import useMutation from "@hooks/useMutation";
import CommentList from "@pages/community/CommentList";
import { userState } from "@recoil/user/atoms";
import { useNavigate, useParams } from "react-router-dom";
import { useRecoilState } from "recoil";

function Detail() {
  const { _id, type } = useParams();
  const navigate = useNavigate();
  const { data } = useFetch<BoardItemResponse>(`/posts/${_id}`);
  const { send } = useMutation(`/posts/${_id}`);
  const [user] = useRecoilState(userState);
  const token = user?.token?.accessToken;
  console.log(data);

  const boardType = type === "cadepend" ? "cadepend" : "";

  // if (loading) return <Spinner />;
  // if (error) return <p>{error.message}</p>;

  const postDetail = data?.ok === 1 ? data.item : null;
  console.log(postDetail);

  const handleDelete = async () => {
    try {
      const result = await send({
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      console.log(result);
      alert("삭제되었습니다.");
      navigate(`/${boardType}`);
    } catch (err) {
      if (err instanceof TypeError) {
        alert(err.message);
      } else if (err instanceof Error) {
        alert(err.message);
      }
    }
  };

  return (
    <main className="container mx-auto mt-4 px-4">
      <section className="mb-8 p-4">
        <div className="font-semibold text-xl">{postDetail?.title}</div>
        <div className="text-right text-gray-400">{postDetail?.user?.name}</div>
        <div className="mb-4">
          <div>
            <pre className="font-roboto w-full p-2 whitespace-pre-wrap">
              {postDetail?.content}
            </pre>
          </div>
          <hr />
        </div>
        <div className="flex justify-end my-4">
          <Button
            className="bg-orange-500 py-1 px-4 text-base text-white font-semibold ml-2 hover:bg-amber-400 rounded"
            onClick={() => navigate(`/${type}`)}
          >
            목록
          </Button>
          {postDetail?.user?._id === user?._id && (
            <>
              <Button
                className="bg-gray-900 py-1 px-4 text-base text-white font-semibold ml-2 hover:bg-amber-400 rounded"
                onClick={() => {
                  navigate(`/${type}/${_id}/edit`, {
                    state: {
                      postDetailTitle: postDetail?.title,
                      postDetailContent: postDetail?.content,
                      _id: postDetail?._id,
                    },
                  });
                }}
              >
                수정
              </Button>
              <Button
                className="bg-red-500 py-1 px-4 text-base text-white font-semibold ml-2 hover:bg-amber-400 rounded"
                onClick={() => {
                  handleDelete();
                }}
              >
                삭제
              </Button>
            </>
          )}
        </div>
      </section>
      <CommentList />
    </main>
  );
}

export default Detail;
