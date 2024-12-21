import { ClerkProvider } from "@clerk/clerk-react";
import { Navbar } from "@/components/Navbar";
import { BookCard } from "@/components/BookCard";
import { Chatbot } from "@/components/Chatbot";
import { books } from "@/data/books";

const CLERK_PUBLISHABLE_KEY = "your_clerk_key"; // Replace with actual key

const Index = () => {
  return (
    <ClerkProvider publishableKey={CLERK_PUBLISHABLE_KEY}>
      <div className="min-h-screen bg-bookstore-background">
        <Navbar />
        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {books.map((book) => (
              <BookCard key={book.id} book={book} />
            ))}
          </div>
        </main>
        <Chatbot />
      </div>
    </ClerkProvider>
  );
};

export default Index;