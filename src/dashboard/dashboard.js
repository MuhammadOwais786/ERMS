getUserData()

function getUserData() {

    const userId = localStorage.getItem('userId')

    firebase.firestore().collection('users').doc(userId).get()

        .then(function (snapshot) {
            const userObj = snapshot.data()

            document.getElementById('fullName').innerHTML = userObj.fullName
            document.getElementById('age').innerHTML = userObj.age
            document.getElementById('email').innerHTML = userObj.email
        })
        .catch(function (error) {
            alert(error.message)
        })
}


let myChart = document.getElementById('myChart').getContext('2d');

// Global Options

Chart.defaults.global.defaultFontFamily = "Lato";
Chart.defaults.global.defaultFontSize = 18;
Chart.defaults.global.defaultFontColor = "#777";

let massPopChart = new Chart("myChart", {
    type: 'line',
    // bar, horizontalBar , pie , line, doughnut , radar, polarArea
    data: {
        labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'Novermber', 'December'],
        datasets: [{
            label: 'Income And Expense',
            data: [
                251081,
                181045,
                153060,
                106519,
                105162,
                95072,
                97594,
                181045,
                153060,
                106519,
                105162,
                105162
            ],
            // backgroundColor: 'green'
            backgroundColor: [
                'rgba(255, 99, 132, 0.6)',
                'rgba(54, 162, 235, 0.6)',
                'rgba(255, 206, 86, 0.6)',
                'rgba(75, 192, 192, 0.6)',
                'rgba(153, 102, 255, 0.6)',
                'rgba(255, 159, 64, 0.6)',
                'rgba(255, 99, 132, 0.6)',
                'rgba(255, 99, 132, 0.6)',
                'rgba(54, 162, 235, 0.6)',
                'rgba(255, 206, 86, 0.6)',
                'rgba(75, 192, 192, 0.6)',
                'rgba(153, 102, 255, 0.6)',
                'rgba(255, 159, 64, 0.6)',
                'rgba(255, 99, 132, 0.6)'
            ],
            borderWidth: 1,
            borderColor: '#777',
            hoverBorderWidth: 3,
            hoverBorderColor: '#000',
        }]
    },
    options: {
        title: {
            display: true,
            text: 'Expense And Revenue Management System',
            fontSize: 30
        },
        legend: {
            display: true,
            position: 'right',
            labels: {
                fontColor: '#000'
            }
        },
        layout: {
            padding: {
                left: 50,
                right: 0,
                bottom: 0,
                top: 0
            }
        },
        tooltips: {
            enabled: true
        }
    }
});