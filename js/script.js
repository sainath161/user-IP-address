// Get references to HTML elements
const ipAdd = document.getElementsByClassName("ip")[0];
const startBtn = document.getElementById("get-started");

// Fetch the user's IP address on page load
async function fetchIP() {
    try {
        const response = await fetch(`https://api.ipify.org/?format=json`);
        const data = await response.json();
        ipAdd.innerText = data.ip;
        // Store the IP address in local storage
        storeIp(data);
    } catch (error) {
        console.log(error);
    }
}

fetchIP();

// Add a click event listener to the "Get Started" button
startBtn.addEventListener("click", async () => {
    // Request the user's geolocation
    await navigator.geolocation.getCurrentPosition(success, failed);
});

// Function to store the user's IP address in local storage
function storeIp(data) {
    localStorage.setItem("ip", data.ip);
}

// Success callback function when geolocation is retrieved
function success(position) {
    console.log(position);
    // Store the latitude and longitude in local storage
    localStorage.setItem("lat", position.coords.latitude);
    localStorage.setItem("long", position.coords.longitude);
    // Redirect to the "main.html" page
    window.location.href = "./main.html";
}

// Error callback function when geolocation is not available or denied
function failed() {
    alert("Please grant access to your location for this application.");
}
