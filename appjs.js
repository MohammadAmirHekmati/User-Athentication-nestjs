const axios=require('axios')
const ip='69.174.101.97'
async function sendRequest()
{
  const result=await axios.get(`https://api.iplocation.net/?ip=${ip}`)
  console.log(result.data);
}

sendRequest()