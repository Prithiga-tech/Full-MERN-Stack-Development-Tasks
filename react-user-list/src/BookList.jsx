function BookList({ books }) {

    return (

        <div className="book-container">

            {books.map((book) => (

                <div className="book-card" key={book.id}>

                    <h2>{book.title}</h2>

                    <p><strong>Author:</strong> {book.author}</p>

                    <p><strong>Category:</strong> {book.category}</p>

                </div>

            ))}

        </div>

    );

}

export default BookList;