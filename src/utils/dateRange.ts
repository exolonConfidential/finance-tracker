const formatLocalDate = (date: Date) => {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
};

export const getDateRange = (
  range: "THIS_MONTH" | "LAST_MONTH" | "LAST_3_MONTHS",
) => {
  const today = new Date();

  if (range === "THIS_MONTH") {
    const start = new Date(today.getFullYear(), today.getMonth(), 1);
    return {
      startDate: formatLocalDate(start),
      endDate: formatLocalDate(today),
    };
  }

  if (range === "LAST_MONTH") {
    const start = new Date(today.getFullYear(), today.getMonth() - 1, 1);
    const end = new Date(today.getFullYear(), today.getMonth(), 0);
    return {
      startDate: formatLocalDate(start),
      endDate: formatLocalDate(end),
    };
  }

  if (range === "LAST_3_MONTHS") {
    const start = new Date(today.getFullYear(), today.getMonth() - 3, 1);
    return {
      startDate: formatLocalDate(start),
      endDate: formatLocalDate(today),
    };
  }

  return { startDate: "", endDate: "" };
};
