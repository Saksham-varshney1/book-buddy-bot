import { ClerkProvider } from "@clerk/clerk-react";
import { Navbar } from "@/components/Navbar";
import { BookCard } from "@/components/BookCard";
import { Chatbot } from "@/components/Chatbot";
import { useQuery } from "@tanstack/react-query";
import { fetchBooks } from "@/services/api";
import { useState } from "react";

const CLERK_PUBLISHABLE_KEY = "pk_test_dmFzdC1nYXJmaXNoLTI4LmNsZXJrLmFjY291bnRzLmRldiQ";

if (!CLERK_PUBLISHABLE_KEY) {
  console.error("Missing Clerk Publishable Key");
}

const Index = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedGenre, setSelectedGenre] = useState("");

  const { data: books = [], isLoading, error } = useQuery({
    queryKey: ['books', searchQuery, selectedGenre],
    queryFn: () => fetchBooks(searchQuery, selectedGenre),
  });

  if (isLoading) {
    return <div className="flex justify-center items-center min-h-screen">Loading...</div>;
  }

  if (error) {
    return <div className="flex justify-center items-center min-h-screen">Error loading books</div>;
  }

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