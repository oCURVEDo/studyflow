export default async function handler(req, res) {
    // This part handles the security
    if (req.method !== 'POST') {
        return res.status(405).json({ error: 'Method not allowed' });
    }

    const { topic } = req.body;
    // This looks for the secret key you will hide in Vercel settings later
    const apiKey = process.env.PPLX_API_KEY; 

    try {
        const response = await fetch('https://api.perplexity.ai/chat/completions', {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${apiKey}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                model: "sonar",
                messages: [
                    { role: "system", content: "You are a professional academic assistant." },
                    { role: "user", content: `Create a detailed essay outline for: ${topic}` }
                ]
            })
        });

        const data = await response.json();
        res.status(200).json(data);
    } catch (error) {
        res.status(500).json({ error: 'Failed to connect to AI' });
    }
}