@echo off

start cmd "mongodbserver" /c call start_db_server.bat
cd billing-system
start cmd "Billingserver" /c nodemon
cd client
start cmd "FE" /c ng serve