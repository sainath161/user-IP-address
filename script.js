document.addEventListener("DOMContentLoaded", function () {
    const ipAddressElement = document.getElementById("ip-address");
    const locationElement = document.getElementById("location");
    const timezoneElement = document.getElementById("timezone");
    const searchBox = document.getElementById("search-box");
    const postOfficeList = document.getElementById("post-office-list");
    const googleMap = document.getElementById("google-map");
    const getStartedButton = document.getElementById("get-started-button");

    let userIP = null;
    let postOfficesData = [];

    getStartedButton.addEventListener("click", function () {
        if (!userIP) {
            fetchUserIPAddress();
        }
        fetchUserInformation(userIP);
    });

    searchBox.addEventListener("input", function () {
        const searchText = searchBox.value.trim().toLowerCase();
        const filteredOffices = postOfficesData.filter(office =>
            office.Name.toLowerCase().includes(searchText) || office.BranchType.toLowerCase().includes(searchText)
        );
        displayPostOffices(filteredOffices, postOfficeList);
    });

    function fetchUserIPAddress() {
        fetch('https://api.ipify.org?format=json')
            .then(response => response.json())
            .then(data => {
                userIP = data.ip;
                ipAddressElement.textContent = userIP;
            })
            .catch(error => {
                console.error("Error getting user's IP address: ", error);
            });
    }

    function fetchUserInformation(userIP) {
        fetch(`https://ipapi.co/${userIP}/json/`)
            .then(response => response.json())
            .then(data => {
                locationElement.textContent = data.city ? data.city + ', ' + data.region + ', ' + data.country_name : "Location not available";
                timezoneElement.textContent = data.timezone ? data.timezone : "Timezone not available";
                
                // Set the pincode automatically based on the user's location data
                const pincode = data.postal;
                
                // Display the user's location on Google Maps
                displayLocationOnMap(data.latitude, data.longitude);

                fetchPostOffices(pincode);
            })
            .catch(error => {
                console.error("Error fetching IP information: ", error);
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
