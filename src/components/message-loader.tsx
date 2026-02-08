import { useMessageLoader } from "@/store/message-loader";
import { createPortal } from "react-dom";

/** -----------------------------
 * @description 메시지 로딩 컴포넌트 - 모달 루트 요소에 삽입
 * @returns 메시지 로딩 컴포넌트
 * ----------------------------- */
const MessageLoader = () => {
  const { isOpen, message } = useMessageLoader();

  if (!isOpen) return null;

  return createPortal(
    <div
      className="fixed inset-0 z-100 flex items-center justify-center p-4"
      role="status"
      aria-live="polite"
      aria-label={message || "로딩 중"}
    >
      <div
        className="absolute inset-0 -z-10 bg-black/50 animate-in fade-in-0 duration-200"
        aria-hidden
      />
      <div
        className="flex min-w-[200px] max-w-[320px] flex-col items-center gap-4 rounded-xl px-6 py-5 shadow-(--tt-shadow-elevated-md) animate-in zoom-in-95 fade-in-0 duration-200"
        style={{
          backgroundColor: "var(--tt-card-bg-color)",
          border: "1px solid var(--tt-card-border-color)",
          borderRadius: "var(--tt-radius-xl)",
        }}
      >
        <div
          className="h-8 w-8 shrink-0 rounded-full border-2 border-(--tt-gray-light-a-300) border-t-(--tt-cursor-color) dark:border-(--tt-gray-dark-a-300) dark:border-t-(--tt-cursor-color)"
          style={{ animation: "spin 0.7s linear infinite" }}
        />
        {message && (
          <p className="text-center text-sm font-medium text-(--tt-gray-light-700) dark:text-(--tt-gray-dark-700)">
            {message}
          </p>
        )}
      </div>
    </div>,
    document.getElementById("modal-root")!
  );
};

export default MessageLoader;
