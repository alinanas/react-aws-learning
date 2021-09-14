var AWS = require("aws-sdk");
var fs = require('fs');

AWS.config.update({
  region: "us-east-1"
});

console.log("Writing entries to FooterLinks table.");

var dynamodb = new AWS.DynamoDB.DocumentClient();
var footerLinksData = 
  JSON.parse(fs.readFileSync('../components/data/footer-links.json', 'utf8'));

  footerLinksData.forEach(function(link) {
  var params = {
    TableName: "FooterLinks",
    Item: {
      "src": link.src,
      "alt": link.alt,
      "href": link.href
    }
  };

  dynamodb.put(params, function(err, data) {
    if (err)
      console.error("Unable to load data into table for gallery images",
      link.src, ". Error: ", JSON.stringify(err, null, 2))
    else
      console.log("Added", link.src, "to table.")
  });
});