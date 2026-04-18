export const getTimeAgo = (time: string): string => {
  const now = new Date().getTime();
  const timeAgo = new Date(time)
  const past = timeAgo.getTime()

  if (past > now) {
    throw new Error("Input time need to smaller than current time");
  }

  const munites = (now - past) / 60000;

  if (munites > 0 && munites < 60) {
    const isRecently = Math.floor(munites) === 0;
    return isRecently ? 'Vừa xong' :  `${Math.floor(munites)} phút`;
  }

  if (munites >= 60 && munites < 60 * 24) {
    return `${Math.floor(munites / 60)} giờ`;
  }

  const month = timeAgo.getMonth() + 1;
  const day = timeAgo.getDate();
  const year = timeAgo.getFullYear();
  const hour = timeAgo.getHours();
  const minute = timeAgo.getMinutes();

  return `Ngày ${day} tháng ${month} năm ${year} ${hour} giờ ${minute} phút`;
};
