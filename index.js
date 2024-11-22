const express = require('express');
const bodyParser = require('body-parser');
const multer = require('multer');
const base64Img = require('base64-img');

const app = express();
app.use(bodyParser.json());
const PORT = 5000;

// Helper functions
const isPrime = (num) => {
    if (num < 2) return false;
    for (let i = 2; i <= Math.sqrt(num); i++) {
        if (num % i === 0) return false;
    }
    return true;
};

// POST method
app.post('/bfhl', (req, res) => {
    const { data, file_b64 } = req.body;
    let numbers = [];
    let alphabets = [];
    let highestLowercase = [];
    let isPrimeFound = false;
    let fileDetails = { file_valid: false, file_mime_type: null, file_size_kb: null };

    if (data) {
        data.forEach((item) => {
            if (!isNaN(item)) {
                numbers.push(item);
                if (isPrime(parseInt(item))) isPrimeFound = true;
            } else if (typeof item === 'string' && isNaN(item)) {
                alphabets.push(item);
                if (item === item.toLowerCase()) highestLowercase.push(item);
            }
        });
    }

    if (file_b64) {
        try {
            const filePath = base64Img.imgSync(file_b64, './uploads', 'temp');
            const fs = require('fs');
            const stats = fs.statSync(filePath);
            fileDetails = {
                file_valid: true,
                file_mime_type: require('mime-types').lookup(filePath),
                file_size_kb: (stats.size / 1024).toFixed(2),
            };
        } catch (e) {
            fileDetails.file_valid = false;
        }
    }

    res.status(200).json({
        is_success: true,
        user_id: "john_doe_17091999",
        email: "john@xyz.com",
        roll_number: "ABCD123",
        numbers,
        alphabets,
        highest_lowercase_alphabet: [highestLowercase.sort().pop()],
        is_prime_found: isPrimeFound,
        ...fileDetails,
    });
});

// GET method
app.get('/bfhl', (req, res) => {
    res.status(200).json({ operation_code: 1 });
});

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
