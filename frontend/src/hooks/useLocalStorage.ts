const TOKEN_KEY = "token";

export function useLocalStorage() {

  const getToken = () => {
    try {
      const item = localStorage.getItem(TOKEN_KEY);
      return item ? JSON.parse(item) : null;
    } catch (error) {
      console.error("Error reading localStorage key:", TOKEN_KEY, error);
      return null;
    }
  };

  const clearLocalStorage = () => {
    try {
      localStorage.removeItem(TOKEN_KEY);
    } catch (error) {
      console.error("Error removing localStorage key:", TOKEN_KEY, error);
    }
  };

  const userLoggedIn = getToken() ? true : false;

  return {
    userLoggedIn,
    getToken,
    clearLocalStorage,
  };
}