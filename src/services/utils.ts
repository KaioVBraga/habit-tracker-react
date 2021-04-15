export const getUser = () => {
  const habit_user = localStorage.getItem("habit_user") as string;
  const user = JSON.parse(habit_user);
  return user;
};

export const handleTimezone = (inDate: any, actualTime = false) => {
  const date = new Date(inDate);

  if (!actualTime) {
    date.setHours(0, 0, 0, 0);
    date.setHours(date.getHours() + (3 - date.getTimezoneOffset() / 60));
  }

  const dateResponse = date.toLocaleDateString("pt-br", {
    timeZone: "America/Sao_Paulo",
  });

  return { date, brasil: dateResponse };
};
