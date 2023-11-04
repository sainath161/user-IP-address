document.addEventListener("DOMContentLoaded", function () {
    const ipAddressElement = document.getElementById("ip-address");
    const locationElement = document.getElementById("location");
    const timezoneElement = document.getElementById("timezone");
    const searchBox = document.getElementById("search-box");
    const postOfficeList = document.getElementById("post-office-list");
    const googleMap = document.getElementById("google-map");
    const getStartedButton = document.getElementById("get-started-button");

    let postOfficesData = [];

    getStartedButton.addEventListener("click", function () {
        fetchUserLocation();
    });

    searchBox.addEventListener("input", function () {
        const searchText = searchBox.value.trim().toLowerCase();
        const filteredOffices = postOfficesData.filter(office =>
            office.Name.toLowerCase().includes(searchText) || office.BranchType.toLowerCase().includes(searchText)
        );
        displayPostOffices(filteredOffices, postOfficeList);
    });

    function fetchUserLocation() {
        if ("geolocation" in navigator) {
            navigator.geolocation.getCurrentPosition(function (position) {
                const latitude = position.coords.latitude;
                const longitude = position.coords.longitude;

                displayLocationOnMap(latitude, longitude);
                fetchPincode(latitude, longitude);
            });
        } else {
            locationElement.textContent = "Location not available";
            console.error("Geolocation is not supported by the browser.");
        }
    }

    function fetchPincode(latitude, longitude) {
        // You can use a reverse geocoding service to get the pincode based on latitude and longitude.
        // Here, we are using a placeholder URL. Replace it with a suitable reverse geocoding API.
        const reverseGeocodingUrl = `https://api.example.com/reverse-geocoding?lat=${latitude}&long=${longitude}`;

        fetch(reverseGeocodingUrl)
            .then(response => response.json())
            .then(data => {
                if (data.pincode) {
                    fetchPostOffices(data.pincode);
                } else {
                    locationElement.textContent = "Location not available";
                    console.error("Pincode not found in reverse geocoding data.");
                }
            })
            .catch(error => {
                locationElement.textContent = "Location not available";
                console.error("Error fetching reverse geocoding data: ", error);
            });
    }

    function displayLocationOnMap(lat, long) {
        const googleMapsUrl = `https://www.google.com/maps/embed/v1/place?q=${lat},${long}&key=AIzaSyA8nH8iWGdG31PusBw0XJTQt4h5v93B-zg`; // Replace 'YOUR_API_KEY' with your Google Maps API key
        googleMap.src = googleMapsUrl;
    }

    function fetchPostOffices(pincode) {
        fetch(`https://api.postalpincode.in/pincode/${pincode}`)
            .then(response => response.json())
            .then(data => {
                postOfficesData = data[0].PostOffice;
                displayPostOffices(postOfficesData, postOfficeList);
            })
            .catch(error => {
                locationElement.textContent = "Location not available";
                console.error("Error fetching post offices: ", error);
            });
    }

    function displayPostOffices(postOffices, postOfficesList) {
        postOfficesList.innerHTML = "";
        postOffices.forEach(office => {
            const listItem = document.createElement("li");
            listItem.textContent = `${office.Name} - ${office.BranchType}`;
            postOfficesList.appendChild(listItem);
        });
    }
});
