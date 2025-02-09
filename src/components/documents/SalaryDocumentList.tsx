import React from 'react';
import { DocumentList } from './DocumentList';
import { salaryDocuments } from '../../mocks/initialData';
import { GridColDef } from '@mui/x-data-grid';
import { formatDate, formatCurrency } from '../../utils/formatters';

const customColumns: GridColDef[] = [
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
  { field: 'recipient', headerName: 'Співробітник', width: 200 }
];

export const SalaryDocumentList: React.FC = () => {
  return (
    <DocumentList
      title="Зарплата"
      documentType="salary"
      columns={customColumns}
      initialDocuments={salaryDocuments}
    />
  );
};