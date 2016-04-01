консоль из под админа: npm i -g express-generator

консоль в папке проекта: express (создает структуру)

C:\Program Files\nodejs\node.exe (путь для запуска через run вебсторма(+js-файл с точкой входа и рабочая директория проекта))

-(консоль в папке проекта: npm i express serve-favicon body-parser cookie-parser express-session express-react-view express-react-engine react react-dom winston nconf pg(модули для разработки фронта и бэка, часть нужна для запуска базового проекта, созданного экспрессом) npm i --save babel-preset-es2015 babel-preset-react
npm i --save-dev ...)

консоль из-под админа: npm i -g supervisor (для live-reload сервака при изменениях в файлах)
использование: supervisor xxx.js для старта проекта под супервизором, либо назначить его точкой входа в проект в вебсторме C:\Users\Ivan\AppData\Roaming\npm\supervisor.cmd(не забывать про игнор сторонних модулей для экономии ресурсов --ignore node_modules). Прикол супервизора в отслеживании изменений через зависимости (если добавляются новые файлы, а перезапуск супервизора не происходит)

консоль из-под админа: npm i -g node-inspector
использование: консоль node-inspector, в приложении метка debugger(где надо в коде) и параметр запуска --debug. Можно включить в отладчике старт дебага на ошибке. --debug-brk сразу стопорит поток выполнения. Или через вебсторм. 

NODE_DEBUG "http net" node xxx.js - дебаг нода через консоль


bower init
bower install --save jquery
bower list





