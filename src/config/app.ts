import express from 'express';
import cors from 'cors';

export const configure = () => {
    const app = express();

    app.set('port', process.env.PORT || 4000);
    app.use(cors());
    app.use(express.json());
    app.use(express.urlencoded({ extended: false }))

    if (process.env.NODE_ENV === "development") {
        app.use(require("morgan")("dev"));
    }

    return app;
}