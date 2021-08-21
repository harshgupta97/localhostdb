echo  Creating dist files and zipping it for distribution...

npm run build && "C:\Program Files\7-Zip\7z.exe" a -tzip "D:\Work\ParallelSoftware\package\public\localhostdb\localhostdb.zip" "D:\Work\ParallelSoftware\package\public\localhostdb\" -xr!node_modules -xr!src -xr!*.log -xr!*.md -xr!dist.bat -xr!.gitignore -xr!nodemon.json -xr!tsconfig.json -xr!localhostdb.zip -xr!clean.bat

echo Done, Ready for distribution!