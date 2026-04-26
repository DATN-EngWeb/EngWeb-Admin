export const formatDateVN = (datetime?: string) => {
  if (!datetime) return "";

  return new Date(datetime).toLocaleDateString("vi-VN");
};
