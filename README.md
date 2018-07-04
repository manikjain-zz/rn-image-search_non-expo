# rn-image-search_non-expo

A copy of https://github.com/manikjain/react-native-image-search detached from expo. This app demonstrates image search in React Native and displays results in a grid format with infinite scrolling.

## NOTE

`CLIENT_ID` and `CLIENT_SECRET` (from Shutterstock) need to be provided to the `auth: { username: CLIENT_ID, password: CLIENT_SECRET }` part of axios GET request in `images.js`.

While it is not recommended to store like this on the front-end, I did it here just to keep it simple. In real world, such creds should never be exposed on the client side.
