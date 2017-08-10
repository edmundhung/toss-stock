

var fs = require('fs');
var readline = require('readline');
var google = require('googleapis');
var googleAuth = require('google-auth-library');

// If modifying these scopes, delete your previously saved credentials
// at ~/.credentials/drive-nodejs-quickstart.json
var SCOPES = [
  // 'https://www.googleapis.com/auth/drive.metadata.readonly',
  'https://www.googleapis.com/auth/drive.file',
];
var TOKEN_DIR = (process.env.HOME || process.env.HOMEPATH ||
    process.env.USERPROFILE) + '/.credentials/';
var TOKEN_PATH = TOKEN_DIR + 'drive-nodejs-quickstart.json';

console.log(TOKEN_PATH);

// Load client secrets from a local file.
fs.readFile('client_secret.json', function processClientSecrets(err, content) {
  if (err) {
    console.log('Error loading client secret file: ' + err);
    return;
  }
  // Authorize a client with the loaded credentials, then call the
  // Drive API.

  // List files
  // authorize(JSON.parse(content), listFiles);

  // Get a file details by file ID
  // authorize(JSON.parse(content), GetFileById);

  // Upload a signle file (< 5MB) to a specific folder
  // authorize(JSON.parse(content), SimpleUploadFile);

  // Search file by name (to be continue)
  // authorize(JSON.parse(content), retrieveAllFilesInFolder);
  authorize(JSON.parse(content), searchFile);
  // var fetchPage = function(pageToken, pageFn, callback) {
  //   var auth = JSON.parse(content);
  //   google.drive('v3').files.list({
  //     auth: auth,
  //     q: "mimeType='image/jpg'",
  //     fields: 'nextPageToken, files(id, name)',
  //     spaces: 'drive',
  //     pageToken: pageToken
  //   }, function(err, res) {
  //     if(err) {
  //       callback(err);
  //     } else {
  //       res.files.forEach(function(file) {
  //         console.log('Found file: ', file.name, file.id);
  //       });
  //       if (res.nextPageToken) {
  //         console.log("Page token", res.nextPageToken);
  //         pageFn(res.nextPageToken, pageFn, callback);
  //       } else {
  //         callback();
  //       }
  //     }
  //   });
  // };
  //
  // fetchPage(null, fetchPage, function(err) {
  //   if (err) {
  //     // Handle error
  //     console.log(err);
  //   } else {
  //     // All pages fetched
  //   }
  // });
});

function searchFile(auth) {
  var service = google.drive('v3');
  service.files.list({
    auth: auth,
    q: "mimeType='image/jpeg'",
    // q: "name='Desert.jpg'",
    fields: 'nextPageToken, files(id, name, parents)',
    spaces: 'drive',
  }, function(err, response) {
    if (err) {
      console.log('The API returned an error: ' + err);
      return;
    }
    var files = response.files;
    if (files.length == 0) {
      console.log('No files found.');
    } else {
      console.log('Searched Files:');
      for (var i = 0; i < files.length; i++) {
        var file = files[i];
        console.log('%s (%s)', file.name, file.id, file.parents);
      }
    }
  });
}

/**
 * Create an OAuth2 client with the given credentials, and then execute the
 * given callback function.
 *
 * @param {Object} credentials The authorization client credentials.
 * @param {function} callback The callback to call with the authorized client.
 */
function authorize(credentials, callback) {
  var clientSecret = credentials.installed.client_secret;
  var clientId = credentials.installed.client_id;
  var redirectUrl = credentials.installed.redirect_uris[0];
  var auth = new googleAuth();
  var oauth2Client = new auth.OAuth2(clientId, clientSecret, redirectUrl);

  // Check if we have previously stored a token.
  fs.readFile(TOKEN_PATH, function(err, token) {
    if (err) {
      getNewToken(oauth2Client, callback);
    } else {
      oauth2Client.credentials = JSON.parse(token);
      callback(oauth2Client);
    }
  });
}

