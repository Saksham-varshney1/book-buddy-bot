import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { MessageCircle, X } from "lucide-react";
import { books } from "@/data/books";

type Message = {
  text: string;
  isUser: boolean;
};

export const Chatbot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    { 
      text: "Hi! I'm your BookHaven assistant. I can help you find books, answer questions about our collection, or provide recommendations. How can I assist you today?",
      isUser: false 
    },
  ]);
  const [input, setInput] = useState("");

  const findBooks = (query: string) => {
    const searchTerms = query.toLowerCase().split(" ");
    return books.filter(book => 
      searchTerms.some(term => 
        book.title.toLowerCase().includes(term) ||
        book.author.toLowerCase().includes(term) ||
        book.genre.toLowerCase().includes(term) ||
        book.description.toLowerCase().includes(term)
      )
    ).slice(0, 3); // Limit to 3 results
  };

  const generateResponse = (userInput: string): string => {
    const input = userInput.toLowerCase();
    
    // Log the user input for debugging
    console.log("Processing user input:", input);

    // Check for greetings
    if (input.match(/^(hi|hello|hey|greetings)/i)) {
      return "Hello! How can I help you find your next great read?";
    }

    // Check for price-related queries
    if (input.includes("price") || input.includes("cost") || input.includes("expensive")) {
      return "Our books range from $9.99 to $29.99. Would you like me to show you books within a specific price range?";
    }

    // Check for genre-related queries
    if (input.includes("genre") || input.includes("category")) {
      return "We have books across various genres including Fiction, Non-Fiction, Self-Help, and more. What genre interests you?";
    }

    // Check for book recommendations or search
    if (input.includes("recommend") || input.includes("suggestion") || input.includes("find") || input.includes("looking for")) {
      const foundBooks = findBooks(input);
      if (foundBooks.length > 0) {
        const bookList = foundBooks
          .map(book => `"${book.title}" by ${book.author} ($${book.price})`)
          .join("\n");
        return `Based on your interest, here are some recommendations:\n${bookList}\n\nWould you like to know more about any of these books?`;
      }
      return "Could you tell me more about what kind of books you're interested in? For example, any particular genre or author you enjoy?";
    }

    // Default response
    return "I'm here to help you find the perfect book. You can ask me about specific titles, authors, genres, or get personalized recommendations. What interests you?";
  };

  const handleSend = () => {
    if (!input.trim()) return;
    
    const userMessage = { text: input, isUser: true };
    setMessages(prev => [...prev, userMessage]);

    // Log the conversation state
    console.log("Adding user message:", userMessage);
    
    setTimeout(() => {
      const botResponse = { text: generateResponse(input), isUser: false };
      setMessages(prev => [...prev, botResponse]);
      
      // Log the bot response
      console.log("Adding bot response:", botResponse);
    }, 1000);
    
    setInput("");
  };

  return (
    <>
      <Button
        className="fixed bottom-4 right-4 rounded-full h-12 w-12 p-0"
        onClick={() => setIsOpen(true)}
      >
        <MessageCircle className="h-6 w-6" />
      </Button>

      {isOpen && (
        <div className="fixed bottom-20 right-4 w-80 bg-white rounded-lg shadow-xl border">
          <div className="flex justify-between items-center p-4 border-b bg-bookstore-primary text-white rounded-t-lg">
            <h3 className="font-semibold">BookHaven Assistant</h3>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setIsOpen(false)}
              className="text-white hover:text-gray-200"
            >
              <X className="h-4 w-4" />
            </Button>
          </div>
          
          <div className="h-96 overflow-y-auto p-4 space-y-4 bg-gray-50">
            {messages.map((message, index) => (
              <div
                key={index}
                className={`flex ${
                  message.isUser ? "justify-end" : "justify-start"
                }`}
              >
                <div
                  className={`max-w-[80%] rounded-lg p-3 whitespace-pre-line ${
                    message.isUser
                      ? "bg-bookstore-primary text-white"
                      : "bg-white text-gray-800 shadow-sm border border-gray-100"
                  }`}
                >
                  {message.text}
                </div>
              </div>
            ))}
          </div>

          <div className="p-4 border-t bg-white rounded-b-lg">
            <div className="flex space-x-2">
              <Input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyPress={(e) => e.key === "Enter" && handleSend()}
                placeholder="Type your message..."
                className="flex-grow"
              />
              <Button 
                onClick={handleSend}
                className="bg-bookstore-primary hover:bg-bookstore-primary/90"
              >
                Send
              </Button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};