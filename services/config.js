const backendUrl =
  process.env.NEXT_PUBLIC_BACKEND_URL || "http://localhost:8000";

export const apiUrlUser = `${backendUrl}/user`;
export const apiUrlCategory = `${backendUrl}/category`;
export const apiUrlBrand = `${backendUrl}/brand`;
export const apiUrlProduct = `${backendUrl}/product`;
// export const apiUrlNews = `${backendUrl}/api/news`;
// export const apiUrlChat = `${backendUrl}/api/chat`;
// export const apiUrlMess = `${backendUrl}/api/mess`;
