import { useInfinitePosts } from "@/hooks/queries/post/use-infinite-posts";
import PostItem from "./post-item";
import { useInView } from "react-intersection-observer";
import Loader from "../loader";
import { useEffect } from "react";
import Fallback from "../fallback";

interface PostListProps {
  userId?: string;
}

const PostList = ({ userId }: PostListProps) => {
  const {
    data,
    error,
    isPending,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  } = useInfinitePosts(userId);
  const { ref, inView } = useInView();

  const posts = data?.pages.flatMap((page) => page.posts) || [];

  useEffect(() => {
    if (inView && hasNextPage && !isFetchingNextPage) {
      fetchNextPage();
    }
  }, [inView, hasNextPage, isFetchingNextPage]);

  if (error) return <Fallback />;
  if (isPending) return <Loader />;

  return (
    <section className="w-full p-2.5 overflow-auto flex flex-col gap-4">
      {posts.map((post) => (
        <PostItem key={post} postId={post} type="FEED" />
      ))}
      {isPending && <Loader />}

      <div ref={ref} />
    </section>
  );
};

export default PostList;
