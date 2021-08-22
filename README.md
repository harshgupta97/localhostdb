# LocalhostDB

DB server for persistance and in-memory data storage using [express](https://expressjs.com/) and [nedb](https://github.com/louischatriot/nedb), desktop application built using electron can leverage this to storage data locally.

## Dev Commands

1. Install

```
npm i
```

2. Run

```
npm run dev
```

3. Generate dist archive

```
npm run dist
```

4. Build dist

```
npm run build
```

5. Clean up the codebase

_Note :: Command will only remove \*.log files and dist folder for next clean build_

```
npm run clean
```

## Things to keep in mind

- Update the dist.bat file as per your requirement.
- Same thing with db.configuration file, Change it as per you requirement

## End User

1. Install node.js

2. Unzip the localhostdb.zip

3. Open the localhostdb folder and click run.bat

## Verify installation

Open up a browser and goto http://localhost:3001/storage
