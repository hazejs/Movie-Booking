export const storeToken = (token: string) => {
  localStorage.setItem('authorization', token);
};

export function formatDateObjects(dateObjects: any[]) {
  return dateObjects
    .map((obj: any) => {
      const dateString = typeof obj === 'string' ? obj : obj.date;
      const date = new Date(dateString);
      const day = String(date.getDate()).padStart(2, '0');
      const month = String(date.getMonth() + 1).padStart(2, '0');
      const year = date.getFullYear();
      return `${day}/${month}/${year}`;
    })
    .join(', ');
}
