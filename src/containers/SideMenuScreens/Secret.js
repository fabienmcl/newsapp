// Example of provider configs supported by SimpleAuth.

module.exports = {
    google: {
        appId: '1234567890-abc.apps.googleusercontent.com',
        callback: 'com.reactnativesimpleauth:/oauth2redirect',
    },
    facebook: {
        appId: '1234567890',
        callback: 'fb1234567890://authorize',
    },
    twitter: {
        appId: '6LDZxejcMqpxKqo7wWZgZQWIo',
        appSecret: 'Ez5Y9aAAfuauGM7etMmLAq7Du8omuXE3W6MbMa1XHwQ9AK6WEH',
        callback: 'reactnativesimpleauth://authorize',
    },
    tumblr: {
        appId: '1234567890abc',
        appSecret: '1234567890abc',
        callback: 'reactnativesimpleauth://authorize',
    },
};