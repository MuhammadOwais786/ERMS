function login(e) {
    event.preventDefault()
    const email = document.getElementById('email').value
    const password = document.getElementById('password').value

    firebase.auth().signInWithEmailAndPassword(email, password)

        .then(function (userResponse) {
            const userId = userResponse.user.uid

            localStorage.setItem('userId', userId)

            alert('Successfully Logged In')
            location.replace("../transactions/transactions.html")
        })

        .catch(function (error) {
            // Handle Errors here.
            var errorCode = error.code;
            var errorMessage = error.message;
            // ...
            // console.log('error --->', error)
            alert(errorMessage)
        });

}