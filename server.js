import express, { static as xtatic, json, urlencoded } from "express";
import { join } from 'path';
import session from "express-session";
import { create } from "express-handlebars";
import router from "./controllers/index.js";
import helpers from './utils/helpers.js';
const dirname = import.meta.dirname;

const sequelize = require('./config/connection');
const SequelizeStore = require('connect-session-sequelize')(session.Store);

const app = express();
const PORT = process.env.PORT || 3001;

const hbs = create({ helpers });

const sess = {
    secret: 'siliconSecretSession',
    cookie: {
        maxAge: 60000 * 10,
        httpOnly: true,
        secure: false,
        sameSite: 'strict',
    },
    resave: false,
    saveUninitialized: false,
    store: new SequelizeStore({
        db: sequelize,
    }),
};

app.use(session(sess));

app.engine('handlebars', hbs.engine);
app.set('view engine', 'handlebars');

app.use(json());
app.use(urlencoded({ extended: true }));
app.use(xtatic(join(dirname, 'public')));

app.use(router);

sequelize.sync({ force: false }).then(() => {
  app.listen(PORT, () => console.log(`Serving on ${PORT}`));
});