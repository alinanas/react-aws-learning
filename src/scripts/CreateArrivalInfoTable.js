var AWS = require("aws-sdk");

AWS.config.update({
  region: "us-east-1"
});

var dynamodb = new AWS.DynamoDB();

var params = {
  TableName: "ArrivalInfo",
  KeySchema: [
    // Partition Key
    { AttributeName: "text1", KeyType: "HASH" },
    // Sort Keys
    { AttributeName: "text2", KeyType: "RANGE"}  
  ],
  AttributeDefinitions: [
    { AttributeName: "text1", AttributeType: "S" },
    { AttributeName: "text2", AttributeType: "S" }
  ],
  LocalSecondaryIndexes: [
    {
      IndexName: "ClassIndex",
      KeySchema: [
        { AttributeName: "text1", KeyType: "HASH" },
        { AttributeName: "text2", KeyType: "RANGE" }
      ],
      Projection: {
        ProjectionType: "KEYS_ONLY"
      }
    }
  ], 
  ProvisionedThroughput: {
    ReadCapacityUnits: 10,
    WriteCapacityUnits: 10
  }
};

dynamodb.createTable(params, function(err, data) {
  if (err)
    console.error("Unable to create table: ", JSON.stringify(err, null, 2))
  else
    console.log("Created table with description: ", JSON.stringify(data, null, 2))
});