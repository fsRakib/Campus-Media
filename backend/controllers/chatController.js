import { GoogleGenerativeAI } from '@google/generative-ai';
import dotenv from 'dotenv';

dotenv.config();

const MODEL_NAME = "gemini-pro";
const API_KEY = process.env.GOOGLE_API_KEY;

async function runChat(userInput) {
  try {
    // console.log("Running chat with input:", userInput);  
    const genAI = new GoogleGenerativeAI(API_KEY);
    const model = genAI.getGenerativeModel({ model: MODEL_NAME });

    const generationConfig = {
      temperature: 0.7,
      maxOutputTokens: 500,
    };

    const chat = model.startChat({ generationConfig });
    const result = await chat.sendMessage(userInput);
    // console.log("Generated Response:", result.response.text()); 

    return result.response.text(); 
  } catch (error) {
    console.error("Error in runChat:", error);  
    throw new Error("Google Generative AI API error");
  }
}

export async function chatHandler(req, res) {
  try {
    const userInput = req.body?.userInput;
    console.log("Received user input:", userInput); 

    if (!userInput) {
      return res.status(400).send('No input provided'); 
    }

    const response = await runChat(userInput);
    console.log("API Response:", response);  

    res.status(200).send(response); 
  } catch (error) {
    console.error('Error in chat endpoint:', error);
    res.status(500).send('Internal Server Error');
  }
}
