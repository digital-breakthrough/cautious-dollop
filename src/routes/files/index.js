import { Router } from 'express'

import * as files from '../../controllers/files';

const routes = Router({
    mergeParams: true
})

routes.route('/compare')
    .all(files.compare)

export {
    routes
};