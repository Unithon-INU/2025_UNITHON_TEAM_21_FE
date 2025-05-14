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
