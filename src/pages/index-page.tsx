import PostEditor from "@/components/post/post-editor";
import PostItem from "@/components/post/post-item";

const IndexPage = () => {
  return (
    <div className="h-full w-full flex flex-col">
      <PostEditor />
      <section className="w-full p-2.5 overflow-auto flex flex-col gap-4">
        <PostItem />
        <PostItem />
        <PostItem />
        <PostItem />
        <PostItem />
        <PostItem />
        <PostItem />
      </section>
    </div>
  );
};

export default IndexPage;
