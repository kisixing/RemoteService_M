import moment from 'moment';

export const formatTimeToStandard = (date: any, format = 'YYYY-MM-DD H:mm:ss') =>
  moment(date).format(format);
