if exist node_modules (
  node ./dist/db.js
) else (
  npm install --production && node ./dist/db.js
)