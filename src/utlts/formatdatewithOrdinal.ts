// utils/formatDate.ts (for example)
export function formatDateWithOrdinal(date: string) {
    const dateObj = new Date(date);
    const day = dateObj.getDate();
    const month = dateObj.toLocaleString('default', { month: 'long' }); // Gets the full month name
    const year = dateObj.getFullYear();
    
    // Helper function to add the ordinal suffix to the day
    const ordinalSuffix = (day: number) => {
      if (day > 3 && day < 21) return 'th'; // Handle 4th to 20th
      switch (day % 10) {
        case 1: return 'st';
        case 2: return 'nd';
        case 3: return 'rd';
        default: return 'th';
      }
    };
  
    return `${day}${ordinalSuffix(day)} ${month} ${year}`;
  }
  