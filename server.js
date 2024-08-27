import express, { static as xtatic, json, urlencoded } from "express";
import { join } from 'path';
import session from "express-session";
import { create } from "express-handlebars";
import router from "./controllers/routes.js";
import helpers from './utils/helpers.js';
import sequelize from "./config/connection.js";
import sequelizeStore from 'connect-session-sequelize';

const dirname = import.meta.dirname;

const SequelizeStore = sequelizeStore(session.Store);

const app = express();
const PORT = process.env.PORT || 3001;

const hbs = create({ helpers });
const sessMins = 10;

const sess = {
    secret: 'siliconSecretSession',
    cookie: {
        // The session lasts 10 minutes
        maxAge: 60000 * sessMins,
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

app.use((req, res) => res.status(404).send("<h1>Wrong Route!</h1>"));

sequelize.sync({ force: false }).then(() => {
  app.listen(PORT, () => console.log(`Serving on ${PORT}`));
});