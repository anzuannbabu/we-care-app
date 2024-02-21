export function formatDate(dateInput: string | Date) {
    //form the date here
    if (!dateInput) return 'Ivalid Date';
    return new Intl.DateTimeFormat('en-US', { year: 'numeric', month: '2-digit', day: '2-digit' }).format(new Date(dateInput))
}