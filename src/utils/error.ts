export function getErrorMessage(error: unknown): string {
    if (typeof error === 'string') {
      return error; // Return the error if it's a string
    }
    if (error instanceof Error) {
      return error.message; // Return the message if it's an Error instance
    }
    return 'An unexpected error occurred'; // Default fallback message
  }
  