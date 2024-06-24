# FAIQnA

This project was made for a BSc thesis.
This is a web-based application made with the followings:
- ReactJS
- npm package manager
- VSCode
- MUI
- Firebase
  - Firebase Extension - for the AI part
  - Firestore - for storing and managind the server side data

## Capabilities

### Use
The web application's main function is that it takes in text-based file(s) and generates quizlets (questions and answers based on the input text).
Therefore the user is able to answer those questions by chosing with a click or tap from the given answers. The answers then reveal themselves (showing color coded responses by filling themselves).
The answer is green - the correct answer for the question.
The answer is red - the false answer for the question.

### General structural capabilities
The web application requires credentials for login status OR it can be used by Google Sign In method.
The application is mainly a one pager style, means that it is supposed to only maintain one Screen/Page and offer you operations on that.
Furhtermore, it supposed to render and update the content of the page, the elements by statement or other event changes - yes this is eventhandling.
Using React - it's meant to be reactive by any means. For examplar - the user experience on different devices supposed to remain the same - optimalized view on any device.
For the Question and Answer generation, the ChatGpt3.5-turbo is used, with implementation of the Firebase Extension feature.

### Purpose
The purpose of this application is to show that it is very effective and easy to integrate AI techologies within educational or education supporting systems - at least nowadays.

## How To Use

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

The page will reload when you make changes.\
You may also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can't go back!**

If you aren't satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you're on your own.

You don't have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn't feel obligated to use this feature. However we understand that this tool wouldn't be useful if you couldn't customize it when you are ready for it.

## Other

If you want any notice or more information or you just want to contribute, please feel free to reach out.

"Future Together"
