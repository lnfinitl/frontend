export const isValidIBAN = (iban: string): boolean => {
  // Спрощена перевірка для українського IBAN
  const ibanRegex = /^UA\d{27}$/;
  return ibanRegex.test(iban.replace(/\s/g, ''));
};

export const isValidAmount = (amount: number): boolean => {
  return amount > 0 && amount <= 999999999.99;
};

export const isValidDate = (dateString: string): boolean => {
  const date = new Date(dateString);
  return date instanceof Date && !isNaN(date.getTime());
};

export const isValidDocumentNumber = (number: string): boolean => {
  // Перевірка формату номера документа (наприклад: БП-000001)
  const numberRegex = /^[А-ЯІЇЄ]{2}-\d{6}$/;
  return numberRegex.test(number);
};