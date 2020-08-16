#### Welcome!

This is the project code for both the backend and frontend of Clock Corporation's KD Website that can be found [here](https://kd.clockcorp.com/)

The Project is built in the following Technologies:

**Front-End:**
* [React](https://reactjs.org/)
* Plain CSS

**Back-End**
* Node.js (Express)
* Discord.js (To Communicate with Discord API)
* MongoDB (Using [mongodb](https://www.npmjs.com/package/mongodb) to communicate)

**Usage**

After downloading the project or cloning you will have to install the dependencies:

**To Install on server**

```sh
cd server
npm install 
```

**To Install on client**

```sh
cd client
npm install 
```

You will have to replace the unique variables as following: 

* On `server/config.json` you need to set your MongoDB cluster URL and Discord Bot Token
* On `client/src/Components/KDApp/KDPage.js` you will have to set the `SERVER_URL` variables to your server url.

**You can find commands about the usage in both `package.json` files.**