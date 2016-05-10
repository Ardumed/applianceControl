$(function() {

});
var userData = [{
    'username': 'vatsalya25',
    'password': 'vatsalya25'
}, {
    'username': 'himanshusingh',
    'password': 'himanshusingh'
}, {
    'username': 'mayuresh',
    'password': 'mayuresh2212'
}];

function authenticate() {
    var userName = $('#username').val();
    var passWord = $('#password').val();
    var found = false;

    userData.forEach(function(obj) {
        if (obj.username === userName && obj.password === passWord) {
            window.location.href = 'homepage.html';
            found = true;
        }
    });

    if (found === false) {
        $('.incorrect-password').toggleClass('hidden');
    }
}
