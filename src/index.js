'use strict';
import express from 'express';
import fs from 'fs';
import path from 'path';
import yaml from 'js-yaml';
import { query, validationResult } from 'express-validator';

import { getMetadata, render } from './lib/index.js';

const configPath = process.env.CONFIG || path.join(process.cwd(), 'config.yml');
const config = yaml.load(fs.readFileSync(configPath, 'utf8'));

const app = express();

const { port = 8000, hostname = 'http://localhost' } = config.server || {};

app.get(
  '/',
  [query('url', 'url is missing in query').exists()],
  async (req, res) => {
    res.header('Access-Control-Allow-Origin', '*');
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      /* Returns the error response with each of the errors inside an array, and each error is
        an object with 4 attributs: value, msg, param and location */
      return res.status(422).json({ errors: errors.array() });
    }

    const meta = await getMetadata(req.query.url);
    return res.send(render(meta.head));
  },
);

app.listen(port, () => {
  console.log(`[App]: Listening at ${hostname}:${port}`);
});
