export default {
    SERVER: { TITLE: "DB", },
    PORT: 3001,
    LOGS: { LEVEL: process.env.LOG_LEVEL || "silly", },
    API: {
        TITLE: "DB",
        PREFIX: "/storage",
        VERSION: "/V1",
    },
    DB_PATH: "C:/parallel_software/db",
}