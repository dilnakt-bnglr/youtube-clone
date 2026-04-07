export const getToken = () => {
  let token = "";
  try {
    token = JSON.parse(localStorage.getItem("token")) || "";
  } catch (error) {
    console.log("Error parsing token from localStorage:", error);
  }
  return token;
};

export const getUserId = () => {
  let userId = "";
  try {
    userId = JSON.parse(localStorage.getItem("userId")) || "";
  } catch (error) {
    console.log("Error parsing userId from localStorage:", error);
  }
  return userId;
};

export const getUserName = () => {
  let userName = "";
  try {
    userName = JSON.parse(localStorage.getItem("userName")) || "";
  } catch (error) {
    console.log("Error parsing userName from localStorage:", error);
  }
  return userName;
};
