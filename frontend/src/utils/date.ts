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

export const months: { [key: number]: string } = {
  1: "leden",
  2: "únor",
  3: "březen",
  4: "duben",
  5: "květen",
  6: "červen",
  7: "červenec",
  8: "srpen",
  9: "září",
  10: "říjen",
  11: "listopad",
  12: "prosinec",
};

export const formatToPrettyDate = (d: string) => {
  const date = d.split("-");

  const month = date[1];
  const day = Number(date[2]);
  return `${day}. ${months[Number(month)]}`;
};
