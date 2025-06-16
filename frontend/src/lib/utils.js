export function formatMessageTime(date) {
  return new Date(date).toLocaleTimeString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
}

export function formatLastSeen(timestamp) {
  if (!timestamp) {
    return ""; // Or "Never seen" or similar, depending on desired behavior
  }

  try {
    const date = new Date(timestamp);

    // Check if the date is valid
    if (isNaN(date.getTime())) {
      console.error("Invalid timestamp provided to formatLastSeen:", timestamp);
      return ""; // Handle invalid dates gracefully
    }

    // Simple formatting using toLocaleString
    // You can customize the options for different date/time formats
    const options = {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "numeric",
      minute: "numeric",
      hour12: true, // Use 12-hour format with AM/PM
    };

    return date.toLocaleString(undefined, options); // Use user's locale
  } catch (error) {
    console.error("Error formatting timestamp:", timestamp, error);
    return ""; // Handle any unexpected errors during formatting
  }
}
