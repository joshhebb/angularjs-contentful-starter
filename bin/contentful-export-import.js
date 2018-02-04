/**
 * Node.js script which exports the 'Sample' Contentful space and uploads it into the users specified space.
 * @author Josh Hebb
 */

var prompt = require('prompt');
var spaceExport = require('contentful-export');
var spaceImport = require('contentful-import');
var updateJson = require('update-json');

// Contentful Export & Import Options
var options = {
  spaceId: 'hpty8kufn7nl',
  accessToken: '',
  managementToken: 'CFPAT-faf804d0d0abc11ef6c5844ef15ffbf8f467a3236ccccd5a3b7af618f0fc3ad2',
  saveFile: false,
  maxAllowedItems: 100
}

// Package JSON relative path.
var filePath = './package.json';

// Contentful options parameter definitions.
var schema = {
  properties: {
    // Your personal Space ID
    spaceId: {
      required: true
    },
    // Content Delivery Access Token
    accessToken: {
      required: true
    },
    // Content Management Token
    managementToken: {
      required: true
    }
  }
};

// Configuration data that we'll inject into package.json
var data = { 
  config: {
    contentfulConfigurations: {
      spaceId: '',
      accessToken: '',
      managementToken: ''
    }
  }
}


prompt.start();
console.log("Starting the Contentful Export & Import Process..");
console.log("Please enter your Contentful Space ID and your Content Delivery / Management Tokens.");
console.log("You can find those values in Contentful under your space.");
console.log("---------------------------------------------------------");

// Get two properties from the user: username and email 
prompt.get(schema, function (err, result) {
  spaceExport(options)
    .then((output) => {

      // Update the options with the output JSON from the export and the user input spaceId & management token.
      options.content = output;
      options.spaceId = result.spaceId;
      options.accessToken = result.accessToken;
      options.managementToken = result.managementToken;

      // Import the Space and pass the input into update JSON to update the package.json configs.
      spaceImport(options)
        .then((output) => {
          console.log('Data Imported successfully');

          // Set the JSON values entered by the user to update package.json
          data.config.contentfulConfigurations.spaceId = options.spaceId;
          data.config.contentfulConfigurations.accessToken = options.accessToken;
          data.config.contentfulConfigurations.managementToken = options.managementToken;

          // Update package.json
          updateJson(filePath, data, function (error) {
            if (error) {
              console.log("An error occurred updating package.json: " + err);
            }
          });
        })
        .catch((err) => {
          console.log('Something went wrong with the import: ', err)
        })
    })
    .catch((err) => {
      console.log('Uh oh! Something went wrong: ', err)
    })
});
