import Button from "@components/Button";
import useMutation from "@hooks/useMutation";
import { userState } from "@recoil/user/atoms";
import { Link } from "react-router-dom";
import { useRecoilState } from "recoil";

function CommentItem({ item, _id, refetch }) {
  const { send } = useMutation(`/posts/${_id}/replies/${item._id}`);
  const [user] = useRecoilState(userState);
  const token = user?.token?.accessToken;

  console.log(item);
  const reply = item ?? [];
  console.log(reply);

  const handleDeleteComment = async () => {
    try {
      const result = await send({
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
      console.log(result);
      refetch();
    } catch (err) {
      alert(err.message);
    }
  };

  return (
    <>
      <div className="shadow-md rounded-lg p-4 mb-4">
        <div className="flex justify-between items-center mb-2">
          {reply.user?.profile ? (
            <img
              className="w-8 mr-2 rounded-full"
              src={`http://api.fesp.shop/${reply.user?.profile.path}`}
              alt={`${reply.user.name} 프로필 이미지`}
            />
          ) : (
            <img
              className="w-8 mr-2 rounded-full"
              src="/src/assets/defaultImg.png"
              alt={`${reply.user.name} 프로필 이미지`}
            />
          )}

          <Link to="" className="text-orange-400">
            {reply.user.name}
          </Link>
          <time
            className="ml-auto text-gray-500"
            dateTime="2024.07.02 14:11:22"
          >
            {reply.updatedAt}
          </time>
        </div>
        <div className="flex justify-between items-center mb-2">
          <pre className="whitespace-pre-wrap text-sm">{reply.content}</pre>
          {user?._id === reply.user._id && (
            <Button
              className="bg-red-500 py-1 px-4 text-sm text-white font-semibold ml-2 hover:bg-amber-400 rounded"
              onClick={handleDeleteComment}
            >
              삭제
            </Button>
          )}
        </div>
      </div>
    </>
  );
}

export default CommentItem;
