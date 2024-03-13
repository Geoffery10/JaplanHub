window.onload = function() {
    loadPercentageFunded();
};

function loadPercentageFunded(retries = 3) {
    fetch("https://api.japlanhub.com/japlan/get", {
        headers: {
            "apikey": "1efc43c6-91a0-4b62-9beb-3dccb0491745",
            "Content-type": "application/json"
        }
    })
    .then(response => response.json())  // convert to JSON format
    .then(data => {
        let percentageFunded = (Math.round(data['data']['percentage_funded'] * 10000) / 100).toFixed(2);
        document.getElementById('percentage_funded').textContent = percentageFunded + "%";
        document.getElementById('days_remaining').textContent = data['data']['days_left'];
        document.getElementById('cost_per_person').textContent = "$" + (Math.round(data['data']['per_person_required_funding'] * 100) / 100).toFixed(2);
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