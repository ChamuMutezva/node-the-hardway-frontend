# preview link
- live site aws [notes link](https://master.d2h0uej9jjefv2.amplifyapp.com/)
- live site aws new [notes link](https://dev.d33eh1213qszdc.amplifyapp.com)

## Tutorial 
[Getting Started with AWS - Build a Full-Stack React Application](https://aws.amazon.com/getting-started/hands-on/build-react-app-amplify-graphql/)

## Steps taken to deploy an app on AWS
### Check Environment
Verify that you are running at least Node.js version 12.x and npm version 6.x or greater by running node -v and npm -v in a terminal/console window. If not, please visit the nodejs and npm website for more information.

N.B. This can/should be done in your REACT app

- check node version on the terminal
`node -v`
- check npm version on the terminal
`npm -v` 
- install the Amplify CLI.
`npm install -g @aws-amplify/cli` 
- Once installation completes, configure Amplify by running the following command:
`amplify configure`
amplify configure will open a browser and ask you to sign into the AWS Console.
Once you're signed in, Amplify CLI will ask you to create an IAM user.

```
Specify the AWS Region
? region:  # Your preferred region
Specify the username of the new IAM user:
? user name:  # User name for Amplify IAM user
Complete the user creation using the AWS console
```

Create a user with AdministratorAccess to your account to provision AWS resources for you like AppSync, Cognito etc.

Once the user is created, Amplify CLI will ask you to provide the accessKeyId and the secretAccessKey to connect Amplify CLI with your newly created IAM user.

```
Enter the access key of the newly created user:
? accessKeyId:  # YOUR_ACCESS_KEY_ID
? secretAccessKey:  # YOUR_SECRET_ACCESS_KEY
This would update/create the AWS Profile in your local machine
? Profile Name:  # (default)

Successfully set up the new user.
```

- initialize the app with `amplify init` to complete the questions yourself or `amplify init -y` for an auto completion like the one below
```
Project information
| Name: newapp
| Environment: dev
| Default editor: Visual Studio Code
| App type: javascript
| Javascript framework: none
| Source Directory Path: src
| Distribution Directory Path: dist
| Build Command: npm run-script build
| Start Command: npm run-script start
```

Some next steps:
```
"amplify status" will show you what you've added already and if it's locally configured or deployed
"amplify add <category>" will allow you to add features like user login or a backend API
"amplify push" will build all your local backend resources and provision it in the cloud
"amplify console" to open the Amplify Console and view your project status
"amplify publish" will build all your local backend and frontend resources (if you have hosting category added) and provision it in the cloud
```

## Install Amplify libraries
- You need to install the Amplify JavaScript library aws-amplify and Amplify UI library for React @aws-amplify/ui-react (contains the React UI components).
- Run the following command to install them: `npm install aws-amplify @aws-amplify/ui-react` 

## Deploy Application
- You are now ready to deploy your Amplify web application by running `amplify push`. This will upload your application to your AWS account for you, and Amplify will show you the changes being deployed, and ask to confirm the deployment:

### Setup Continuous Deployment
To configure Amplify to deploy your code, you need to connect it with your GitHub account. This is done via the AWS Console as it needs to generate a GitHub token to access your private repo, and store it in your AWS account. To do this, from the root directory, run `amplify add hosting`. Amplify will present a list of questions about the hosting, please select the options shown below:
```
amplify add hosting

? Select the plugin module to execute (Use arrow keys)
❯ Hosting with Amplify Console (Managed hosting with custom domains, Continuous deployment)
  Amazon CloudFront and S3
? Choose a type
❯ Continuous deployment (Git-based deployments)
  Manual deployment
  Learn more
```

- further reading [Deploy a Web Application on AWS Amplify](https://aws.amazon.com/getting-started/guides/deploy-webapp-amplify/module-three/?pg=webappamplify)