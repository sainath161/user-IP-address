document.addEventListener("DOMContentLoaded", function () {
    const ipAddressElement = document.getElementById("ipAddress");
    const locationElement = document.getElementById("location");
    const timezoneElement = document.getElementById("timezone");
    const searchBox = document.getElementById("searchBox");
    const postOfficesList = document.getElementById("postOffices");
    const mapElement = document.getElementById("map");

    // Extract parameters from the URL
    const urlParams = new URLSearchParams(window.location.search);
    const userIP = urlParams.get("ip");
    const location = urlParams.get("location");
    const timezone = urlParams.get("timezone");

    // Display IP information
    ipAddressElement.textContent = userIP;
    locationElement.textContent = location;
    timezoneElement.textContent = timezone;

    // Initialize the map
    initMap(location);

    // Example: Fetch post office data based on the pincode (make sure to implement this)
    fetchPostOffices("PINCODE_HERE");

    searchBox.addEventListener("input", () => {
        // Implement post office filtering logic based on the search box input
        const searchText = searchBox.value.toLowerCase();
        const postOfficeItems = postOfficesList.querySelectorAll("li");

        postOfficeItems.forEach((item) => {
            const name = item.textContent.toLowerCase();
            if (name.includes(searchText)) {
                item.style.display = "block";
            } else {
                item.style.display = "none";
            }
        });
    });
});

function initMap(location) {
    // Create a map centered at the provided location
    const map = new google.maps.Map(document.getElementById("map"), {
        zoom: 10,
        center: { lat: 0, lng: 0 }, // You will need to obtain the actual latitude and longitude
    });

    // Add a marker to the map
    const marker = new google.maps.Marker({
        position: { lat: 0, lng: 0 }, // You will need to obtain the actual latitude and longitude
        map: map,
    });
}

function fetchPostOffices(pincode) {
    // Implement the code to fetch post office data based on the pincode here
    // You may need to make an API request and populate the postOfficesList
    // with the received data.
    // Example: const postOffices = await getPostOffices(pincode);

    // Dummy data for demonstration
    const postOffices = [
        { name: "Post Office 1", branch: "Branch 1" },
        { name: "Post Office 2", branch: "Branch 2" },
    ];

    displayPostOffices(postOffices, document.getElementById("postOffices"));
}

function displayPostOffices(postOffices, postOfficesList) {
    postOfficesList.innerHTML = "";
    postOffices.forEach((office) => {
        const listItem = document.createElement("li");
        listItem.textContent = `${office.name} - ${office.branch}`;
        postOfficesList.appendChild(listItem);
    });
}