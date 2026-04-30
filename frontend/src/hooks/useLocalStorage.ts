const USER_KEY = "user";

export function useLocalStorage() {

  function setUser(data: any) {
    try {
      localStorage.setItem(USER_KEY, JSON.stringify(data));
    } catch (error) {
      console.error("Error while setting user", error);
    }
  }

  function getUser() {
    try {
      const item = localStorage.getItem(USER_KEY);
      return item ? JSON.parse(item) : null;
    } catch (error) {
      console.error("Error reading localStorage key:", USER_KEY, error);
      return null;
    }
  }

  const getToken = () => {
    try {
      return getUser().token;
    } catch (error) {
      console.error("Error reading localStorage key:", error);
      return null;
    }
  };

  const clearLocalStorage = () => {
    try {
      localStorage.removeItem(USER_KEY);
    } catch (error) {
      console.error("Error removing localStorage key:", error);
    }
  };

  const userLoggedIn = getUser() ? true : false;

  return {
    userLoggedIn,
    getToken,
    clearLocalStorage,
    getUser,
    setUser,
  };
}