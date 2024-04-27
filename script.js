// Include font
import { GeistSans } from 'geist/font/sans';
import { GeistMono } from 'geist/font/mono';

// Load the Google Sheets API client library.
gapi.load('client:auth2', initClient);

function initClient() {
    gapi.client.init({
        apiKey: 'YOUR_API_KEY',
        clientId: 'YOUR_CLIENT_ID',
        discoveryDocs: ["https://sheets.googleapis.com/$discovery/rest?version=v4"],
        scope: "https://www.googleapis.com/auth/spreadsheets.readonly"
    }).then(function () {
        // Load the data from your Google Sheet
        loadFragranceData();
    });
}

function loadFragranceData() {
    gapi.client.sheets.spreadsheets.values.get({
        spreadsheetId: 'YOUR_SPREADSHEET_ID',
        range: 'Sheet1'
    }).then(function(response) {
        var data = response.result.values;
        var html = '';

        // Loop through each row of data and create HTML
        data.forEach(function(row) {
            html += '<div class="fragrance">';
            html += '<h2>' + row[0] + '</h2>'; // Name
            html += '<p>Clone: ' + row[1] + '</p>'; // Clone
            html += '<p>Price: ' + row[2] + '</p>'; // Price
            html += '<p>Rating: ' + row[3] + '</p>'; // Rating
            html += '</div>';
        });

        // Add the HTML to the page
        document.getElementById('fragranceData').innerHTML = html;
    });
}
