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
        UPDATE: "/api/app/updateApplication",
        DELETE: "/api/app/delete",
        APPLY: "/api/app/apply",
    },
    SCRAPE: {
        LINKEDINSCRAPE: "/api/scrape/scrapeLinkedInProfiles",
        JOBDESCRIPTION: "/api/scrape/scrapeJobDescription"
    },
    AI: {
        GETREFERRALTEXT: "/api/ai/getReferralText",
        GETSIMILARITYSCORE: "/api/ai/getSimilarityScore",
        EXTENSIONCALL: "/api/ai/extensionCall"
    }
};

export default API_CONFIG;
