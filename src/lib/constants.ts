import Code from "@tiptap/extension-code";
import CodeBlockLowlight from "@tiptap/extension-code-block-lowlight";
import Highlight from "@tiptap/extension-highlight";
import Placeholder from "@tiptap/extension-placeholder";
import Subscript from "@tiptap/extension-subscript";
import Superscript from "@tiptap/extension-superscript";
import TextAlign from "@tiptap/extension-text-align";
import { TextStyleKit } from "@tiptap/extension-text-style";
import Underline from "@tiptap/extension-underline";
import StarterKit from "@tiptap/starter-kit";
import { all, createLowlight } from "lowlight";

export const QUERY_KEYS = {
  profile: {
    all: ["profile"],
    list: ["profile", "list"],
    byId: (userId: string) => ["profile", "byId", userId],
  },
  post: {
    all: ["post"],
    list: ["post", "list"],
    listWithFilters: (filters: { authorId?: string; searchText?: string }) => [
      "post",
      "listWithFilters",
      filters,
    ],
    userList: (userId: string) => ["post", "userList", userId],
    byId: (postId: number) => ["post", "byId", postId],
  },
  comment: {
    all: ["comment"],
    post: (postId: number) => ["comment", "post", postId],
  },
  book: {
    list: (query: string, page: number) => ["book", "list", query, page],
  },
  notification: {
    all: ["notification"],
    list: (userId: string) => ["notification", "list", userId],
    count: (userId: string) => ["notification", "count", userId],
  },
};

export const BUCKET_NAME = "uploads";

const lowlight = createLowlight(all);
export const TIPTAP_EXTENSIONS = [
  TextStyleKit,
  StarterKit,
  CodeBlockLowlight.configure({ lowlight }),
  Code,
  Highlight.configure({ multicolor: true }),
  Underline,
  Superscript,
  Subscript,
  TextAlign.configure({ types: ["heading", "paragraph"] }),
  Placeholder.configure({ placeholder: "가치 있는 순간을 기록해 보세요." }),
];

export const KOREAN_ADJECTIVES = [
  "활발한",
  "유쾌한",
  "차분한",
  "용감한",
  "느긋한",
  "엉뚱한",
  "똑똑한",
  "재빠른",
  "부지런한",
  "수줍은",

  "당당한",
  "순수한",
  "따뜻한",
  "상냥한",
  "다정한",
  "명랑한",
  "침착한",
  "꼼꼼한",
  "성실한",
  "단단한",

  "날렵한",
  "유연한",
  "자유로운",
  "낙천적인",
  "긍정적인",
  "호기심많은",
  "센스있는",
  "재치있는",
  "솔직한",
  "겸손한",

  "당찬",
  "귀여운",
  "사려깊은",
  "대담한",
  "섬세한",
  "담백한",
  "온화한",
  "단호한",
  "의젓한",
  "씩씩한",

  "기특한",
  "청명한",
  "빛나는",
  "평온한",
  "차오르는",
  "포근한",
  "잔잔한",
  "말랑한",
  "반짝이는",
  "산뜻한",

  "감각적인",
  "섬광같은",
  "정직한",
  "침착한",
  "기민한",
  "유능한",
  "깨끗한",
  "풍부한",
  "단순한",
  "정다운",

  "선명한",
  "묵직한",
  "경쾌한",
  "정제된",
  "부드러운",
  "강인한",
  "은은한",
  "차오른",
  "신중한",
  "유려한",
];

export const KOREAN_ANIMALS = [
  "사자",
  "호랑이",
  "표범",
  "치타",
  "늑대",
  "여우",
  "곰",
  "판다",
  "코알라",
  "하이에나",

  "강아지",
  "고양이",
  "햄스터",
  "토끼",
  "다람쥐",
  "고슴도치",
  "수달",
  "너구리",
  "족제비",
  "기니피그",

  "말",
  "얼룩말",
  "사슴",
  "알파카",
  "라마",
  "염소",
  "양",
  "소",
  "돼지",
  "당나귀",

  "독수리",
  "매",
  "올빼미",
  "부엉이",
  "까치",
  "참새",
  "앵무새",
  "백조",
  "오리",
  "펭귄",

  "돌고래",
  "고래",
  "상어",
  "가오리",
  "물개",
  "바다사자",
  "해마",
  "문어",
  "오징어",
  "거북이",

  "개구리",
  "도마뱀",
  "카멜레온",
  "악어",
  "이구아나",
  "뱀",
  "거북",
  "두더지",
  "고라니",
  "멧돼지",

  "낙타",
  "코끼리",
  "기린",
  "하마",
  "코뿔소",
  "미어캣",
  "프레리독",
  "캥거루",
  "왈라비",
  "비버",

  "고릴라",
  "침팬지",
  "원숭이",
  "슬로우로리스",
  "나무늘보",
  "판골린",
  "아르마딜로",
  "사막여우",
  "북극곰",
  "눈표범",
];
