import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import config from "config";
// import './db'

import {
  routes
} from './routes';

import multer from 'multer';

const upload = multer({ dest: 'uploads/' });

const app = express();

app.use(cors());
app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(bodyParser.json());

app.use('/api/v1/', routes);
app.post('/api/v1/upload', upload.fields([{
  name: 'file'
}]), (req, res) => {
  if (req.files.file[0].mimetype !== "text/javascript") {
    res.json({
      success: false
    });
  };
  res.json({
    name: req.files.file[0].originalname,
    path: req.files.file[0].path,
    success: true
  });
})

app.listen(config.get('server.port'), () => {
  console.log(`Server are listening ${config.get('server.port')} port`)
});