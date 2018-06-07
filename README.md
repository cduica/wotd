
# WOTD

This app randomly chooses a word from its database every 24 hours and sets it as the word of the day. This word of the day is available via REST endpoint.

Routes

GET /api/word/ - returns the word of the day. 

Was going to add Create/Update word of the day endpoints, but ran out of time. 

How to install: 

- Download English dictionary json from https://github.com/cduica/Oxford-Dictionary-Json and load it into mongodb.
- Run npm install
- change example.config.js to config.js and add the appropriate info
