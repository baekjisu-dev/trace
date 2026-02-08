/** -----------------------------
 * @description 시간 포맷팅
 * @param time 시간
 * @returns 시간 포맷팅
 * ----------------------------- */
export const formatTimeAgo = (time: Date | string | number) => {
  // * 시작 시간
  const start = new Date(time);
  // * 종료 시간
  const end = new Date();

  // * 초 차이
  const secondDiff = Math.floor((end.getTime() - start.getTime()) / 1000);
  if (secondDiff < 60) return "방금 전";

  // * 분 차이
  const minuteDiff = Math.floor(secondDiff / 60);
  if (minuteDiff < 60) return `${minuteDiff}분 전`;

  // * 시간 차이
  const hourDiff = Math.floor(minuteDiff / 60);
  if (hourDiff < 24) return `${hourDiff}시간 전`;

  // * 일 차이
  const dayDiff = Math.floor(hourDiff / 24);
  return `${dayDiff}일 전`;
};
