export const API_ENDPOINT_PATH = process.env.NODE_ENV === 'production'
    ? "https://lime-smoggy-camel.cyclic.app/"
    : "http://localhost:3001/api/notes"