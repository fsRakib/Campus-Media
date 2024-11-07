import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import HashLoader from "react-spinners/HashLoader";
import { CHIT_API_END_POINT } from "../utils/constant";

const Explore = () => {
  const [message, setMessage] = useState("");
  const [chatHistory, setChatHistory] = useState([]);
  const [loading, setLoading] = useState(false);
  const chatEndRef = useRef(null);

  const delayPara = (index, nextWord, currentResponse) => {
    setTimeout(() => {
      setChatHistory((prevChatHistory) => {
        const updatedChatHistory = [...prevChatHistory];
        const lastMessage = updatedChatHistory[updatedChatHistory.length - 1];
        if (lastMessage && lastMessage.type === "bot" && lastMessage.isTyping) {
          lastMessage.text = currentResponse + nextWord;
        }
        return updatedChatHistory;
      });
      chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }, 10 * index);
  };

  const handleSent = async (prompt) => {
    setMessage(""); 
    setLoading(true);

    const userMessage = { type: "user", text: prompt || message };
    setChatHistory((prevChatHistory) => [
      ...prevChatHistory,
      userMessage,
      { type: "loading" },
    ]);

    try {
      const response = await runChat(prompt || message);
      let responseArray = response.split("**");
      let newResponse = "";
      for (let i = 0; i < responseArray.length; i++) {
        if (i === 0 || i % 2 !== 1) {
          newResponse += responseArray[i];
        } else {
          newResponse += "<br/><b>" + responseArray[i] + "</b>";
        }
      }

      let newResponse2 = newResponse.split("*").join("<br/>");
      let newResponseArray = newResponse2.split("");

      setChatHistory((prevChatHistory) => {
        const updatedChatHistory = prevChatHistory.slice(0, -1);
        return [
          ...updatedChatHistory,
          { type: "bot", text: "", isTyping: true },
        ];
      });

      for (let i = 0; i < newResponseArray.length; i++) {
        const nextWord = newResponseArray[i];
        delayPara(i, nextWord, newResponse2.slice(0, i + 1));
      }

      setTimeout(() => {
        setChatHistory((prevChatHistory) => {
          const updatedChatHistory = [...prevChatHistory];
          const lastMessage = updatedChatHistory[updatedChatHistory.length - 1];
          if (lastMessage && lastMessage.type === "bot") {
            lastMessage.isTyping = false;
          }
          return updatedChatHistory;
        });
        chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
      }, 10 * newResponseArray.length);
    } catch (error) {
      console.error("Error while running chat:", error);
      const errorMessage = {
        type: "bot",
        text: "Error generating response. Please try again.",
      };
      setChatHistory((prevChatHistory) => {
        const updatedChatHistory = prevChatHistory.slice(0, -1);
        return [...updatedChatHistory, errorMessage];
      });
    } finally {
      setLoading(false);
      setMessage(""); 
    }
  };

  // Updated runChat to call your backend API endpoint
  const runChat = async (input) => {
    try {
      const res = await axios.post( `${CHIT_API_END_POINT}/chat`, { userInput: input });
      return res.data;
    } catch (error) {
      console.error("Error in runChat:", error);
      throw new Error("Chat API request failed");
    }
  };

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [chatHistory]);

  const handleKeyPress = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSent(message);
    }
  };

  return (
    <div className="w-[50%] border-l border-r border-gray-200">
      <div
        className="w-full max-w-2xl bg-gray-200 rounded-lg shadow-lg p-4 flex flex-col justify-between"
        style={{ height: "100vh", paddingRight: "1rem" }}
      >
        <div className="flex-grow mb-4 overflow-y-auto pr-4">
          {chatHistory.map((chat, index) => (
            <div
              key={index}
              className={`w-full flex ${
                chat.type === "user" ? "justify-end" : "justify-start"
              } mb-4`}
            >
              {chat.type === "loading" ? (
                <div className="w-full flex justify-center items-center my-4 ">
                  <HashLoader color={"#000000"} loading={true} size={50} />
                </div>
              ) : (
                <div
                  className={`inline-block p-2 rounded-lg break-words text-justify ${
                    chat.type === "user"
                      ? "bg-gray-300 text-black-900"
                      : "bg-green-300 text-gray-800"
                  }`}
                  style={{ maxWidth: "75%" }}
                  dangerouslySetInnerHTML={{ __html: chat.text }}
                ></div>
              )}
            </div>
          ))}
          <div ref={chatEndRef}></div>
        </div>

        <div className="flex items-center">
          <textarea
            className="w-full h-10 p-2 border border-gray-300 rounded-l-lg focus:outline-none focus:ring-2 focus:ring-green-500"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder="Ask me anything here..."
            disabled={loading}
          ></textarea>
          <button
            className="ml-2 h-10 px-4 bg-[#39ff14] text-black font-bold rounded-r-lg hover:bg-blue-600 transition focus:outline-none focus:ring-2 focus:ring-blue-500"
            onClick={() => handleSent(message)}
            disabled={loading}
          >
            Send
          </button>
        </div>
      </div>
    </div>
  );
};

export default Explore;
