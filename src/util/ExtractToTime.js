import moment from "moment-timezone";

export const extractToTime = (seconds) => {
  const days = `${moment("2024-08-17T00:00:00-03:00").diff(
    moment(),
    "days"
  )}`;
  const hour = `${(parseInt((seconds / 60) / 60) % 24)}`;
  const min = `0${parseInt((seconds / 60) % 60)}`.slice(-2);
  const sec = `0${parseInt(seconds % 60)}`.slice(-2);

  return { days, hour, min, sec };
};
