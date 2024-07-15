window.onload = function () {
    loadPercentageFunded();
};

function loadPercentageFunded(retries = 3) {
    fetch("https://api.japlanhub.com/japlan/get", {
        headers: {
            "Content-type": "application/json"
        }
    })
        .then(response => response.json())  // convert to JSON format
        .then(data => {
            let percentageFunded = (Math.round(data['data']['percentage_funded'] * 10000) / 100).toFixed(2);
            document.getElementById('percentage_funded').textContent = percentageFunded + "%";
            updateDaysRemaining(data);
            let costPerPerson = (Math.round(data['data']['per_person_required_funding'] * 100) / 100).toFixed(2);
            document.getElementById('cost_per_person').textContent = "$" + costPerPerson.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
        })
        .catch((error) => {
            console.error("Error fetching the data:", error);
            if (retries > 0) {
                console.log(`Retrying... Attempts left: ${retries - 1}`);
                setTimeout(() => loadPercentageFunded(retries - 1), 2000);
            } else {
                console.log('Failed after 3 attempts');
                document.getElementById('percentage_funded').textContent = "[FAILED TO LOAD]";
                document.getElementById('days_remaining').textContent = "[FAILED TO LOAD]";
                document.getElementById('cost_per_person').textContent = "[FAILED TO LOAD]";
            }
        });
}

function updateDaysRemaining(data) {
    let targetDate = new Date('2024-06-30');
    let currentDate = new Date();
    let diffInTime = targetDate.getTime() - currentDate.getTime();
    let diffInDays = Math.ceil(diffInTime / (1000 * 3600 * 24));

    let daysLeft = Math.max(0, diffInDays);

    document.getElementById('days_remaining').textContent = daysLeft;
}

