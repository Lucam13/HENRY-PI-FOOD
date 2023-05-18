//                       _oo0oo_
//                      o8888888o
//                      88" . "88
//                      (| -_- |)
//                      0\  =  /0
//                    ___/`---'\___
//                  .' \\|     |// '.
//                 / \\|||  :  |||// \
//                / _||||| -:- |||||- \
//               |   | \\\  -  /// |   |
//               | \_|  ''\---/''  |_/ |
//               \  .-\__  '-'  ___/-. /
//             ___'. .'  /--.--\  `. .'___
//          ."" '<  `.___\_<|>_/___.' >' "".
//         | | :  `- \`.;`\ _ /`;.`/ - ` : | |
//         \  \ `_.   \_ __\ /__ _/   .-` /  /
//     =====`-.____`.___ \_____/___.-`___.-'=====
//                       `=---='
//     ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
const server = require('./src/app.js');
const { conn, Diet } = require('./src/db.js');


// Syncing all the models at once.
const force = true;
conn.sync({ force: true }).then(() => {
  if(force){
    const data = [
      {name: "gluten free"},
      {name: "dairy free"},
      {name: "vegetarian"},
      {name: "lacto ovo vegetarian"},
      {name: "vegan"},
      {name: "pescatarian"},
      {name: "paleolithic"},
      {name: "primal"},
      {name: "fodmap friendly"},
      {name: "whole30"}]
      Diet.bulkCreate(data)
  }
  server.listen(3001, () => {
    console.log('%s listening at 3001'); // eslint-disable-line no-console
  });
});