/**
 * Get and store new token after prompting for user authorization, and then
 * execute the given callback with the authorized OAuth2 client.
 *
 * @param {google.auth.OAuth2} oauth2Client The OAuth2 client to get token for.
 * @param {getEventsCallback} callback The callback to call with the authorized
 *     client.
 */
function getNewToken(oauth2Client, callback) {
  var authUrl = oauth2Client.generateAuthUrl({
    access_type: 'offline',
    scope: SCOPES
  });
  console.log('Authorize this app by visiting this url: ', authUrl);
  var rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
  });
  rl.question('Enter the code from that page here: ', function(code) {
    rl.close();
    oauth2Client.getToken(code, function(err, token) {
      if (err) {
        console.log('Error while trying to retrieve access token', err);
        return;
      }
      oauth2Client.credentials = token;
      storeToken(token);
      callback(oauth2Client);
    });
  });
}

/**
 * Store token to disk be used in later program executions.
 *
 * @param {Object} token The token to store to disk.
 */
function storeToken(token) {
  try {
    fs.mkdirSync(TOKEN_DIR);
  } catch (err) {
    if (err.code != 'EEXIST') {
      throw err;
    }
  }
  fs.writeFile(TOKEN_PATH, JSON.stringify(token));
  console.log('Token stored to ' + TOKEN_PATH);
}

/**
 * Lists the names and IDs of up to 10 files.
 *
 * @param {google.auth.OAuth2} auth An authorized OAuth2 client.
 */
function listFiles(auth) {
  var service = google.drive('v3');
  service.files.list({
    auth: auth,
    pageSize: 10,
    fields: "nextPageToken, files(id, name)"
  }, function(err, response) {
    if (err) {
      console.log('The API returned an error: ' + err);
      return;
    }
    var files = response.files;
    if (files.length == 0) {
      console.log('No files found.');
    } else {
      console.log('Files:');
      for (var i = 0; i < files.length; i++) {
        var file = files[i];
        console.log('%s (%s)', file.name, file.id);
      }
    }
  });
}

function GetFileById(auth) {
  var service = google.drive('v3');
  var fileId = '0B3U0LUtrh4Oic2NEYjJ3cm1Qd28';
  service.files.get({
    auth: auth,
    fileId: fileId,
  }, function(err, file) {
    if (err) {
      console.log('The API returned an error: ' + err);
      return;
    }
    console.log('\r\n*** Get File By ID:');
    console.log('%s (%s)', file.name, file.id);
  });
}

function SimpleUploadFile(auth) {
  var service = google.drive('v3');
  var folderId = '0B3U0LUtrh4OiZ1BvN2xoWXVSR00'; // Folder 'Scanned Images'
  var fileMetadata = {
    'name': 'test.jpg',
    'parents': [folderId],
  };
  var media = {
    mimeType: 'image/jpeg',
    body: fs.createReadStream('C:/test.jpg')
  };
  service.files.create({
    auth: auth,
    resource: fileMetadata,
    media: media,
    fields: 'name, id, parents'
  }, function(err, file) {
    if(err) {
      // Handle error
      console.log(err);
    } else {
      console.log('File Name: ', file.name);
      console.log('File Id: ', file.id);
      console.log('File parents: ', file.parents);
    }
  });
}





/**
 * Retrieve a list of files belonging to a folder.
 *
 * @param {String} folderId ID of the folder to retrieve files from.
 * @param {Function} callback Function to call when the request is complete.
 *
 */
// function retrieveAllFilesInFolder(folderId, callback) {
//   var retrievePageOfChildren = function(request, result) {
//     request.execute(function(resp) {
//       result = result.concat(resp.items);
//       var nextPageToken = resp.nextPageToken;
//       if (nextPageToken) {
//         request = google.drive('v3').children.list({
//           'folderId' : [folderId],
//           'pageToken': nextPageToken
//         });
//         retrievePageOfChildren(request, result);
//       } else {
//         callback(result);
//       }
//     });
//   }
//   var initialRequest = google.drive('v3').children.list({
//       'folderId' : folderId
//     });
//   retrievePageOfChildren(initialRequest, []);
// }