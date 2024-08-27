document.addEventListener('DOMContentLoaded', function() {
    document.getElementById('emailForm').addEventListener('submit', async function(event) {
        event.preventDefault();

        // Fetching the values from the form fields
        const from = document.getElementById('from').value; // Include 'from'
        const to = document.getElementById('to').value;
        const subject = document.getElementById('subject').value;
        const text = document.getElementById('text').value; // Ensure correct field name

        try {
            const response = await fetch('http://localhost:4000/send-email', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ from, to, subject, text }) // Include 'from'
            });

            const result = await response.json();
            const responseMessage = document.getElementById('responseMessage');

            if (result.success) {
                responseMessage.innerText = 'Email sent successfully!';
                responseMessage.style.color = 'green';
            } else {
                responseMessage.innerText = 'Failed to send email.';
                responseMessage.style.color = 'red';
            }
        } catch (error) {
            console.error('Error:', error);
            const responseMessage = document.getElementById('responseMessage');
            responseMessage.innerText = 'Error sending email.';
            responseMessage.style.color = 'red';
        }
    });
});
