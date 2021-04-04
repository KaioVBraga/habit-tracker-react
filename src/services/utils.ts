export const getUser = () => {
  const habit_user = localStorage.getItem("habit_user") as string;
  const user = JSON.parse(habit_user);
  return user;
};

export const handleTimezone = (inDate: any) => {
  const date = new Date(inDate);

  const dateResponse = date.toLocaleDateString("pt-br", {
    timeZone: "America/Sao_Paulo",
  });

  return { date, brasil: dateResponse };
};
