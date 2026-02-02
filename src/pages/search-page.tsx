import PostList from "@/components/post/post-list";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Carousel, CarouselContent } from "@/components/ui/carousel";
import { Input } from "@/components/ui/input";
import { PRIVATE_PAGE_PATHS } from "@/lib/pages";
import { useCurrentSearchStore } from "@/store/currnet-search";
import { RefreshCcwIcon, SearchIcon, XIcon } from "lucide-react";
import { useState } from "react";
import { useNavigate, useSearchParams } from "react-router";

const SearchPage = () => {
  const navigate = useNavigate();
  const [params] = useSearchParams();
  const filters = {
    searchText: params.get("searchText") || "",
  };

  const {
    currentSearchTexts,
    actions: { addSearchText, removeSearchText, clearSearchTexts },
  } = useCurrentSearchStore();

  const [currentSearchText, setCurrentSearchText] = useState(
    filters.searchText
  );

  const handleSearch = (text?: string) => {
    if (!text && !currentSearchText) return;
    if (
      (!text && filters.searchText === currentSearchText) ||
      filters.searchText === text
    )
      return;

    if (!text) {
      const filteredTexts = currentSearchTexts.filter(
        (t) => t !== currentSearchText
      );
      addSearchText([currentSearchText, ...filteredTexts].slice(0, 10));
    } else {
      setCurrentSearchText(text);
    }

    navigate(
      PRIVATE_PAGE_PATHS.SEARCH.getPath({
        searchText: text || currentSearchText,
      })
    );
  };

  return (
    <div className="h-full w-full flex flex-col">
      <div className="p-2.5 flex gap-2 items-center">
        <Input
          placeholder="찾고 싶은 내용을 검색하세요"
          value={currentSearchText || ""}
          onChange={(e) => setCurrentSearchText(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              handleSearch();
            }
          }}
        />
        <Button variant="default" onClick={() => handleSearch()}>
          <SearchIcon className="size-4" />
          검색
        </Button>
      </div>
      <div className="flex gap-2 px-2.5 items-center h-[22px]">
        {currentSearchTexts.length > 0 && (
          <div className="cursor-pointer" onClick={() => clearSearchTexts()}>
            <RefreshCcwIcon className="size-4 text-muted-foreground" />
          </div>
        )}
        <div className="flex-1 px-1 overflow-hidden">
          <Carousel className="w-full">
            <CarouselContent className="flex gap-1 ml-0">
              {currentSearchTexts.map((text) => (
                <Badge
                  className="cursor-pointer"
                  key={text}
                  onClick={() => handleSearch(text)}
                >
                  <p className="max-w-[120px] overflow-hidden text-ellipsis whitespace-nowrap">
                    {text}
                  </p>
                  <div
                    className="cursor-pointer"
                    onClick={(e) => {
                      e.stopPropagation();
                      removeSearchText(text);
                    }}
                  >
                    <XIcon className="size-3" />
                  </div>
                </Badge>
              ))}
            </CarouselContent>
          </Carousel>
        </div>
      </div>
      <PostList searchText={filters.searchText} type="SEARCH" />
    </div>
  );
};

export default SearchPage;
