// import getInterface from 'steam-web-api';
// const getInterface = require('steam-web-api');
// // var api = new SteamWebAPI("0691601DDFE7900A2E2DA7D770D55F0F");
// const steamRemoteStorage = getInterface('ISteamRemoteStorage');
//
// var param_1 = 1;
// var param_2 = 450814997;
//
// const callBack = (statusCode, response) => {
//   if (statusCode == 200) {
//     //console.log(response['response']['publishedfiledetails'][0]);
//     returned = response['response']['publishedfiledetails'][0];
//   }
// }
//
// const getWorkshopData = (workshopID) => {
//   var returned = ''
//   steamRemoteStorage.post('GetPublishedFileDetails', 1, {
//     itemcount: 1,
//     publishedfileids: ['450814997']
//   }, function(statusCode, response) {
//     if (statusCode == 200) {
//       //console.log(response['response']['publishedfiledetails'][0]);
//       returned = response['response']['publishedfiledetails'][0];
//     }
//   });
//   return returned;
// }
//
// console.log("returned: ", returned);
// var obj = JSON.parse(JSON.stringify(response));
// console.log(obj['response']['publishedfiledetails'][0]);


const request = require('request-promise');

async function main() {
  var body = await request.get('https://jsonplaceholder.typicode.com/posts/1');
  console.log('Body: ', body);
}

main();
