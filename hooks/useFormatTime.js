import { format } from "date-fns";

export const formatDate = (timestamp) => {
  if (!timestamp) {
    return "";
  }

  const date = new Date(timestamp);

  if (isNaN(date.getTime())) {
    return "";
  }

  return format(date, "HH:mm:ss, dd/MM/yyyy");
};

export const formatGetDay = (timestamp) => {
  if (!timestamp) {
    return "";
  }

  const date = new Date(timestamp);

  if (isNaN(date.getTime())) {
    return "";
  }

  return format(date, "dd");
};

export const formatGetMonth = (timestamp) => {
  if (!timestamp) {
    return "";
  }

  const date = new Date(timestamp);

  if (isNaN(date.getTime())) {
    return "";
  }

  return format(date, "MM");
};
