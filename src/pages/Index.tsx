import { ClerkProvider } from "@clerk/clerk-react";
import { Navbar } from "@/components/Navbar";
import { BookCard } from "@/components/BookCard";
import { Chatbot } from "@/components/Chatbot";
import { books } from "@/data/books";

// Get the publishable key from environment variables
const CLERK_PUBLISHABLE_KEY = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY || "";

if (!CLERK_PUBLISHABLE_KEY) {
  console.error("Missing Clerk Publishable Key");
}

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