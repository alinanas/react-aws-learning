var AWS = require("aws-sdk");
var fs = require('fs');

AWS.config.update({
  region: "us-east-1"
});

console.log("Writing entries to ArrivalInfo table.");

var dynamodb = new AWS.DynamoDB.DocumentClient();
var arrivalInfoData = 
  JSON.parse(fs.readFileSync('../components/data/arrival-info.json', 'utf8'));

  arrivalInfoData.forEach(function(info) {
  var params = {
    TableName: "ArrivalInfo",
    Item: {
      "text1": info.text1,
      "text2": info.text2
    }
  };

  dynamodb.put(params, function(err, data) {
    if (err)
      console.error("Unable to load data into table for gallery images",
      info.text1, ". Error: ", JSON.stringify(err, null, 2))
    else
      console.log("Added", info.text1, "to table.")
  });
});