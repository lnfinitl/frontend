export type DocumentType = 'bank' | 'expenses' | 'monthly-expenses' | 'salary';

export type DocumentStatus = 'draft' | 'confirmed' | 'canceled';

export interface Column {
  key: string;
  label: string;
}

export interface Document {
  id: string;
  number: string;
  date: string;
  type: DocumentType;
  description: string;
  amount: number;
  status: DocumentStatus;
  category?: string;
  paymentMethod?: string;
  recipient?: string;
  frequency?: 'once' | 'monthly' | 'quarterly' | 'yearly';
  accountFrom?: string;
  accountTo?: string;
  createdBy: string;
  createdAt: string;
  modifiedBy?: string;
  modifiedAt?: string;
}

export interface DocumentListProps {
  title: string;
  documentType: DocumentType;
  columns?: Column[];
  formatValue?: (key: string, value: any) => any;
  initialDocuments?: Document[];
}

export interface DocumentFormProps {
  show: boolean;
  onHide: () => void;
  onSave: (document: Partial<Document>) => void;
  documentType: DocumentType;
  initialData?: Partial<Document>;
  isEdit?: boolean;
}