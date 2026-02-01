import { KOREAN_ADJECTIVES, KOREAN_ANIMALS } from "./constants";

const getShortNumberFromUUID = (uuid: string): number => {
  let hash = 0;
  for (let i = 0; i < uuid.length; i++) {
    hash = (hash * 31 + uuid.charCodeAt(i)) & 0xffffffff;
  }
  // 10000~99999 사이의 5자리 숫자로 변환 (충분히 랜덤성과 중복 최소화)
  const shortNumber = (Math.abs(hash) % 90000) + 10000;
  return shortNumber;
};

export const generateRandomNickname = (userId: string): string => {
  const firstNameIndex = Math.floor(
    Math.random() * (KOREAN_ADJECTIVES.length + 1)
  );
  const lastNameIndex = Math.floor(Math.random() * (KOREAN_ANIMALS.length + 1));
  const firstName = KOREAN_ADJECTIVES[firstNameIndex];
  const lastName = KOREAN_ANIMALS[lastNameIndex];

  return `${firstName} ${lastName} ${getShortNumberFromUUID(userId)}`;
};
