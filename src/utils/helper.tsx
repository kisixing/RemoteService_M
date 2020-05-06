export const isJsonStr = (str: string) => {
  try {
    if (typeof JSON.parse(str) === 'object') {
      return true;
    }
  } catch (error) {
    console.warn(`'${str}' 不是一个合法的 json 字符串`);
  }
  return false;
};
