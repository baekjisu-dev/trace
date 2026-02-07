import { useInfinitePosts } from "@/hooks/queries/post/use-infinite-posts";
import PostItem from "./post-item";
import { useInView } from "react-intersection-observer";
import Loader from "../loader";
import { useEffect } from "react";
import Fallback from "../fallback";

interface PostListProps {
  authorId?: string;
  searchText?: string;
  type: "SEARCH" | "FEED" | "PROFILE";
}

const PostList = ({ authorId, searchText, type }: PostListProps) => {
  const {
    data,
    error,
    isPending,
    isFetching,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  } = useInfinitePosts({ filters: { authorId, searchText }, type });
  const { ref, inView } = useInView();

  const posts = data?.pages.flatMap((page) => page.posts) || [];

  useEffect(() => {
    if (inView && hasNextPage && !isFetchingNextPage) {
      fetchNextPage();
    }
  }, [inView, hasNextPage, isFetchingNextPage]);

  if (error) return <Fallback />;
  if (isPending && isFetching) return <Loader />;

  return (
    <section className="w-full p-2.5 overflow-auto flex flex-col gap-4">
      {posts.map((post) => (
        <PostItem key={post} postId={post} type="FEED" />
      ))}
      {isFetching && <Loader />}
      {posts.length === 0 && (
        <div className="text-center text-sm text-muted-foreground">
          {type === "SEARCH"
            ? searchText
              ? "검색 결과가 없습니다."
              : "검색어를 입력해 주세요."
            : "등록된 포스트가 없습니다."}
        </div>
      )}

      <div ref={ref} />
    </section>
  );
};

export default PostList;
