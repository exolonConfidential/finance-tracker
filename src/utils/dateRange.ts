export const getDateRange = (range: 'THIS_MONTH' | 'LAST_MONTH' | 'LAST_3_MONTHS') => {
  const today = new Date();
  
  if (range === 'THIS_MONTH') {
    const start = new Date(today.getFullYear(), today.getMonth(), 1);
    return {
      startDate: start.toISOString().split('T')[0],
      endDate: today.toISOString().split('T')[0]
    };
  }
  
  if (range === 'LAST_MONTH') {
    const start = new Date(today.getFullYear(), today.getMonth() - 1, 1);
    const end = new Date(today.getFullYear(), today.getMonth(), 0); // Last day of previous month
    return {
      startDate: start.toISOString().split('T')[0],
      endDate: end.toISOString().split('T')[0]
    };
  }
  
  if (range === 'LAST_3_MONTHS') {
    const start = new Date(today.getFullYear(), today.getMonth() - 3, 1);
    return {
      startDate: start.toISOString().split('T')[0],
      endDate: today.toISOString().split('T')[0]
    };
  }

  return { startDate: '', endDate: '' };
};