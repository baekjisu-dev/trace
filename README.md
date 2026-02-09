# TRACE

***moments worth keeping***

<img height="500" alt="image" src="https://github.com/user-attachments/assets/ee460120-4639-42ce-8acd-2dfc2a1da981" />
<img height="500" alt="image" src="https://github.com/user-attachments/assets/5ca7172f-5332-47eb-9e59-5ed3c8cc6abb" />
<img height="500" alt="image" src="https://github.com/user-attachments/assets/fc577ed1-6f55-4f3e-a583-0e7959fbdd50" />



- 읽고, 보고, 느낀 순간을 기록하고 연결하는 기록 중심 SNS
- 독서 · 감상 · 생각을 하나의 흐름으로 관리하는 개인 기록 플랫폼

🙋‍♀️ 개발 인원: 1명

📆 개발 기간: 2026년 1월 13일 ~ 2026년 2월 9일

### 접속 정보
[접속 링크](https://trace-blond.vercel.app/sign-in)

테스트 계정 test@test.com / 12345678


## 1. 프로젝트 소개

TRACE는 책·영화·글·생각을 **기록의 단위**로 다루는 SNS입니다.

단순한 타임라인이 아니라 무엇을 읽고/보고, 어떤 상태로 머물렀고, 그 과정에서 무엇을 느꼈는지를 하나의 기억의 조각으로 남기는 데 초점을 둡니다.

느긋하게 흘러가는 피드 위에 하나씩 무언가를 쌓아가는 기분을 느낄 수 있습니다.


## 2. 주요 기능

**📌 피드 & 게시글**
- 텍스트 에디터 (Tiptap) 기반 포스트 작성 및 수정
- 포스트 내 여러 개의 이미지 첨부
- 포스트 내용 검색

**📌 커뮤니케이션**
- 좋아요 / 댓글
- DM (1:1)
- 알림 시스템 + 읽음 상태 관리

**📌 책 & 감상 관리**
- 카카오 API를 활용한 도서 검색
- 포스트 내 도서 정보 카드 첨부

**📌 부드러운 디자인**
- 눈이 편안한 파스텔 톤의 디자인
- 4가지의 색상 테마 제공
- 라이트/다크 모드 전환


## 3. 기술 스택
**💅 Frontend**
- React
- TypeScript
- Vite
- TanStack Query
- Zustand
- shadcn/ui
- Tailwind CSS
- Tiptap Editor
- react-hook-form
- Zod

**💻 Backend**
- Supabase
  - Realtime
  - Row Level Security (RLS)

**🛠️ Tooling**
-	ESLint / Prettier
-	Supabase CLI
-	Vercel (배포)


## 4. 설계 포인트

**📦 상태 관리**
- UI 상태: Zustand
- 서버 상태: TanStack Query

**🔐 보안**
- Supabase RLS 기반 권한 제어
- 알림/DM 접근 범위 명확히 분리

**🔔 알림 설계**
- 트리거 기반 알림 생성
- Supabase Realtime을 활용한 WebSocket 통신


## 5. 폴더 구조
```
src
 ┣ 📂api
 ┣ 📂assets
 ┃ ┗ 📂icons
 ┣ 📂components
 ┃ ┣ 📂book
 ┃ ┣ 📂comment
 ┃ ┣ 📂dm
 ┃ ┣ 📂layout
 ┃ ┃ ┣ 📂header
 ┃ ┃ ┃ ┗  📂parts
 ┃ ┃ ┗ 📂nav
 ┃ ┣ 📂modal
 ┃ ┣ 📂notification
 ┃ ┣ 📂post
 ┃ ┃ ┗ 📂parts
 ┃ ┣ 📂profile
 ┃ ┣ 📂theme
 ┃ ┣ 📂tiptap-extension
 ┃ ┣ 📂tiptap-icons
 ┃ ┣ 📂tiptap-node
 ┃ ┃ ┣ 📂blockquote-node
 ┃ ┃ ┣ 📂code-block-node
 ┃ ┃ ┣ 📂heading-node
 ┃ ┃ ┣ 📂horizontal-rule-node
 ┃ ┃ ┣ 📂list-node
 ┃ ┃ ┗ 📂paragraph-node
 ┃ ┣ 📂tiptap-ui
 ┃ ┃ ┣ 📂blockquote-button
 ┃ ┃ ┣ 📂code-block-button
 ┃ ┃ ┣ 📂color-highlight-button
 ┃ ┃ ┣ 📂color-highlight-popover
 ┃ ┃ ┣ 📂heading-button
 ┃ ┃ ┣ 📂heading-dropdown-menu
 ┃ ┃ ┣ 📂link-popover
 ┃ ┃ ┣ 📂list-button
 ┃ ┃ ┣ 📂list-dropdown-menu
 ┃ ┃ ┣ 📂mark-button
 ┃ ┃ ┗ 📂text-align-button
 ┃ ┣ 📂tiptap-ui-primitive
 ┃ ┃ ┣ 📂badge
 ┃ ┃ ┣ 📂button
 ┃ ┃ ┣ 📂card
 ┃ ┃ ┣ 📂dropdown-menu
 ┃ ┃ ┣ 📂input
 ┃ ┃ ┣ 📂popover
 ┃ ┃ ┣ 📂separator
 ┃ ┃ ┗ 📂tooltip
 ┃ ┗ 📂ui
 ┣ 📂hooks
 ┃ ┣ 📂mutations
 ┃ ┃ ┣ 📂auth
 ┃ ┃ ┣ 📂comment
 ┃ ┃ ┣ 📂dm
 ┃ ┃ ┣ 📂notification
 ┃ ┃ ┣ 📂post
 ┃ ┃ ┗ 📂profile
 ┃ ┣ 📂queries
 ┃ ┃ ┣ 📂comment
 ┃ ┃ ┣ 📂dm
 ┃ ┃ ┣ 📂notification
 ┃ ┃ ┣ 📂post
 ┃ ┃ ┗ 📂profile
 ┣ 📂lib
 ┣ 📂pages
 ┣ 📂provider
 ┣ 📂store
 ┣ 📂styles
 ┗ ┗ 📂theme
```
