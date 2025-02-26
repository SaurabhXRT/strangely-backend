import logger from "../../logger/logger.js";
import axios from "axios";

 export class MistralService {
    private MISTRAL_API_KEY: string;

    constructor() {
        this.MISTRAL_API_KEY = process.env.MISTRAL_API_KEY;
    }

    async getMistralResponse(messages: { role: string; content: string }[]): Promise<string> {
        try {
            if (!messages || messages.length === 0) {
                return "Messages are required";
            }

            const response = await axios.post(
                "https://api.mistral.ai/v1/chat/completions",
                {
                    model: "mistral-small-latest",
                    messages,
                    max_tokens: 1200,
                    temperature: 1.5,
                },
                { 
                    headers: { 
                        Authorization: `Bearer ${this.MISTRAL_API_KEY}`, 
                        "Content-Type": "application/json" 
                    } 
                }
            );

            return response.data.choices[0].message.content;
        } catch (error) {
            logger.log("Error calling Mistral API:", error);
            return "Error calling Mistral API";
        }
    }
}

