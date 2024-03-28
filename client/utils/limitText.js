export const limitText = (text, count) => {
  const textArr = text.split(" ");
  if (textArr.length <= count) return textArr.join(" ");
  let finalStr = "";
  for (let i = 0; i < count; i++) {
    finalStr += `${textArr[i]} `;
  }
  return `${finalStr.trim()}...`;
};
