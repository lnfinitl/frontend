import React, { useState } from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Grid,
} from '@mui/material';
import { 
  Document,
  DocumentType,
  BankDocument,
  ExpenseDocument,
  SalaryDocument,
  BankCategory,
  ExpenseCategory,
  SalaryCategory,
  PaymentMethod
} from '../../types';

export interface DocumentFormData {
  id?: string;
  type: DocumentType;
  number?: string;
  date: string;
  description: string;
  amount: number;
  category?: BankCategory | ExpenseCategory | SalaryCategory;
  paymentMethod?: PaymentMethod;
  recipient?: string;
  accountFrom?: string;
  accountTo?: string;
}

interface DocumentFormProps {
  show: boolean;
  onHide: () => void;
  onSubmit: (data: DocumentFormData) => void;
  documentType: DocumentType;
  initialData?: Partial<Document>;
  isEdit?: boolean;
}

export const DocumentForm: React.FC<DocumentFormProps> = ({
  show,
  onHide,
  onSubmit,
  documentType,
  initialData,
  isEdit = false,
}) => {
  const [formData, setFormData] = useState<DocumentFormData>(() => ({
    type: documentType,
    date: new Date().toISOString().split('T')[0],
    description: '',
    amount: 0,
    ...initialData,
  }));

  const handleChange = (name: string, value: any) => {
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  const renderBankFields = () => {
    return (
      <>
        <Grid item xs={12}>
          <FormControl fullWidth>
            <InputLabel>Категорія</InputLabel>
            <Select
              value={formData.category || ''}
              onChange={(e) => handleChange('category', e.target.value)}
              label="Категорія"
            >
              <MenuItem value="income">Надходження</MenuItem>
              <MenuItem value="expense">Витрата</MenuItem>
              <MenuItem value="transfer">Переказ</MenuItem>
            </Select>
          </FormControl>
        </Grid>
        <Grid item xs={12}>
          <TextField
            fullWidth
            label="Контрагент"
            value={formData.recipient || ''}
            onChange={(e) => handleChange('recipient', e.target.value)}
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            fullWidth
            label="Рахунок (з)"
            value={formData.accountFrom || ''}
            onChange={(e) => handleChange('accountFrom', e.target.value)}
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            fullWidth
            label="Рахунок (на)"
            value={formData.accountTo || ''}
            onChange={(e) => handleChange('accountTo', e.target.value)}
          />
        </Grid>
      </>
    );
  };

  const renderExpenseFields = () => {
    return (
      <>
        <Grid item xs={12}>
          <FormControl fullWidth>
            <InputLabel>Категорія</InputLabel>
            <Select
              value={formData.category || ''}
              onChange={(e) => handleChange('category', e.target.value)}
              label="Категорія"
            >
              <MenuItem value="office">Офіс</MenuItem>
              <MenuItem value="rent">Оренда</MenuItem>
              <MenuItem value="utilities">Комунальні послуги</MenuItem>
              <MenuItem value="transport">Транспорт</MenuItem>
              <MenuItem value="software">Програмне забезпечення</MenuItem>
              <MenuItem value="services">Послуги</MenuItem>
            </Select>
          </FormControl>
        </Grid>
        <Grid item xs={12}>
          <FormControl fullWidth>
            <InputLabel>Спосіб оплати</InputLabel>
            <Select
              value={formData.paymentMethod || ''}
              onChange={(e) => handleChange('paymentMethod', e.target.value)}
              label="Спосіб оплати"
            >
              <MenuItem value="cash">Готівка</MenuItem>
              <MenuItem value="cashless">Безготівковий</MenuItem>
            </Select>
          </FormControl>
        </Grid>
      </>
    );
  };

  const renderSalaryFields = () => {
    return (
      <>
        <Grid item xs={12}>
          <FormControl fullWidth>
            <InputLabel>Категорія</InputLabel>
            <Select
              value={formData.category || ''}
              onChange={(e) => handleChange('category', e.target.value)}
              label="Категорія"
            >
              <MenuItem value="salary">Зарплата</MenuItem>
              <MenuItem value="advance">Аванс</MenuItem>
              <MenuItem value="bonus">Премія</MenuItem>
            </Select>
          </FormControl>
        </Grid>
        <Grid item xs={12}>
          <TextField
            fullWidth
            label="Співробітник"
            value={formData.recipient || ''}
            onChange={(e) => handleChange('recipient', e.target.value)}
          />
        </Grid>
      </>
    );
  };

  return (
    <Dialog open={show} onClose={onHide} maxWidth="sm" fullWidth>
      <form onSubmit={handleSubmit}>
        <DialogTitle>
          {isEdit ? 'Редагувати документ' : 'Новий документ'}
        </DialogTitle>
        <DialogContent>
          <Grid container spacing={2} sx={{ mt: 1 }}>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Дата"
                type="date"
                value={formData.date}
                onChange={(e) => handleChange('date', e.target.value)}
                InputLabelProps={{ shrink: true }}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Опис"
                value={formData.description}
                onChange={(e) => handleChange('description', e.target.value)}
                multiline
                rows={2}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Сума"
                type="number"
                value={formData.amount}
                onChange={(e) => handleChange('amount', parseFloat(e.target.value) || 0)}
                InputProps={{
                  inputProps: { min: 0 }
                }}
              />
            </Grid>
            {documentType === 'bank' && renderBankFields()}
            {documentType === 'expenses' && renderExpenseFields()}
            {documentType === 'salary' && renderSalaryFields()}
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button onClick={onHide}>Скасувати</Button>
          <Button type="submit" variant="contained" color="primary">
            {isEdit ? 'Зберегти' : 'Створити'}
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  );
};