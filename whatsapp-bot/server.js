const express = require('express');
const app = express();

// Use environment variables for security
const VERIFY_TOKEN = process.env.VERIFY_TOKEN || 'alot123secret';
const PHONE_NUMBER_ID = process.env.PHONE_NUMBER_ID || '908840762322599';
const ACCESS_TOKEN = process.env.ACCESS_TOKEN || 'EAARDHMtKeQwBQlf0yMf79vD42XVQB4vfENUzlpjkPTMZCcaE4ZA94oLBcb386aoU9W936oYwtKEHUdF5bjqxhj6Ufuw3ce7nG62zF5VmySJy3cVoBWl6LNeB13PvkHWzrQFkbd3di2ucnZC9vbV2k4OJjO1RUHldZCjS64QjXkZASq3qnwSdZAGuMsJoQD6q0ncUcsekLZAFZAlaLZBNwaE89RdqUICkMtbf8BVi7LAOEYhinwP67oePgDQwEsaRVZAW0lGlwW5H1GJhZBgmKVR21Hg';

app.use(express.json());

// Root endpoint - just to see if server is running
app.get('/', (req, res) => {
    res.send('🤖 WhatsApp Bot is running!');
});

// Webhook verification (GET request)
app.get('/webhook', (req, res) => {
    console.log('🔍 Verification request received');
    console.log('Query params:', req.query);
    
    const mode = req.query['hub.mode'];
    const token = req.query['hub.verify_token'];
    const challenge = req.query['hub.challenge'];

    if (mode === 'subscribe' && token === VERIFY_TOKEN) {
        console.log('✅ Webhook verified successfully!');
        res.status(200).send(challenge);
    } else {
        console.log('❌ Verification failed');
        console.log('Expected token:', VERIFY_TOKEN);
        console.log('Received token:', token);
        res.sendStatus(403);
    }
});

// Handle incoming messages (POST request)
app.post('/webhook', (req, res) => {
    console.log('📩 Received message at:', new Date().toISOString());
    console.log('Body:', JSON.stringify(req.body, null, 2));
    
    // Always respond with 200 to acknowledge receipt
    res.sendStatus(200);
    
    // Process the message (we'll add reply logic later)
    const body = req.body;
    if (body.entry?.[0]?.changes?.[0]?.value?.messages?.[0]) {
        const message = body.entry[0].changes[0].value.messages[0];
        const from = body.entry[0].changes[0].value.metadata.phone_number_id;
        console.log(`📱 Message from: ${from}`);
        console.log(`💬 Message: ${message.text?.body || 'non-text'}`);
    }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log('='.repeat(50));
    console.log(`🚀 Server is running on port ${PORT}`);
    console.log(`🌐 Local: http://localhost:${PORT}`);
    console.log(`🌍 Webhook URL: https://your-app.onrender.com/webhook`);
    console.log(`🔑 Verify token: ${VERIFY_TOKEN}`);
    console.log('='.repeat(50));
});
