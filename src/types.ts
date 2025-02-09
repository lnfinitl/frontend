import { ChipProps } from '@mui/material';

export type DocumentType = 'bank' | 'expenses' | 'salary';
export type DocumentStatus = 'draft' | 'confirmed' | 'canceled';
export type BankCategory = 'income' | 'expense' | 'transfer';
export type ExpenseCategory = 'office' | 'rent' | 'utilities' | 'transport' | 'software' | 'services';
export type SalaryCategory = 'salary' | 'advance' | 'bonus';
export type PaymentMethod = 'cash' | 'cashless';

export interface BaseDocument {
  id: string;
  type: DocumentType;
  number: string;
  date: string;
  description: string;
  amount: number;
  status: DocumentStatus;
  createdBy: string;
  createdAt: string;
  modifiedBy?: string;
  modifiedAt?: string;
}

export interface BankDocument extends BaseDocument {
  type: 'bank';
  category: BankCategory;
  recipient: string;
  accountFrom: string;
  accountTo: string;
}

export interface ExpenseDocument extends BaseDocument {
  type: 'expenses';
  category: ExpenseCategory;
  paymentMethod: PaymentMethod;
}

export interface SalaryDocument extends BaseDocument {
  type: 'salary';
  category: SalaryCategory;
  recipient: string;
}

export type Document = BankDocument | ExpenseDocument | SalaryDocument;

export const STATUS_CONFIG: Record<DocumentStatus, { color: ChipProps['color']; label: string }> = {
  draft: { color: 'default', label: 'Чернетка' },
  confirmed: { color: 'success', label: 'Підтверджено' },
  canceled: { color: 'error', label: 'Скасовано' },
};

export const APP_CONFIG = {
  CURRENT_USER: 'lnfinitl',
  CURRENT_DATETIME: '2025-02-09 10:11:15',
  DEFAULT_PAGE_SIZE: 10,
  PAGE_SIZE_OPTIONS: [5, 10, 20, 50] as number[],
  DATE_FORMAT: 'dd.MM.yyyy',
  DATETIME_FORMAT: 'dd.MM.yyyy HH:mm',
  CURRENCY: 'UAH',
  LOCALE: 'uk-UA',
  CURRENCY_FORMAT: {
    style: 'currency',
    currency: 'UAH',
    minimumFractionDigits: 2,
    maximumFractionDigits: 2
  }
} as const;