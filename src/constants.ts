export const CURRENT_DATETIME = '2025-02-09 07:50:57';
export const CURRENT_USER = 'lnfinitl';

export const DOCUMENT_STATUSES = {
  draft: {
    label: 'Чернетка',
    variant: 'warning'
  },
  confirmed: {
    label: 'Проведено',
    variant: 'success'
  },
  canceled: {
    label: 'Скасовано',
    variant: 'danger'
  }
} as const;

export const PAYMENT_METHODS = {
  cash: {
    label: 'Готівка',
    icon: 'cash'
  },
  cashless: {
    label: 'Безготівковий',
    icon: 'credit-card'
  }
} as const;

export const FREQUENCIES = {
  once: {
    label: 'Одноразово',
    icon: '1-circle'
  },
  monthly: {
    label: 'Щомісяця',
    icon: 'calendar-month'
  },
  quarterly: {
    label: 'Щокварталу',
    icon: 'calendar3'
  },
  yearly: {
    label: 'Щороку',
    icon: 'calendar-year'
  }
} as const;

export const DOCUMENT_TYPES = {
  bank: {
    label: 'Банківська операція',
    icon: 'bank',
    prefix: 'БО',
    categories: {
      income: { label: 'Надходження', icon: 'arrow-down' },
      expense: { label: 'Видаток', icon: 'arrow-up' },
      transfer: { label: 'Переміщення', icon: 'arrow-left-right' }
    }
  },
  expenses: {
    label: 'Витрати',
    icon: 'cart',
    prefix: 'ВД',
    categories: {
      office: { label: 'Офіс', icon: 'building' },
      rent: { label: 'Оренда', icon: 'house' },
      utilities: { label: 'Комунальні послуги', icon: 'lightning' },
      transport: { label: 'Транспорт', icon: 'truck' },
      software: { label: 'Програмне забезпечення', icon: 'pc-display' },
      services: { label: 'Послуги', icon: 'gear' }
    }
  },
  monthlyExpenses: {
    label: 'Щомісячні витрати',
    icon: 'calendar',
    prefix: 'ЩВ',
    categories: {
      rent: { label: 'Оренда', icon: 'house' },
      utilities: { label: 'Комунальні послуги', icon: 'lightning' },
      software: { label: 'Програмне забезпечення', icon: 'pc-display' },
      services: { label: 'Послуги', icon: 'gear' }
    }
  },
  salary: {
    label: 'Зарплата',
    icon: 'person',
    prefix: 'ЗП',
    categories: {
      salary: { label: 'Зарплата', icon: 'cash-stack' },
      advance: { label: 'Аванс', icon: 'cash' },
      bonus: { label: 'Премія', icon: 'gift' }
    }
  }
} as const;