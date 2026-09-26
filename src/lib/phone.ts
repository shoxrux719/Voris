export function formatUzPhone(value: string): string {
  const allDigits = value.replace(/\D/g, '');
  const localDigits = (allDigits.startsWith('998') ? allDigits.slice(3) : allDigits).slice(0, 9);
  if (!localDigits) return '+998 ';

  const parts = ['+998', localDigits.slice(0, 2)];
  if (localDigits.length > 2) parts.push(localDigits.slice(2, 5));
  if (localDigits.length > 5) parts.push(localDigits.slice(5, 7));
  if (localDigits.length > 7) parts.push(localDigits.slice(7, 9));
  return parts.join(' ');
}
