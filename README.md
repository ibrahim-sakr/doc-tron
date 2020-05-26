## DocTron

DocTron is a cron jobs manager service that you use to register all your cron jobs then
DocTron will make sure those jobs are running on time with all possible logs, errors and outputs.


## DocTron Server

this repo is the DocTron server that handles all operations.

you can use it directly with its APIs or you can build your own UI.

as a standard UI we introduce DocTron UI in this repo [here](https://github.com/ibrahim-sakr/doc-tron).

### Install

- clone the repo
- `cd` into the cloned folder
- run `npm install`
- run `npm run dev`

### .env

there are several env variables that control the server a shown below

| name                  | type   | description                                                                                                                                           |
|-----------------------|--------|-------------------------------------------------------------------------------------------------------------------------------------------------------|
| NODE_ENV              | string | node environment ex: local,production                                                                                                                 |
| APP_URL               | string | url to the app ex: http://localhost                                                                                                                   |
| APP_PORT              | number | app port ex: 3000                                                                                                                                     |
| MYSQL_USERNAME        | string | mysql username                                                                                                                                        |
| MYSQL_PASSWORD        | string | mysql password                                                                                                                                        |
| MYSQL_HOST            | string | mysql host                                                                                                                                            |
| MYSQL_PORT            | number | mysql port                                                                                                                                            |
| MYSQL_DATABASE        | string | mysql database name                                                                                                                                   |
| SCHEDULER_INTERVAL    | number | interval time to check if there is a cron needs to be run                                                                                             |
| SCHEDULER_COEFFICIENT | array  | error margin when select the jobs from DB ex: [2,3] that means select jobs that should Run NOW with error margin 2 seconds before and 3 seconds after |
