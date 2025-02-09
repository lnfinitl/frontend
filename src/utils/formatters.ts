import { format } from 'date-fns';
import { uk } from 'date-fns/locale';
import { APP_CONFIG } from '../types';

export const formatDate = (date: string) => {
  return format(new Date(date), APP_CONFIG.DATE_FORMAT, { locale: uk });
};

export const formatDateTime = (date: string) => {
  return format(new Date(date), APP_CONFIG.DATETIME_FORMAT, { locale: uk });
};

export const formatCurrency = (amount: number) => {
  return new Intl.NumberFormat(APP_CONFIG.LOCALE, APP_CONFIG.CURRENCY_FORMAT).format(amount);
};