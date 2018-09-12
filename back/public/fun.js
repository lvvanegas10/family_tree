
function signOut() {
    var auth2 = gapi.auth2.getAuthInstance();
    auth2.signOut().then(function() {
        console.log('User signed out.');
    });
}


function onSignIn(googleUser) {
    var profile = googleUser.getBasicProfile();
    
    var id_token = googleUser.getAuthResponse().id_token;

    var xhr = new XMLHttpRequest();
    xhr.open('POST', '/google');
    xhr.setRequestHeader('Content-Type', 'application/json');
    xhr.send(JSON.stringify({idtoken: id_token}));    
}
