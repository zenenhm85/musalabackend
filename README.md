# AdminFrontend
This software was developed with nodejs in backend and angular 10 in frontend

For the backend to work, it must be located in the ´backend´ folder and execute ´npm run start´ before 'npm install'
For the frontend to work, it must be located in the ´frontend´ folder and execute 'npm install', and then unzip the assets.zip folder, finally ´ng serve´,

In the backend there is a folder called ´import files´, there you will find a json file called ´Musala Soft.postman_collection.json´, that file can be imported into postman and observe each path with its descriptions.

There are also three other json files for MongoDB, for users, gateways and devices models, you can import these files into a database called ´gateways´ in mongodb, there are two types of users: ADMIN_ROLE and USER_ROLE, only ADMIN users can modify the data in the software, the USER_ROLES, can only modify elements corresponding to their profile.
