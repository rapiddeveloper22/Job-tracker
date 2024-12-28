const API_CONFIG = {
    BASE_URL: "https://job-tracker-production-e381.up.railway.app",
    // BASE_URL: "http://localhost:3000",
    AUTH: {
        LOGIN: "/api/auth/login",
        SIGNUP: "/api/auth/signup",
    },
    APPLICATION: {
        GET_ALL: "/api/app/getAll",
        CREATE: "/api/app/create",
        UPDATE: "/api/app/update",
        DELETE: "/api/app/delete",
        APPLY: "/api/app/apply",
    },
    SCRAPE: {
        LINKEDINSCRAPE: "/api/scrape/scrape"
    }
};

export default API_CONFIG;
