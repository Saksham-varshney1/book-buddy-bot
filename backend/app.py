from flask import Flask, jsonify, request
from flask_cors import CORS
from flask_sqlalchemy import SQLAlchemy
from datetime import datetime

app = Flask(__name__)
CORS(app)

# Configure SQLAlchemy
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///books.db'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
db = SQLAlchemy(app)

# Book Model
class Book(db.Model):
    id = db.Column(db.String(50), primary_key=True)
    title = db.Column(db.String(200), nullable=False)
    author = db.Column(db.String(100), nullable=False)
    price = db.Column(db.Float, nullable=False)
    coverImage = db.Column(db.String(500), nullable=False)
    description = db.Column(db.Text, nullable=False)
    genre = db.Column(db.String(50), nullable=False)
    created_at = db.Column(db.DateTime, default=datetime.utcnow)

# Routes
@app.route('/api/books', methods=['GET'])
def get_books():
    search_query = request.args.get('q', '')
    genre_filter = request.args.get('genre', '')
    
    query = Book.query
    
    if search_query:
        search = f"%{search_query}%"
        query = query.filter(
            db.or_(
                Book.title.ilike(search),
                Book.author.ilike(search),
                Book.description.ilike(search)
            )
        )
    
    if genre_filter:
        query = query.filter(Book.genre == genre_filter)
    
    books = query.all()
    return jsonify([{
        'id': book.id,
        'title': book.title,
        'author': book.author,
        'price': book.price,
        'coverImage': book.coverImage,
        'description': book.description,
        'genre': book.genre
    } for book in books])

@app.route('/api/books/<string:id>', methods=['GET'])
def get_book(id):
    book = Book.query.get_or_404(id)
    return jsonify({
        'id': book.id,
        'title': book.title,
        'author': book.author,
        'price': book.price,
        'coverImage': book.coverImage,
        'description': book.description,
        'genre': book.genre
    })

# Initialize database
def init_db():
    with app.app_context():
        db.create_all()
        
        # Check if we already have books
        if Book.query.first() is None:
            from seed_data import books
            for book_data in books:
                book = Book(**book_data)
                db.session.add(book)
            db.session.commit()
            print("Database seeded!")

if __name__ == '__main__':
    init_db()
    app.run(debug=True)