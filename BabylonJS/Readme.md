Chào Phi, folder của Project theo ts này nằm ở folder BabylonJS này thôi nha, tại lười tạo cái mới quá
Link hướng dẫn của Babylon: https://doc.babylonjs.com/features/es6_support

Bật cmd ở folder BabylonJS
cài các package
>npm init
>npm install webpack webpack-cli webpack-dev-server --save-dev
>npm install --save-dev @babylonjs/core
>npm install --save-dev @babylonjs/materials
>npm install typescript ts-loader --save-dev

run server
>npx webpack-dev-server

-> vào http://localhost:8080/


Github cmd:

Update code:
>git status
>git add file/folder
(neu add nham file: >git rm file/folder)
>git commit -m "noi dung thay doi"
>git push

Tao branch moi:
>git checkout -b "name-new-branch"
>git push origin "name-new-branch"

Xoa folder:
>git rm -r "name-folder"
>git commit -m "remove folder-name"
>git push


