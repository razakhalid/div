export const cookieUtils = {
  getCookie(key: string) {
    return document.cookie
      .split("; ")
      .find((keyPair) => keyPair.startsWith(key))
      ?.split("=")[1];
  },
};
