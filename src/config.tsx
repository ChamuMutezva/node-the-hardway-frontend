export const API_ENDPOINT_PATH = process.env.NODE_ENV === 'production'
    ? "https://cooperative-tuna-spacesuit.cyclic.app/api/notes"
    : "http://localhost:3001/api/notes"