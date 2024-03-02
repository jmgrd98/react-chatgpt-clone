import express from 'express';
import cors from 'cors';

const app = express();

app.use(cors());
app.use(express.json());

const OPENAI_API_KEY="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"

app.get('/', (req, res) => {
    res.send('Hello, World!');
});

app.post('/completions', async (req: any, res: any) => {

    const options = {
        method: 'POST',
        headers: {
            'Authorization': `Bearer ${OPENAI_API_KEY}`,
            'Content-Tyoe': 'application/json'
        },
        body: JSON.stringify({
            model: 'gpt-3.5-turbo',
            messages: [
                {
                    role: 'user',
                    content: req.body.message
                }
            ],
            max_tokens: 100
        })
    }

    try {
        const response = await fetch('\n' + 'https://api.openai.com/v1/chat/completions', options);
        const data = await response.json();
        res.send(data);
    } catch (error) {
        console.error(error);
    }
});

const PORT = 5000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
