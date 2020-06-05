
function getSalt()
{
    let salt = '';
    let length = 8;
    let possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    for (let i = 0; i < length; i++) {
        salt += possible.charAt(Math.floor(Math.random() * possible.length));
    }
    return salt;

}

function getHashPassword(password,salt){
    return salt+"||"+password;
}


function hashPassword(password) {
    var salt = getSalt();
    var hash = getHashPassword(password, salt)

    return {
        salt: salt,
        hash: hash,
       
    };
}


function isPasswordCorrect(savedHash, savedSalt, passwordAttempt) {
    return savedHash == getHashPassword(passwordAttempt,savedSalt)
}