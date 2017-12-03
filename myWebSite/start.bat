@echo off    
start cmd /k "cd/d D:/mongodb/bin && mongod --dbpath F:/expressStudy/express-study/myWebSite/server/dataBase"  
start cmd /k "cd/d F:/expressStudy/express-study && cd myWebSite/server && supervisor ./bin/www" 
start cmd /k "cd/d F:/expressStudy/express-study && cd myWebSite/app && webpack-dev-server" 
