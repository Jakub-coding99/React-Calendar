export const findFirstDay = (year: number, month: number) => {
  let startingDay = new Date(year, month - 1, 1).getDay(); //month = 2
  if (startingDay == 0) startingDay = 7;

  return startingDay;
};

export const formatDate = (currentDate: Date) => {
  const today = `${String(currentDate.getFullYear())}-${String(
    currentDate.getMonth() + 1,
  ).padStart(2, "0")}-${String(currentDate.getDate()).padStart(2, "0")}`;
  return today;
};

export const formatDateToDT = (year: number, month: number, day: number) => {
  return `${year}-${String(month).padStart(2, "0")}-${String(day).padStart(2, "0")}`;
};
