import { KOREAN_ADJECTIVES, KOREAN_ANIMALS } from "./constants";

// * UUID를 5자리 숫자로 변환
const getShortNumberFromUUID = (uuid: string): number => {
  let hash = 0;
  for (let i = 0; i < uuid.length; i++) {
    hash = (hash * 31 + uuid.charCodeAt(i)) & 0xffffffff;
  }
  // 10000~99999 사이의 5자리 숫자로 변환 (충분히 랜덤성과 중복 최소화)
  const shortNumber = (Math.abs(hash) % 90000) + 10000;
  return shortNumber;
};

/** -----------------------------
 * @description 랜덤 닉네임 생성
 * @param userId 유저 ID
 * @returns 랜덤 닉네임
 * ----------------------------- */
export const generateRandomNickname = (userId: string): string => {
  // * 랜덤 형용사 선택
  const firstNameIndex = Math.floor(
    Math.random() * (KOREAN_ADJECTIVES.length + 1)
  );
  // * 랜덤 동물 선택
  const lastNameIndex = Math.floor(Math.random() * (KOREAN_ANIMALS.length + 1));

  const firstName = KOREAN_ADJECTIVES[firstNameIndex];
  const lastName = KOREAN_ANIMALS[lastNameIndex];

  // * 랜덤 닉네임 생성
  return `${firstName} ${lastName} ${getShortNumberFromUUID(userId)}`;
};
