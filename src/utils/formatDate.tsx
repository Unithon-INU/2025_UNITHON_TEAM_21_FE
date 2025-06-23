import {differenceInDays, endOfMonth} from 'date-fns';
/**
 *
 * @param dateStr | string | number
 * @description 20250515 -> 2025.05.15
 *
 *
 * @returns
 */
export function formatDate(dateStr: string | number): string {
    const str = String(dateStr);
    if (str.length !== 8) {
        return str;
    }
    return `${str.slice(0, 4)}.${str.slice(4, 6)}.${str.slice(6, 8)}`;
}

export const formatDonationDate = (dateString: string | Date): string => {
    const date = new Date(dateString);
    const year = date.getFullYear();
    const month = date.getMonth() + 1;
    const day = date.getDate();
    const hours = String(date.getHours()).padStart(2, '0');
    const minutes = String(date.getMinutes()).padStart(2, '0');

    return `${year}. ${month}. ${day}. ${hours}:${minutes}`;
};
export const today = () => {
    const date = new Date();
    return `${date.getFullYear()}.${String(date.getMonth() + 1).padStart(2, '0')}.${String(date.getDate()).padStart(2, '0')}`;
};
export const daysLeft = (): number => {
    const today = new Date();
    const lastDayOfMonth = endOfMonth(today);
    return differenceInDays(lastDayOfMonth, today);
};
