import type { ColorThemeItem } from "@/types";
import CodeBlockLowlight from "@tiptap/extension-code-block-lowlight";
import Highlight from "@tiptap/extension-highlight";
import Placeholder from "@tiptap/extension-placeholder";
import Subscript from "@tiptap/extension-subscript";
import Superscript from "@tiptap/extension-superscript";
import TextAlign from "@tiptap/extension-text-align";
import { TextStyleKit } from "@tiptap/extension-text-style";
import StarterKit from "@tiptap/starter-kit";
import { all, createLowlight } from "lowlight";

// * 쿼리 키
export const QUERY_KEYS = {
  dm: {
    all: ["dm"],
    list: ["dm", "list"],
    hasUnread: ["dm", "hasUnread"],
    byId: (conversationId: number) => ["dm", "byId", conversationId],
    conversation: (conversationId: number) => [
      "dm",
      "conversation",
      conversationId,
    ],
  },
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

// * 이미지가 업로드될 버킷 이름
export const BUCKET_NAME = "uploads";

// * Tiptap 확장
const lowlight = createLowlight(all);
export const TIPTAP_EXTENSIONS = [
  TextStyleKit,
  StarterKit,
  CodeBlockLowlight.configure({ lowlight }),
  Highlight.configure({ multicolor: true }),
  Superscript,
  Subscript,
  TextAlign.configure({ types: ["heading", "paragraph"] }),
  Placeholder.configure({ placeholder: "가치 있는 순간을 기록해 보세요." }),
];

// * 한국어 형용사 - 닉네임 생성 용
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

// * 한국어 동물 - 닉네임 생성 용
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

// * 테마 목록
export const THEMES: ColorThemeItem[] = [
  {
    name: "evergreen",
    description: "기본이 되는 기록의 색",
    color: "oklch(0.42 0.085 145)",
    className: "bg-[oklch(0.42_0.085_145)]",
    mainColorList: [
      "bg-[oklch(0.42_0.085_145)]",
      "bg-[oklch(0.95_0.025_145)]",
      "bg-[oklch(0.65_0.07_145)]",
      "bg-[oklch(0.30_0.06_145)]",
    ],
  },
  {
    name: "afterglow",
    description: "활동과 감정이 남는 기록",
    color: "oklch(0.52 0.14 265)",
    className: "bg-[oklch(0.52_0.14_265)]",
    mainColorList: [
      "bg-[oklch(0.52_0.14_265)]",
      "bg-[oklch(0.95_0.035_265)]",
      "bg-[oklch(0.68_0.18_345)]",
      "bg-[oklch(0.34_0.11_265)]",
    ],
  },
  {
    name: "linen",
    description: "종이처럼 남는 기록",
    color: "oklch(0.45 0.06 25)",
    className: "bg-[oklch(0.45_0.06_25)]",
    mainColorList: [
      "bg-[oklch(0.45_0.06_25)]",
      "bg-[oklch(0.96_0.02_25)]",
      "bg-[oklch(0.68_0.06_35)]",
      "bg-[oklch(0.32_0.05_25)]",
    ],
  },
  {
    name: "midnight",
    description: "집중과 회고를 위한 테마",
    color: "oklch(0.38 0.06 260)",
    className: "bg-[oklch(0.38_0.06_260)]",
    mainColorList: [
      "bg-[oklch(0.38_0.06_260)]",
      "bg-[oklch(0.94_0.02_260)]",
      "bg-[oklch(0.70_0.10_260)]",
      "bg-[oklch(0.26_0.05_260)]",
    ],
  },
];
