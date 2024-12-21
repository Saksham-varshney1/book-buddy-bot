import { Book } from "@/types/book";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

interface BookCardProps {
  book: Book;
}

export const BookCard = ({ book }: BookCardProps) => {
  const handleAddToCart = () => {
    toast.success("Added to cart!");
  };

  return (
    <Card className="flex flex-col h-full hover:shadow-lg transition-shadow duration-200">
      <CardContent className="p-4 flex-grow">
        <div className="aspect-[2/3] relative mb-4">
          <img
            src={book.coverImage}
            alt={book.title}
            className="object-cover w-full h-full rounded-md"
          />
        </div>
        <h3 className="font-serif font-bold text-lg mb-1 line-clamp-2">
          {book.title}
        </h3>
        <p className="text-sm text-gray-600 mb-2">{book.author}</p>
        <p className="text-lg font-bold text-bookstore-primary">${book.price}</p>
      </CardContent>
      <CardFooter className="p-4 pt-0">
        <Button onClick={handleAddToCart} className="w-full">
          Add to Cart
        </Button>
      </CardFooter>
    </Card>
  );
};