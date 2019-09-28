import { Router } from 'express';

import { routes as files } from './files';

const routes = Router();

routes.use('/files', files)

export { routes };