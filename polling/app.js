let answers = {
    "Python": 0,
    "Ruby": 0,
    "JavaScript": 0,
    
};

function submitAnswer() {
    const selectedLanguage = document.querySelector('input[name="language"]:checked').value;

    answers[selectedLanguage]++;

    updateChart();
}

function updateChart() {
    const labels = Object.keys(answers);
    const data = Object.values(answers);

    const ctx = document.getElementById('pie-chart').getContext('2d');
    if(window.myPieChart !== undefined) {
        window.myPieChart.destroy();
    }
    window.myPieChart = new Chart(ctx, {
        type: 'pie',
        data: {
            labels: labels,
            datasets: [{
                data: data,
                backgroundColor: [
                    "Green",
                    "Navy",
                    "Teal"

                ],
                borderColor: [
                    "Green",
                    "Navy",
                    "Teal"
                ],
                borderWidth: 1
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false
        }
    });
}