import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { BankDocumentList } from './components/documents/BankDocumentList';
import { ExpensesDocumentList } from './components/documents/ExpensesDocumentList';
import { SalaryDocumentList } from './components/documents/SalaryDocumentList';
import { Analytics } from './components/analytics/Analytics';

export const AppRoutes: React.FC = () => {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/bank" replace />} />
      <Route path="/bank" element={<BankDocumentList />} />
      <Route path="/expenses" element={<ExpensesDocumentList />} />
      <Route path="/salary" element={<SalaryDocumentList />} />
      <Route path="/analytics" element={<Analytics />} />
    </Routes>
  );
};