/**
 * @param {string} date - ex. '2024-08-26T11:50:17.825433'
 * @returns {string} - ex. '2일 전' | '1시간 전' | '방금 전'
 */

export function dateStringToMessageTime(date) {
  // TODO: 현재 주어지는 시간이 UTC 시간이므로 한국 시간으로 변환 추후 수정 필요
  const kstOffset = 9 * 60 * 60 * 1000; // 9시간을 밀리초로 변환
  const dateObj = new Date(new Date(date).getTime() + kstOffset);

  const currentDate = new Date();

  const timeDiff = currentDate - dateObj;

  const seconds = Math.floor(timeDiff / 1000);
  const minutes = Math.floor(seconds / 60);
  const hours = Math.floor(minutes / 60);
  const days = Math.floor(hours / 24);

  const currentYear = currentDate.getFullYear();
  const currentMonth = currentDate.getMonth();
  const currentDay = currentDate.getDate();

  const messageYear = dateObj.getFullYear();
  const messageMonth = dateObj.getMonth();
  const messageDay = dateObj.getDate();

  if (minutes < 1) {
    return '방금 전';
  } else if (minutes >= 1 && minutes < 60) {
    return `${minutes}분 전`;
  } else if (hours >= 1 && hours < 24) {
    return `${hours}시간 전`;
  } else if (
    days === 1 &&
    currentYear === messageYear &&
    currentMonth === messageMonth &&
    currentDay - messageDay === 1
  ) {
    return '어제';
  } else {
    // 현재 연도와 다를 경우 연도도 포함
    const month = messageMonth + 1; // 월은 0부터 시작하므로 +1
    const day = messageDay;
    return `${month}월 ${day}일`;
  }
}
