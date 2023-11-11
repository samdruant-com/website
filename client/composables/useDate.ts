import Dayjs from 'dayjs';

const DEFAULT_LOCALE = 'en';
const DEFAULT_TIMEFORMAT = 'HH:mm';
const DEFAULT_DATEFORMAT = 'DD-MM-YYYY';

interface DateConfig {
  locale?: string;
  timeFormat?: string;
  dateFormat?: string;
}

export function useDate() {
  function getDateFromTimestamp(timestamp: number, config?: DateConfig): string {
		return Dayjs(timestamp).format(config?.dateFormat || DEFAULT_DATEFORMAT);
	}

  function getTimeFromTimestamp(timestamp: number, config?: DateConfig): string {
    return Dayjs(timestamp).locale(config?.locale || DEFAULT_LOCALE).format(config?.timeFormat || DEFAULT_TIMEFORMAT);
  }

  function getTimestampFromDate(date: string, config?: DateConfig): number {
    return Dayjs(date).unix();
  }

	return {
		getDateFromTimestamp,
    getTimeFromTimestamp,
    getTimestampFromDate
	};
}
