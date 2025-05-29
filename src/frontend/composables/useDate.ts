import Dayjs from "dayjs";

const DEFAULT_LOCALE = "en";
const DEFAULT_TIMEFORMAT = "HH:mm";
const DEFAULT_DATEFORMAT = "DD-MM-YYYY";

interface DateConfig {
  locale?: string
  timeFormat?: string
  dateFormat?: string
}

export function useDate() {
  function getDateFromTimestamp(timestamp: number, config?: DateConfig): string {
    return Dayjs(timestamp).format(config?.dateFormat || DEFAULT_DATEFORMAT);
  }

  function getTimeFromTimestamp(timestamp: number, config?: DateConfig): string {
    return Dayjs(timestamp).locale(config?.locale || DEFAULT_LOCALE).format(config?.timeFormat || DEFAULT_TIMEFORMAT);
  }

  function getTimestampFromDate(date: string): number {
    return Dayjs(date).unix();
  }

  function convertDateTimeToUnix(dateTime: { date: string, time: string }): number {
    const [hour, minute] = dateTime.time.split(":");
    return hour && minute
      ? Dayjs(dateTime.date).hour(Number(hour)).minute(Number(minute)).unix()
      : Dayjs(dateTime.date).unix();
  }

  function convertUnixToDateTime(unix: number | string): {
    date: string
    time: string
  } {
    if (typeof unix === "string") {
      unix = Number(unix);
    }

    const date = Dayjs.unix(unix);
    return {
      date: date.format("YYYY-MM-DD"),
      time: date.format("HH:mm")
    };
  }

  return {
    getDateFromTimestamp,
    getTimeFromTimestamp,
    getTimestampFromDate,
    convertUnixToDateTime,
    convertDateTimeToUnix
  };
}
