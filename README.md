# Introduction

This api allows to retrieve company information.

# House keeping
## How to run:
Just the nodejs app in dev mode locally: 
- npm install
- npm run dev

## Api documentation
The swagger source file can be found here:
The swagger ui can be found here:

some sample curls (better to use the swagger docs, but they might give you a quik start)

Retrieve some data from the database

`curl -X GET \
  'http://localhost:3000/v1/api/companies'`

Update some data in the database
  
`curl -X PATCH \
  http://localhost:3000/v1/api/companies/1234567898/reportingDate \
  -H 'content-type: application/json' \
  -d '{
  "lastReported": "2019-01-01T00:00:00Z",
  "nextReporting": "2021-12",
  "estimatedTimeInDay": "midDay"
}'`


