interface TotalsByCategory {
  [category: string]: number;
}

export const calculateTotalsByCategory = (documents: any[]): TotalsByCategory => {
  return documents.reduce((acc: TotalsByCategory, doc) => {
    if (doc.category && doc.amount) {
      acc[doc.category] = (acc[doc.category] || 0) + doc.amount;
    }
    return acc;
  }, {});
};

export const calculateMonthlyTotals = (documents: any[]): { income: number; expenses: number } => {
  return documents.reduce(
    (acc, doc) => {
      if (doc.type === 'bank') {
        if (doc.category === 'income') {
          acc.income += doc.amount;
        } else if (doc.category === 'expense') {
          acc.expenses += doc.amount;
        }
      }
      return acc;
    },
    { income: 0, expenses: 0 }
  );
};

export const calculateBalance = (documents: any[]): number => {
  const { income, expenses } = calculateMonthlyTotals(documents);
  return income - expenses;
};