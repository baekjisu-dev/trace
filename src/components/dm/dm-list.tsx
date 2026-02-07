import { useInfiniteDm } from "@/hooks/queries/dm/use-infinite-dm";
import Loader from "../loader";
import { useEffect } from "react";
import { useInView } from "react-intersection-observer";
import DmItem from "./dm-item";

const DmList = () => {
  const {
    data,
    isPending,
    isFetching,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  } = useInfiniteDm();
  const { ref, inView } = useInView();

  useEffect(() => {
    if (inView && hasNextPage && !isFetchingNextPage) {
      fetchNextPage();
    }
  }, [inView, hasNextPage, isFetchingNextPage, fetchNextPage]);

  if (isPending && isFetching) return <Loader />;

  const dmList = data?.pages.flatMap((page) => page.dmList) || [];

  return (
    <div className="flex flex-col overflow-auto p-2.5 gap-2.5">
      {dmList.map((dm) => (
        <DmItem key={dm} dmId={dm} />
      ))}
      <div ref={ref} />
    </div>
  );
};

export default DmList;
