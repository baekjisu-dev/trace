import PostItem from "@/components/post/post-item";
import { PRIVATE_PAGE_PATHS } from "@/lib/pages";
import { Navigate, useParams } from "react-router";

const PostDetailPage = () => {
  const { postId } = useParams();

  if (!postId) {
    return <Navigate to={PRIVATE_PAGE_PATHS.HOME.path} replace />;
  }

  return (
    <div className="w-full h-full">
      <PostItem postId={Number(postId)} type="DETAIL" />
    </div>
  );
};

export default PostDetailPage;
