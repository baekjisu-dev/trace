export const fetchBooks = async ({page, size, query}: {page: number, size: number, query: string}) => {
  const books = await fetch(`https://dapi.kakao.com/v3/search/book?page=${page}&size=${size}&query=${query}`, {
    method: 'GET',
    headers: {
      Authorization: `KakaoAK ${import.meta.env.VITE_KAKAO_REST_API_KEY}`,
    },
  });
  if (!books.ok) {
    throw new Error('Failed to fetch books');
  }

  return books.json();
}