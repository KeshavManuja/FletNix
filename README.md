"# FletNix" 

First we need to create a database in existing cluster or in a new cluster:
Please find following steps in creating collection
1) Connect to Mongo Atlas
2) Create a new Database by clicking on plus icon and give db name Fletnix
3) Then double click on it to connect and go to browse collection tab. There add to collections <b>Movies</b> , <b>Users</b>
4) Then to load sample data into movies collection run mongoimport \
 --uri=mongodb+srv://USERNAME:PASSWORD@HOST --db=DB --type=csv --headerline --DATA.csv(file-path)
 
5) Get the connection string via clicking on Connect button and select VScode
6) Paste that connection string in .env of client in Variable name MONGO_HOST= <Connection String> , 
  
Now Server Deployement
 1) Navigate to project directory and create a new file titled Procfile in root and add this code in file web: node index.js
2) Install heroku and run heroku login on terminal.
3) Run heroku create fletnix-server
4) then run git add . & git commit -m "init"
5) then run git push heroku master and get the deployed urls that need to be hit from FE
  
  
Now FE
1) Change url we got by BASE_URL varibale in .env.
2) do npm run build, to have the build
3) install vercel cli
4) RUN vercel login in the root of directory and allow login
5) Run vercel to start deployment process.
6) You will get the link ...
  
  
Please reach out in any case
