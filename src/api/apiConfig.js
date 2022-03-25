const apiConfig = {
    baseUrl: 'https://api.themoviedb.org/3/',
    apiKey: import.meta.env.VITE_APP_TMDB_API_KEY,
    originalImage: (img) => `https://image.tmdb.org/t/p/original/${img}`,
    w500Image: (img) => `https://image.tmdb.org/t/p/w500/${img}`
}

export default apiConfig;