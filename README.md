# DHIS Master Facility List APP

## Run
How to run locally using `https://play.dhis2.org/demo`:
* add your localhost:port  (e.g. `http://localhost:3000`) to dhis2 - Menu - System Settings - Access - CORS whitelist;
* run in the terminal `nmp run start` from the project folder;

## Deploy
How to deploy on a dhis server:
* in the file `globals/BaseUrl.js` change constant `local` to `false`
* run in the terminal `nmp run build` from the project folder;
* make zip archive of the folder contents `build`;
* upload zip to dhis App Management;

