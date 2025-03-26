const skillInput = document.getElementById('skillInput');
const searchBtn = document.getElementById('searchBtn');
const jobResults = document.getElementById('jobResults');
let timer;

searchBtn.addEventListener('click', () => {
    // Clear previous results and show loading animation
    jobResults.innerHTML = '<div class="loading-spinner"></div>';

    // Apply throttling (200ms)
    clearTimeout(timer);
    timer = setTimeout(() => {
        fetchJobData(skillInput.value);
    }, 200);
});

async function fetchJobData(skill) {
    const url = `https://jsearch.p.rapidapi.com/search?query=${skill}%20jobs&page=1&num_pages=1&country=us&date_posted=all`;
    const options = {
        method: 'GET',
        headers: {
            'x-rapidapi-key': 'd3b2d1a473mshedd940507b07c7ap1c9604jsn08212d19efeb',
            'x-rapidapi-host': 'jsearch.p.rapidapi.com'
        }
    };

    try {
        const response = await fetch(url, options);
        const data = await response.json();

        // Clear loading animation
        jobResults.innerHTML = '';

        // Check if data is available
        if (data && data.data && data.data.length > 0) {
            displayJobCards(data.data);
        } else {
            jobResults.innerHTML = 'No jobs found for the entered skill.';
        }
    } catch (error) {
        console.error('Error fetching data:', error);
        jobResults.innerHTML = 'Error fetching job data. Please try again later.';
    }
}

function displayJobCards(jobs) {
    jobs.forEach(job => {
        const card = document.createElement('div');
        card.classList.add('job-card');

        card.innerHTML = `
            <h3>${job.job_title}</h3>
            <p><strong>Employer:</strong> ${job.employer_name || 'Not available'}</p>
            <p><strong>Location:</strong> ${job.job_state || 'Not available'}</p>
            <p><strong>Experience:</strong> ${job.required_experience || 'Not specified'}</p>
            <a href="${job.job_apply_link}" target="_blank">Apply Here</a>
        `;

        jobResults.appendChild(card);
    });
}
