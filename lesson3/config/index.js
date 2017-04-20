module.exports = {
   port:3001,
   session:{
     secret:'myDataBase',
     key:'myDataBase',
     maxAge:2592000000
   },
   mongodb:'mongodb://localhost:27017/myDataBase'
}
