/**
 * http://usejsdoc.org/
 */
var fs = require("fs");

function readMyFile(name)
{
  var data = fs.readFileSync(name, "utf-8");
  return JSON.parse(data);
}

function writeMyFile(name, data)
{
  fs.writeFile(name,JSON.stringify(data), "utf-8", function(err){
    if(err)
    {
      console.log("Unable to write the data");
    }
  });
}