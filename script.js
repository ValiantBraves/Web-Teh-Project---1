const apiKey = '';  // Replace with your actual YouTube API key CO23306
const searchButton = document.getElementById('search-btn');
const searchInput = document.getElementById('search-input');
const resultsContainer = document.getElementById('results-container');
const playerContainer = document.getElementById('player-container');
const loadMoreButton = document.getElementById('load-more-btn');
const playerSection = document.getElementById('player-section');

let nextPageToken = '';
let currentVideoId = null;
let allResults = [];
let currentResults = [];

// Function to search YouTube videos
async function searchYouTube(query, pageToken = '') {
    const url = `https://www.googleapis.com/youtube/v3/search?part=snippet&q=${query}&type=video&maxResults=25&pageToken=${pageToken}&key=${apiKey}`;
    
    try {
        const response = await fetch(url);
        const data = await response.json();
        
        // Save next page token
        nextPageToken = data.nextPageToken || '';
        
        // Display results
        displayResults(data.items);

        // Show/hide Load More button based on availability of more results
        if (nextPageToken) {
            loadMoreButton.style.display = 'block';
        } else {
            loadMoreButton.style.display = 'none';
        }
    } catch (error) {
        console.error('Error fetching YouTube data:', error);
    }
}

// Function to display search results
function displayResults(items) {
    items.forEach(item => {
        const videoId = item.id.videoId;
        const title = item.snippet.title;
        const thumbnail = item.snippet.thumbnails.medium.url;

        const resultItem = document.createElement('div');
        resultItem.classList.add('result-item');
        resultItem.innerHTML = `
            <img src="${thumbnail}" alt="${title}">
            <h3>${title}</h3>
            <button onclick="playVideo('${videoId}')">Play</button>
        `;
        resultsContainer.appendChild(resultItem);

        // Store the results for possible future use
        currentResults.push(item);
    });
}

// Function to play video in custom player
function playVideo(videoId) {
    currentVideoId = videoId;
    const iframe = document.createElement('iframe');
    iframe.src = `https://www.youtube.com/embed/${videoId}?autoplay=1`;
    iframe.width = '100%';
    iframe.height = '400px';
    iframe.frameBorder = '0';
    iframe.allow = 'accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture';
    iframe.allowFullscreen = true;

    playerContainer.innerHTML = '';  // Clear previous player
    playerContainer.appendChild(iframe);

    // Show the player section
    playerSection.style.display = 'block';
}

// Event listener for search button
searchButton.addEventListener('click', () => {
    const query = searchInput.value.trim();
    if (query) {
        resultsContainer.innerHTML = ''; // Clear previous results
        currentResults = [];
        searchYouTube(query);
    } else {
        alert('Please enter a search query.');
    }
});

// Event listener for "Load More" button
loadMoreButton.addEventListener('click', () => {
    const query = searchInput.value.trim();
    if (query && nextPageToken) {
        searchYouTube(query, nextPageToken);
    }
});

// Optionally, add a listener to allow pressing Enter to search
searchInput.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') {
        searchButton.click();
    }
});


