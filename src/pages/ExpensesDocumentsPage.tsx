import React from 'react';
import { DocumentList } from '../components/documents/DocumentList';
import { GridColDef } from '@mui/x-data-grid';
import { formatDate, formatCurrency } from '../utils/formatters';

const columns: GridColDef[] = [
  { field: 'number', headerName: 'Номер', width: 130 },
  { 
    field: 'date', 
    headerName: 'Дата', 
    width: 130,
    valueFormatter: (params) => formatDate(params.value)
  },
  { field: 'description', headerName: 'Опис', width: 200 },
  { 
    field: 'amount', 
    headerName: 'Сума', 
    width: 130,
    valueFormatter: (params) => formatCurrency(params.value)
  },
  { field: 'category', headerName: 'Категорія', width: 130 },
  { field: 'paymentMethod', headerName: 'Спосіб оплати', width: 150 }
];

export const ExpensesDocumentsPage: React.FC = () => {
  return (
    <DocumentList
      title="Витрати"
      documentType="expenses"
      columns={columns}
      initialDocuments={[]}
    />
  );
};