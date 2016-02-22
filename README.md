# pfc-family-search

## Heroku username
- sergiporraspages

## Localhost
- Install in local the required dependencies on cmd
```
npm install
```
- Execute the following heroku command
```
heroku local web
```
- Enter to the following URL: http://localhost:5000

## Adding on another computer the repository
- Clone the repo in your computer
```
git clone https://github.com/sinh15/pfc-family-search.git pfc-family-search
```
- Add the heroku remote (you have to: "heroku login" before)
```
heroku git:remote -a pfc-family-search
```
- If you want the repo for heroku remote to have a different name than 'heroku', use the command
```
-r other_remote_name
```
