document.addEventListener("DOMContentLoaded", function () {
    const getInfoButton = document.getElementById("getInfoButton");

    getInfoButton.addEventListener("click", async () => {
        try {
            const userIP = await getUserIPAddress();
            const ipInfo = await getIPInformation(userIP);

            // Open a new page with the IP information
            openNewPage(userIP, ipInfo);
        } catch (error) {
            console.error("Error:", error);
        }
    });

    async function getUserIPAddress() {
        try {
            const response = await fetch('https://api.ipify.org?format=json');
            const data = await response.json();
            return data.ip;
        } catch (error) {
            console.error("Error getting user's IP address: ", error);
            throw error;
        }
    }

    async function getIPInformation(userIP) {
        try {
            const response = await fetch(`https://ipapi.co/${userIP}/json/`);
            if (!response.ok) {
                throw new Error('Error fetching IP information');
            }
            const data = await response.json();
            return {
                location: `${data.city}, ${data.region}, ${data.country_name}`,
                timezone: data.timezone,
                pincode: data.postal,
            };
        } catch (error) {
            console.error("Error getting IP information: ", error);
            throw error;
        }
    }

    function openNewPage(userIP, ipInfo) {
        const newPage = window.open("", "_blank");

        newPage.document.write(`
            <html>
            <head>
                <link rel="stylesheet" type="text/css" href="styles.css">
            </head>
            <body>
                <div class="container">
                    <h1>IP Information and Post Offices</h1>
                    <div id="ipInfo">
                        <p><strong>IP Address:</strong> ${userIP}</p>
                        <p><strong>Location:</strong> ${ipInfo.location}</p>
                        <p><strong>Timezone:</strong> ${ipInfo.timezone}</p>
                    </div>
                    <div id="map"></div>
                    <input type="text" id="searchBox" placeholder="Search Post Offices">
                    <ul id="postOffices"></ul>
                </div>
                <script src="newPageScript.js"></script>
            </body>
            </html>
        `);
    }
});
