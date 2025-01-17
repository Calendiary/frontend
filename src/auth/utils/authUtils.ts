export const isLoggedIn = () => {
  return Boolean(localStorage.getItem('userId'));
};

export const logout = () => {
  localStorage.removeItem('userId');
  localStorage.removeItem('nickname');
  localStorage.removeItem('profileImage');
};
