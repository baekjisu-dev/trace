import PostEditor from "@/components/post/post-editor";
import PostItem from "@/components/post/post-item";

const IndexPage = () => {
  return (
    <div className="h-full w-full">
      <PostEditor />
      <section className="w-full h-full p-2.5">
        <PostItem />
      </section>
    </div>
  );
};

export default IndexPage;
