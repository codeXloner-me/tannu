document.addEventListener('DOMContentLoaded', () => {
    const duoForm = document.getElementById('duo-form');
    const listingsContainer = document.getElementById('listings-container');

    // Load any existing requests from local storage
    let requests = JSON.parse(localStorage.getItem('duoRequests')) || [];
    requests.forEach(request => {
        addRequestCard(request);
    });

    duoForm.addEventListener('submit', (e) => {
        e.preventDefault(); // Prevents the form from refreshing the page

        const username = document.getElementById('username').value;
        const rank = document.getElementById('rank').value;
        const message = document.getElementById('message').value;

        // Create a new request object
        const newRequest = {
            username,
            rank,
            message,
            date: new Date().toLocaleDateString()
        };

        // Add the new request to the list and local storage
        requests.unshift(newRequest); // Add to the beginning of the array
        localStorage.setItem('duoRequests', JSON.stringify(requests));

        // Add the new request card to the page
        addRequestCard(newRequest);

        // Clear the form fields
        duoForm.reset();
    });

    function addRequestCard(request) {
        // Create the card element
        const card = document.createElement('div');
        card.classList.add('duo-card');

        // Populate the card with the request data
        card.innerHTML = `
            <h3>${request.username}</h3>
            <p><strong>Rank:</strong> <span>${request.rank}</span></p>
            <p><strong>Message:</strong> ${request.message}</p>
            <p><small>Posted on: ${request.date}</small></p>
        `;

        // Add the new card to the top of the container
        listingsContainer.prepend(card);
    }
});