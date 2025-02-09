import React, { useState, useCallback } from 'react';
import {
  DataGrid,
  GridColDef,
  GridToolbar,
  GridToolbarContainer,
  GridToolbarFilterButton,
  GridToolbarExport,
  GridToolbarQuickFilter,
} from '@mui/x-data-grid';
import { Button, IconButton, Chip } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import CancelIcon from '@mui/icons-material/Cancel';
import { Document, DocumentType, DocumentStatus, STATUS_CONFIG, APP_CONFIG } from '../../types';
import { DocumentForm, DocumentFormData } from './DocumentForm';
import './DocumentList.scss';

interface DocumentListProps {
  title: string;
  documentType: DocumentType;
  columns: GridColDef[];
  initialDocuments?: Document[];
}

const CustomToolbar = () => (
  <GridToolbarContainer>
    <GridToolbarFilterButton />
    <GridToolbarExport />
    <GridToolbarQuickFilter />
  </GridToolbarContainer>
);

export const DocumentList: React.FC<DocumentListProps> = ({
  title,
  documentType,
  columns,
  initialDocuments = [],
}) => {
  const [documents, setDocuments] = useState<Document[]>(initialDocuments);
  const [editingDocument, setEditingDocument] = useState<Document | null>(null);
  const [showForm, setShowForm] = useState(false);

  const handleCreateDocument = useCallback((newDoc: DocumentFormData) => {
    const doc: Document = {
      ...newDoc,
      id: `${documentType}-${documents.length + 1}`,
      number: `${documentType.charAt(0).toUpperCase()}-${String(documents.length + 1).padStart(6, '0')}`,
      status: 'draft',
      createdBy: APP_CONFIG.CURRENT_USER,
      createdAt: APP_CONFIG.CURRENT_DATETIME,
    } as Document;

    setDocuments(prev => [...prev, doc]);
    setShowForm(false);
  }, [documents, documentType]);

  const handleEditDocument = useCallback((updatedDoc: DocumentFormData) => {
    if (!editingDocument) return;

    const doc: Document = {
      ...editingDocument,
      ...updatedDoc,
      modifiedBy: APP_CONFIG.CURRENT_USER,
      modifiedAt: APP_CONFIG.CURRENT_DATETIME,
    } as Document;

    setDocuments(prev =>
      prev.map(d => (d.id === editingDocument.id ? doc : d))
    );
    setEditingDocument(null);
    setShowForm(false);
  }, [editingDocument]);

  const handleDeleteDocument = useCallback((id: string) => {
    setDocuments(prev => prev.filter(doc => doc.id !== id));
  }, []);

  const handleConfirmDocument = useCallback((id: string) => {
    setDocuments(prev =>
      prev.map(doc =>
        doc.id === id
          ? {
              ...doc,
              status: 'confirmed' as DocumentStatus,
              modifiedBy: APP_CONFIG.CURRENT_USER,
              modifiedAt: APP_CONFIG.CURRENT_DATETIME,
            }
          : doc
      )
    );
  }, []);

  const handleCancelDocument = useCallback((id: string) => {
    setDocuments(prev =>
      prev.map(doc =>
        doc.id === id
          ? {
              ...doc,
              status: 'canceled' as DocumentStatus,
              modifiedBy: APP_CONFIG.CURRENT_USER,
              modifiedAt: APP_CONFIG.CURRENT_DATETIME,
            }
          : doc
      )
    );
  }, []);

  const enhancedColumns: GridColDef[] = [
    ...columns,
    {
      field: 'status',
      headerName: 'Статус',
      width: 120,
      renderCell: (params) => {
        const status = params.value as DocumentStatus;
        return (
          <Chip
            label={STATUS_CONFIG[status].label}
            color={STATUS_CONFIG[status].color}
            size="small"
          />
        );
      },
    },
    {
      field: 'actions',
      headerName: 'Дії',
      width: 200,
      sortable: false,
      renderCell: (params) => {
        const isEditable = params.row.status === 'draft';
        return (
          <div>
            {isEditable && (
              <>
                <IconButton
                  size="small"
                  onClick={() => {
                    setEditingDocument(params.row);
                    setShowForm(true);
                  }}
                >
                  <EditIcon />
                </IconButton>
                <IconButton
                  size="small"
                  onClick={() => handleDeleteDocument(params.row.id)}
                >
                  <DeleteIcon />
                </IconButton>
                <IconButton
                  size="small"
                  onClick={() => handleConfirmDocument(params.row.id)}
                >
                  <CheckCircleIcon />
                </IconButton>
              </>
            )}
            {params.row.status === 'confirmed' && (
              <IconButton
                size="small"
                onClick={() => handleCancelDocument(params.row.id)}
              >
                <CancelIcon />
              </IconButton>
            )}
          </div>
        );
      },
    },
  ];

  return (
    <div>
      <h1>{title}</h1>
      <Button
        variant="contained"
        startIcon={<AddIcon />}
        onClick={() => setShowForm(true)}
        sx={{ mb: 2 }}
      >
        Створити
      </Button>
      <DocumentForm
        show={showForm}
        onHide={() => {
          setShowForm(false);
          setEditingDocument(null);
        }}
        onSubmit={editingDocument ? handleEditDocument : handleCreateDocument}
        documentType={documentType}
        initialData={editingDocument || undefined}
        isEdit={!!editingDocument}
      />
      <DataGrid
        rows={documents}
        columns={enhancedColumns}
        initialState={{
          pagination: {
            paginationModel: { page: 0, pageSize: APP_CONFIG.DEFAULT_PAGE_SIZE },
          },
        }}
        pageSizeOptions={APP_CONFIG.PAGE_SIZE_OPTIONS}
        slots={{
          toolbar: CustomToolbar,
        }}
        autoHeight
      />
    </div>
  );
};