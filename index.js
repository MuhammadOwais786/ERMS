// console.log(firebase.firestore)
function signUp(e) {
    event.preventDefault()

    const email = document.getElementById('email').value
    const password = document.getElementById('password').value
    const fullName = document.getElementById('fullName').value
    const age = document.getElementById('age').value
    const confirmPassword = document.getElementById('confirmPassword').value


    firebase.auth().createUserWithEmailAndPassword(email, password)
        .then(function (userResponse) {
            const userId = userResponse.user.uid
            /*
                1) .add({}) (generates unique ID for the document)
                2) .doc(<id>).set({}) (you tell the ID to firebase)
            */

            // firebase.firestore().collection('users').add({
            firebase.firestore().collection('users').doc(userId).set({
                    fullName,
                    email,
                    age
                })

                .then(function () {
                    alert("Successfully Registered!")
                    location.href = "src/signin/signin.html"
                })

                .catch(function (error) {
                    var errorMessage = error.message;
                    alert(errorMessage)
                })
        })
        .catch(function (error) {
            // Handle Errors here.
            var errorCode = error.code;
            var errorMessage = error.message;
            // ...
            alert(errorMessage)
        });
}


function signup() {
    const email = document.getElementById('email').value
    const password = document.getElementById('password').value
    const fullname = document.getElementById('fullname').value
    const age = document.getElementById('age').value

    firebase.auth().createUserWithEmailAndPassword(email, password)
        .then(function (userResponse) {
            const userId = userResponse.user.uid
            /*
                1) .add({}) (generates unique ID for the document)
                2) .doc(<id>).set({}) (you tell the ID to firebase)
            */

            // firebase.firestore().collection('users').add({
            firebase.firestore().collection('users').doc(userId).set({
                fullname,
                email,
                age
            }).then(function () {
                alert("Successfully Registered!")
            }).catch(function (error) {
                var errorMessage = error.message;
                alert(errorMessage)
            })
        })
        .catch(function (error) {
            // Handle Errors here.
            var errorCode = error.code;
            var errorMessage = error.message;
            // ...
            alert(errorMessage)
        });
}