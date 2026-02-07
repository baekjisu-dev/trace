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
    <div className="flex flex-col overflow-auto p-2.5 gap-2.5 h-full w-full">
      <div className="w-full flex justify-between items-center">
        <p className="text-xl font-bold">DM</p>
      </div>
      {dmList.length > 0 ? (
        dmList.map((dm) => <DmItem key={dm} dmId={dm} />)
      ) : (
        <div className="text-center text-sm text-muted-foreground flex items-center justify-center h-full w-full">
          대화를 시작해 볼까요?
        </div>
      )}
      <div ref={ref} />
    </div>
  );
};

export default DmList;
