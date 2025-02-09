import { Document } from '../types';

export const initialDocuments: Document[] = [
  {
    id: 'bank-1',
    type: 'bank',
    number: 'B-000001',
    date: '2025-02-09',
    description: 'Надходження коштів від клієнта',
    amount: 15000,
    category: 'income',
    recipient: 'ТОВ "Клієнт"',
    accountFrom: '26000000000001',
    accountTo: '26000000000002',
    status: 'confirmed',
    createdBy: 'lnfinitl',
    createdAt: '2025-02-09 10:13:31'
  },
  {
    id: 'expenses-1',
    type: 'expenses',
    number: 'E-000001',
    date: '2025-02-09',
    description: 'Оплата оренди офісу',
    amount: 12000,
    category: 'rent',
    paymentMethod: 'cashless',
    status: 'confirmed',
    createdBy: 'lnfinitl',
    createdAt: '2025-02-09 10:13:31'
  },
  {
    id: 'salary-1',
    type: 'salary',
    number: 'S-000001',
    date: '2025-02-09',
    description: 'Зарплата за січень 2025',
    amount: 25000,
    category: 'salary',
    recipient: 'Петренко Петро',
    status: 'draft',
    createdBy: 'lnfinitl',
    createdAt: '2025-02-09 10:13:31'
  }
];

export const bankDocuments = initialDocuments.filter(doc => doc.type === 'bank');
export const expenseDocuments = initialDocuments.filter(doc => doc.type === 'expenses');
export const salaryDocuments = initialDocuments.filter(doc => doc.type === 'salary');