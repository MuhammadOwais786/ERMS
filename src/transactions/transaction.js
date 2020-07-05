/*=======================================================
Set Item In Local Storage
const user = { name: 'Muhammad Owais Ahmed'}
localStorage.setItem('user' , JSON.stringify(user))

=========================================================*/
const user = { name: 'Muhammad Owais Ahmed' }
localStorage.setItem('user', JSON.stringify(user))

getUser()
getMonthandYear()
getTransaction()

function getUser() {
    const userId = localStorage.getItem('userId')

    firebase.firestore().collection('users').doc(userId).get()

        .then(function (snapshot) {
            const userObj = snapshot.data()
            const userElement = document.getElementById('fullName')
            userElement.innerHTML = userObj.fullName
            // document.getElementById('fullName').innerHTML = userObj.fullName
        })
        .catch(function (error) {
            alert(error.message)
        })


    // const user = JSON.parse(localStorage.getItem('user'))
}

function getMonthandYear() {
    const date = new Date()
    const currentMonth = date.getMonth()
    const currentYear = date.getFullYear()
    const monthElement = document.getElementById('month')
    const yearElement = document.getElementById('year')
    monthElement.value = currentMonth
    yearElement.value = currentYear
}

/*=============================================================================
                            Transactions Table
============================================================================*/
function addIncome() {
    const userId = localStorage.getItem('userId')
    const amount = document.getElementById('amount').value
    const date = document.getElementById('date').valueAsDate
    const description = document.getElementById('description').value
    const category = document.getElementById('category').value


    firebase.firestore().collection('transactions').add({
        amount,
        date,
        description,
        category,
        userId,
        type: 'income'
    })
    .then(function () {
        alert("Transaction Successful")
        clearInput()
        getTransaction()
        $('#incomeModal').modal('hide')
    })
    .catch(function(error){
        // Handle Errors here.
        var errorCode = error.code;
        var errorMessage = error.message;
        // ...
        // console.log('error --->', error)
        alert(errorMessage)
    })
}
function clearInput() {
    document.getElementById('amount').value = ''
    document.getElementById('date').value = ''
    document.getElementById('category').value = ''
    document.getElementById('description').value = ''
    document.getElementById('amount-expense').value = ''
    document.getElementById('date-expense').value = ''
    document.getElementById('category-expense').value = ''
    document.getElementById('description-expense').value = ''

}

function addExpense() {
    const userId = localStorage.getItem('userId')
    const amount = document.getElementById('amount-expense').value
    const date = document.getElementById('date-expense').valueAsDate
    const description = document.getElementById('description-expense').value
    const category = document.getElementById('category-expense').value


    firebase.firestore().collection('transactions').add({
        amount,
        date,
        description,
        category,
        userId,
        type: 'expense'
    })
    .then(function () {
        alert("Transaction Successful")
        clearInput()
        getTransaction()
        $('#expenseModal').modal('hide')
    })
    .catch(function(error){
        // Handle Errors here.
        var errorCode = error.code;
        var errorMessage = error.message;
        // ...
        // console.log('error --->', error)
        alert(errorMessage)
    })
}

function getTransaction(){
    const userId = localStorage.getItem('userId')
    // console.log(userId)
    const table = document.getElementsByTagName('tbody')[0]
    table.innerHTML = ""
    firebase.firestore().collection('transactions')
    .where('userId', '==', userId)
    .orderBy("date", "desc")
    .get()
    .then(function(snaps){
        snaps.forEach(function(doc){
            // console.log(doc.data())
            const data = doc.data()
            const row = document.createElement('TR')
            const type = document.createElement('TH')
            const amount = document.createElement('TD')
            const category = document.createElement('TD')
            const date = document.createElement('TD')
            const description = document.createElement('TD')

            type.innerHTML = data.type
            amount.innerHTML = data.amount
            category.innerHTML = data.category
            date.innerHTML = data.date.toDate()
            // date.innerHTML = data.date
            description.innerHTML = data.description

            row.appendChild(type)
            row.appendChild(amount)
            row.appendChild(category)
            row.appendChild(date)
            row.appendChild(description)
            table.appendChild(row)
        });
    });
};

function filter(){
    const userId = localStorage.getItem('userId')
    const type = document.getElementById('type-filter').value

    if(type == "all"){
        return getTransaction()
    }

    const table = document.getElementsByTagName('tbody')[0]
    table.innerHTML = ""
    firebase.firestore().collection('transactions')
    .where('userId', '==', userId)
    .where('type', '==', type)
    .orderBy("date", "desc")
    .get()
    .then(function(snaps){
        snaps.forEach(function(doc){
            console.log(doc.data())
            const data = doc.data()
            const row = document.createElement('TR')
            const type = document.createElement('TH')
            const amount = document.createElement('TD')
            const category = document.createElement('TD')
            const date = document.createElement('TD')
            const description = document.createElement('TD')

            type.innerHTML = data.type
            amount.innerHTML = data.amount
            category.innerHTML = data.category
            // date.innerHTML = data.date
            date.innerHTML = data.date.toDate()
            description.innerHTML = data.description

            row.appendChild(type)
            row.appendChild(amount)
            row.appendChild(category)
            row.appendChild(date)
            row.appendChild(description)
            table.appendChild(row)
        });
    });


}