import PostList from "@/components/post/post-list";
import { Input } from "@/components/ui/input";
import { PRIVATE_PAGE_PATHS } from "@/lib/pages";
import { useState } from "react";
import { useNavigate, useSearchParams } from "react-router";

const SearchPage = () => {
  const navigate = useNavigate();
  const [params] = useSearchParams();
  const filters = {
    searchText: params.get("searchText") || "",
  };

  const [currentSearchText, setCurrentSearchText] = useState(
    filters.searchText
  );

  return (
    <div className="h-full w-full flex flex-col">
      <div className="p-2.5 ">
        <Input
          placeholder="찾고 싶은 내용을 검색하세요"
          value={currentSearchText || ""}
          onChange={(e) => setCurrentSearchText(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              navigate(
                PRIVATE_PAGE_PATHS.SEARCH.getPath({
                  searchText: currentSearchText,
                })
              );
            }
          }}
        />
      </div>
      <PostList searchText={filters.searchText} type="SEARCH" />
    </div>
  );
};

export default SearchPage;
