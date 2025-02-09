import React from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
  Grid,
  InputAdornment,
  MenuItem,
  FormControl,
  InputLabel,
  Select,
  CircularProgress,
} from '@mui/material';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { Document, DocumentType } from '../../types';
import './DocumentForm.scss';

export interface DocumentFormData {
  date: string;
  number: string;
  company?: string;
  amount: number;
  purpose?: string;
  accountNumber?: string;
  category?: string;
  objectCode?: string;
  vat?: number;
  charity?: number;
  createdBy: string;
  createdAt: string;
  status: string;
}

const bankValidationSchema = Yup.object({
  date: Yup.string().required('Обов\'язкове поле'),
  number: Yup.string().required('Обов\'язкове поле'),
  company: Yup.string().required('Обов\'язкове поле'),
  amount: Yup.number().required('Обов\'язкове поле').min(0, 'Сума має бути більше 0'),
  purpose: Yup.string().required('Обов\'язкове поле'),
  accountNumber: Yup.string().required('Обов\'язкове поле'),
  category: Yup.string().required('Обов\'язкове поле'),
  objectCode: Yup.string().required('Обов\'язкове поле'),
  vat: Yup.number().min(0, 'ПДВ має бути більше або рівне 0'),
  charity: Yup.number().min(0, 'Сума благодійності має бути більше або рівне 0')
});

interface DocumentFormProps {
  show: boolean;
  onHide: () => void;
  onSubmit: (data: DocumentFormData) => void;
  documentType: DocumentType;
  initialData?: Partial<Document>;
  isEdit?: boolean;
  objects: Array<{id: string, name: string}>;
  categories: Array<{id: string, name: string}>;
  loading?: boolean;
}

