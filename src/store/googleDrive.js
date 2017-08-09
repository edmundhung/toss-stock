import * as googleDrive from 'googleDrive';
import { getStockByCode } from './reducers';

const config = {
  const fs = require('fs');
  const readline = require('readline');
  const google = require('googleapis');
  const googleAuth = require('google-auth-library');

  const SCOPES = [
    'https://www.googleapis.com/auth/drive.file',
  ];

  const TOKEN_DIR = (process.env.HOME || process.env.HOMEPATH ||
      process.env.USERPROFILE) + '/.credentials/';
  const TOKEN_PATH = TOKEN_DIR + 'drive-nodejs-quickstart.json';
}

export default function middleware({ getState }) {
  // Load client secrets from a local file.
  fs.readFile('client_secret.json', function processClientSecrets(err, content) {
    if (err) {
      console.log('Error loading client secret file: ' + err);
      return;
    }

  return next => action => {
    const result = next(action);

    switch (action.type) {
      case UPLOAD_PHOTO:
        break;
      case PREVIEW_PHOTO:
        break;
    }

    return result;
  }
}
