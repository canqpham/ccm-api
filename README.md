# CC Management System
HỆ THỐNG QUẢN LÝ PHÁT TRIỂN PHẦN MỀM THEO PHƯƠNG PHÁP AGILE - SCRUM

=======================
## Tác giả
Tác giả 1: 
    Họ tên: Phạm Hồng Cang
    Sinh năm: 20-12-1997
    Mã số sinh viên: 15110014
    Khoa đào tạo chất lượng cao - ngành Công nghệ thông tin - chuyên ngành Công nghệ phần mềm 
Tác giả 2:
    Họ tên: Lê Minh Chương
    Sinh năm: 07-06-1997
    Mã số sinh viên: 15110020
    Khoa đào tạo chất lượng cao - ngành Công nghệ thông tin - chuyên ngành Công nghệ phần mềm

## Cài đặt
Đầu tiên mở đĩa cd copy tất cả thư mục 
Quá trình cài đặt chia làm 2 giai đoạn:
Giai đoạn 1: Cài đặt Server
  Bước 1: Tải và cài đặt MongoDB theo hướng dẫn từ trang chủ của MongoDB tại đây: https://www.mongodb.com/
  Bước 2: 
```sh
  npm install 
```
or
```sh
  yarn install 
```

## Run
### Fist step
Start Mongodb by command line
```sh
  mongod
```
### Second step
```sh
  npm start
```
or
```sh
  yarn start 
```
## Config git can't add
```sh
  git config core.autocrlf false
```
# How to run debug
## Vscode
- Install `Debugger for Chrome` extension
- Copy the following code to `.vscode/launch.json`
```
{
  // Use IntelliSense to learn about possible attributes.
  // Hover to view descriptions of existing attributes.
  // For more information, visit: https://go.microsoft.com/fwlink/?linkid=830387
  "version": "0.2.0",
  "configurations": [
      {
          "type": "chrome",
          "request": "launch",
          "name": "Launch Chrome against localhost",
          "url": "http://localhost:8001",
          "webRoot": "${workspaceFolder}"
      },
      
      {
          "type": "node",
          "request": "launch",
          "name": "Jest All",
          "program": "${workspaceFolder}/node_modules/jest/bin/jest",
          "args": ["--runInBand"],
          "console": "integratedTerminal",
          "internalConsoleOptions": "neverOpen"
      },
      
      {
          "type": "node",
          "request": "launch",
          "name": "Jest Current File",
          "program": "${workspaceFolder}/node_modules/jest/bin/jest",
          "args": ["${relativeFile}"],
          "console": "integratedTerminal",
          "internalConsoleOptions": "neverOpen"
      }
  ]
}
```
