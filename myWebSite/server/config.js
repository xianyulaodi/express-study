/**
* config
**/
const path = require('path');

module.exports = {
   port: 3000,
   name: 'xianyulaodi',
   mongodb:'mongodb://127.0.0.1/dataBase',
   hostname:'localhost',
   session_secret:'xianyulaodi',  //存储session的秘钥
   list_topic_count:16,
   upload: {
    path: path.join(__dirname, 'public/upload/'),
    url: '/public/upload/'
   }
}
