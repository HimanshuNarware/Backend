const express = require('express');
const cors = require('cors');

const app = express();

// Middleware
app.use(express.json());

// Enable CORS for all routes
app.use(cors({
    origin: 'https://frontend-json.netlify.app/', // Replace with your frontend's origin
    methods: ['GET', 'POST'], // Allow only these methods
    allowedHeaders: ['Content-Type'], // Allow only specific headers
}));
app.get('/',(req,res)=>{
    res.send({
        message:"success"
    })
})
// Routes
app.post('/bfhl', (req, res) => {
    // Your logic for POST request
    const data = req.body.data || [];
    const file_b64 = req.body.file_b64 || null;

    // Process input
    const numbers = data.filter(item => !isNaN(Number(item)));
    const alphabets = data.filter(item => isNaN(Number(item)));
    const highestLowercase = alphabets.filter(item => /^[a-z]$/.test(item))
                                       .sort()
                                       .slice(-1);

    const isPrimeFound = numbers.some(num => isPrime(Number(num)));

    res.json({
        is_success: true,
        user_id: "john_doe_17091999", // Replace with dynamic user ID if needed
        email: "john@xyz.com",
        roll_number: "ABCD123",
        numbers,
        alphabets,
        highest_lowercase_alphabet: highestLowercase,
        is_prime_found: isPrimeFound,
        file_valid: !!file_b64,
        file_mime_type: file_b64 ? "image/png" : null, // Example MIME type
        file_size_kb: file_b64 ? 400 : null // Example file size
    });
});

app.get('/bfhl', (req, res) => {
    res.status(200).json({
        operation_code: 1
    });
});

// Helper function to check for prime numbers
function isPrime(num) {
    if (num <= 1) return false;
    for (let i = 2; i <= Math.sqrt(num); i++) {
        if (num % i === 0) return false;
    }
    return true;
}

// Start the server
const PORT = 5000;
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
    
});
