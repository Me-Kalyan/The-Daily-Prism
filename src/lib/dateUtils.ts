/**
 * Standardized date formatting to prevent hydration mismatches
 * between server and client locales.
 */
export function formatDate(dateInput: string | Date, lang: 'en' | 'te' = 'en'): string {
    const date = typeof dateInput === 'string' ? new Date(dateInput) : dateInput;

    // Check if date is valid
    if (isNaN(date.getTime())) return '';

    // Use explicit locales to ensure consistency
    // English: 24 DEC 2024
    // Telugu: 24 డిసెంబర్ 2024 (simplified to numeric for now to be safe, or use explicit)

    if (lang === 'te') {
        // Simple numeric format for Telugu to avoid complex Intl variations across Node/Browser
        return `${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()}`;
    }

    const months = ['JAN', 'FEB', 'MAR', 'APR', 'MAY', 'JUN', 'JUL', 'AUG', 'SEP', 'OCT', 'NOV', 'DEC'];
    const day = date.getDate().toString().padStart(2, '0');
    const month = months[date.getMonth()];
    const year = date.getFullYear();

    return `${day} ${month} ${year}`;
}
