export const filterDocumentsByDate = (documents: any[], startDate: string, endDate: string) => {
  return documents.filter(doc => {
    const docDate = new Date(doc.date);
    return docDate >= new Date(startDate) && docDate <= new Date(endDate);
  });
};

export const filterDocumentsByStatus = (documents: any[], status: string) => {
  return documents.filter(doc => doc.status === status);
};

export const filterDocumentsByCategory = (documents: any[], category: string) => {
  return documents.filter(doc => doc.category === category);
};

export const searchDocuments = (documents: any[], searchTerm: string) => {
  const term = searchTerm.toLowerCase();
  return documents.filter(doc => 
    doc.number.toLowerCase().includes(term) ||
    doc.description.toLowerCase().includes(term) ||
    (doc.recipient && doc.recipient.toLowerCase().includes(term))
  );
};