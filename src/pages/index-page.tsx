import PostEditor from "@/components/post/post-editor";
import PostList from "@/components/post/post-list";

const IndexPage = () => {
  return (
    <div className="h-full w-full flex flex-col">
      <PostEditor />
      <PostList type="FEED" />
    </div>
  );
};

export default IndexPage;
