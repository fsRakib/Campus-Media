import { GoogleGenerativeAI } from '@google/generative-ai';
import dotenv from 'dotenv';

dotenv.config();

const MODEL_NAME = "gemini-pro";
const API_KEY = process.env.GOOGLE_API_KEY;

async function runChat(userInput) {
  try {
    console.log("Running chat with input:", userInput);  // Log the user input
    const genAI = new GoogleGenerativeAI(API_KEY);
    const model = genAI.getGenerativeModel({ model: MODEL_NAME });

    const generationConfig = {
      temperature: 0.7,
      maxOutputTokens: 500,
    };

    const chat = model.startChat({ generationConfig });
    const result = await chat.sendMessage(userInput);
    console.log("Generated Response:", result.response.text());  // Log the API response
    return result.response.text();
  } catch (error) {
    console.error("Error in runChat:", error);  // Log the specific error in runChat
    throw new Error("Google Generative AI API error");
  }
}

export async function chatHandler(req, res) {
  try {
    const userInput = req.body?.userInput;
    console.log("Received user input:", userInput);  // Log received input

    if (!userInput) {
      return res.status(400).json({ error: 'No input provided' });
    }

    const response = await runChat(userInput);
    console.log("API Response:", response);  // Log the final response
    res.json({ response });
  } catch (error) {
    console.error('Error in chat endpoint:', error);
    res.status(500).json({ error: 'Internal Server Error', details: error.message });
  }
}
