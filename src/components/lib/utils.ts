export const getCurrentGreatingMessage = () => {
  const hour = new Date().getHours();
  if (hour >= 4 && hour < 12) {
    return "Good Morning";
  } else if (hour >= 12 && hour < 18) {
    return "Good Afternoon";
  } else {
    return "Good Evening";
  }
};