export const DocumentForm: React.FC<DocumentFormProps> = ({
  show,
  onHide,
  onSubmit,
  documentType,
  initialData,
  isEdit = false,
  objects,
  categories,
  loading = false,
}) => {
  const formik = useFormik<DocumentFormData>({
    initialValues: {
      date: initialData?.date || '2025-02-09',
      number: initialData?.number || '',
      company: initialData?.company || '',
      amount: initialData?.amount || 0,
      purpose: initialData?.purpose || '',
      accountNumber: initialData?.accountNumber || '',
      category: initialData?.category || '',
      objectCode: initialData?.objectCode || '',
      vat: initialData?.vat || 0,
      charity: initialData?.charity || 0,
      createdBy: initialData?.createdBy || 'lnfinitl',
      createdAt: initialData?.createdAt || '2025-02-09 16:03:28',
      status: initialData?.status || 'draft'
    },
    validationSchema: documentType === 'bank' ? bankValidationSchema : undefined,
    onSubmit,
  });

  return (
    <Dialog 
      open={show} 
      onClose={onHide} 
      maxWidth="sm"
      fullWidth 
      className="document-form"
    >
      <DialogTitle>
        {isEdit ? 'Редагувати документ' : 'Новий документ'}
      </DialogTitle>
      <DialogContent>
        <form id="document-form" onSubmit={formik.handleSubmit}>
          {loading ? (
            <div className="loading-container">
              <CircularProgress />
            </div>
          ) : (
            <Grid container spacing={1.5}>
              {/* Перший рядок: ДАТА, П/Д №, РАХ.№ */}
              <Grid item container spacing={1.5} xs={12}>
                <Grid item xs={4}>
                  <TextField
                    fullWidth
                    size="small"
                    name="date"
                    label="ДАТА"
                    type="date"
                    value={formik.values.date}
                    onChange={formik.handleChange}
                    error={formik.touched.date && Boolean(formik.errors.date)}
                    helperText={formik.touched.date && formik.errors.date as string}
                    InputLabelProps={{ shrink: true }}
                    disabled={loading}
                  />
                </Grid>
                <Grid item xs={4}>
                  <TextField
                    fullWidth
                    size="small"
                    name="number"
                    label="№ П/Д"
                    value={formik.values.number}
                    onChange={formik.handleChange}
                    error={formik.touched.number && Boolean(formik.errors.number)}
                    helperText={formik.touched.number && formik.errors.number as string}
                    disabled={loading}
                  />
                </Grid>
                <Grid item xs={4}>
                  <TextField
                    fullWidth
                    size="small"
                    name="accountNumber"
                    label="РАХ.№"
                    value={formik.values.accountNumber}
                    onChange={formik.handleChange}
                    error={formik.touched.accountNumber && Boolean(formik.errors.accountNumber)}
                    helperText={formik.touched.accountNumber && formik.errors.accountNumber as string}
                    disabled={loading}
                  />
                </Grid>
              </Grid>

              {/* Другий рядок: СУМА, БЛАГОДІЙНІСТЬ, ПДВ */}
              <Grid item container spacing={1.5} xs={12}>
                <Grid item xs={4}>
                  <TextField
                    fullWidth
                    size="small"
                    name="amount"
                    label="СУМА"
                    type="number"
                    value={formik.values.amount}
                    onChange={formik.handleChange}
                    error={formik.touched.amount && Boolean(formik.errors.amount)}
                    helperText={formik.touched.amount && formik.errors.amount as string}
                    InputProps={{
                      endAdornment: <InputAdornment position="end">грн</InputAdornment>,
                    }}
                    disabled={loading}
                  />
                </Grid>
                <Grid item xs={4}>
                  <TextField
                    fullWidth
                    size="small"
                    name="charity"
                    label="БЛАГОДІЙНІСТЬ"
                    type="number"
                    value={formik.values.charity}
                    onChange={formik.handleChange}
                    error={formik.touched.charity && Boolean(formik.errors.charity)}
                    helperText={formik.touched.charity && formik.errors.charity as string}
                    InputProps={{
                      endAdornment: <InputAdornment position="end">грн</InputAdornment>,
                    }}
                    disabled={loading}
                  />
                </Grid>
                <Grid item xs={4}>
                  <TextField
                    fullWidth
                    size="small"
                    name="vat"
                    label="ПДВ"
                    type="number"
                    value={formik.values.vat}
                    onChange={formik.handleChange}
                    error={formik.touched.vat && Boolean(formik.errors.vat)}
                    helperText={formik.touched.vat && formik.errors.vat as string}
                    InputProps={{
                      endAdornment: <InputAdornment position="end">грн</InputAdornment>,
                    }}
                    disabled={loading}
                  />
                </Grid>
              </Grid>

              {/* Третій рядок: ПІДПРИЄМСТВО, ПРИЗНАЧЕННЯ */}
              <Grid item container spacing={1.5} xs={12}>
                <Grid item xs={5}>
                  <TextField
                    fullWidth
                    size="small"
                    name="company"
                    label="ПІДПРИЄМСТВО"
                    value={formik.values.company}
                    onChange={formik.handleChange}
                    error={formik.touched.company && Boolean(formik.errors.company)}
                    helperText={formik.touched.company && formik.errors.company as string}
                    disabled={loading}
                  />
                </Grid>
                <Grid item xs={7}>
                  <TextField
                    fullWidth
                    size="small"
                    name="purpose"
                    label="ПРИЗНАЧЕННЯ"
                    value={formik.values.purpose}
                    onChange={formik.handleChange}
                    error={formik.touched.purpose && Boolean(formik.errors.purpose)}
                    helperText={formik.touched.purpose && formik.errors.purpose as string}
                    disabled={loading}
                  />
                </Grid>
              </Grid>

              {/* Четвертий рядок: ОБ'ЄКТ, КАТЕГОРІЯ */}
              <Grid item container spacing={1.5} xs={12}>
                <Grid item xs={6}>
                  <FormControl fullWidth size="small" disabled={loading}>
                    <InputLabel>ОБ'ЄКТ</InputLabel>
                    <Select
                      name="objectCode"
                      value={formik.values.objectCode}
                      onChange={formik.handleChange}
                      error={formik.touched.objectCode && Boolean(formik.errors.objectCode)}
                      label="ОБ'ЄКТ"
                    >
                      {objects.map(obj => (
                        <MenuItem key={obj.id} value={obj.id}>{obj.name}</MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                </Grid>
                <Grid item xs={6}>
                  <FormControl fullWidth size="small" disabled={loading}>
                    <InputLabel>КАТЕГОРІЯ</InputLabel>
                    <Select
                      name="category"
                      value={formik.values.category}
                      onChange={formik.handleChange}
                      error={formik.touched.category && Boolean(formik.errors.category)}
                      label="КАТЕГОРІЯ"
                    >
                      {categories.map(cat => (
                        <MenuItem key={cat.id} value={cat.id}>{cat.name}</MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                </Grid>
              </Grid>
            </Grid>
          )}
        </form>
      </DialogContent>
      <DialogActions>
        <Button onClick={onHide} disabled={loading}>
          Скасувати
        </Button>
        <Button 
          type="submit" 
          form="document-form" 
          variant="contained" 
          color="primary"
          disabled={loading}
        >
          {isEdit ? 'Зберегти' : 'Створити'}
        </Button>
      </DialogActions>
    </Dialog>
  );
};