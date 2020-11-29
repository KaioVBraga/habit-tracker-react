export const getUser = () => {
  const habit_user = localStorage.getItem('habit_user') as string;
  const user = JSON.parse(habit_user);
  return user;
}