let request = require('request');

function GetData(call)
{
  request('http://vbot.website/MapModule.json', (error, response, body) => {
    if(!error) {
      call(false, body);
    }
    else
    {
      call(true, null);
    }
  });
}

module.exports = GetData;
