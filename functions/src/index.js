import * as functions from 'firebase-functions';

// Create and Deploy Your First Cloud Functions
// https://firebase.google.com/docs/functions/write-firebase-functions

export const helloWorld = functions.https.onRequest((request, response) => {
    functions.logger.info('Hello my logs!', { structuredData: true });
    response.send('Hello from Firebase!');
});
