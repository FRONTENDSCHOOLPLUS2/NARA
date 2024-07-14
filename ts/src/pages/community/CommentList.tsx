import { CommentItemResponse } from "#types/board";
import useFetch from "@hooks/useFetch";
import CommentItem from "@pages/community/CommentItem";
import CommentNew from "@pages/community/CommentNew";
import { useParams } from "react-router-dom";

function CommentList() {
  const { _id } = useParams();
  const { data, refetch } = useFetch<CommentItemResponse>(
    `/posts/${_id}/replies`
  );
  console.log(data);

  const repliesList = data?.item.map((item) => (
    <CommentItem key={item._id} item={item} refetch={refetch} _id={_id} />
  ));

  const repliesCount = data?.item.length;

  return (
    <section className="mb-8">
      <CommentNew refetch={refetch} />
      <h4 className="mt-8 mb-4 ml-2">댓글 {repliesCount || 0}개</h4>
      {repliesList}
    </section>
  );
}

export default CommentList;
