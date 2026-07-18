import BookList from "./BookList";

function App() {

  const books = [
    {
      id: 1,
      title: "Atomic Habits",
      author: "James Clear",
      category: "Self Help"
    },
    {
      id: 2,
      title: "The Alchemist",
      author: "Paulo Coelho",
      category: "Fiction"
    },
    {
      id: 3,
      title: "Rich Dad Poor Dad",
      author: "Robert Kiyosaki",
      category: "Finance"
    },
    {
      id: 4,
      title: "Think and Grow Rich",
      author: "Napoleon Hill",
      category: "Motivation"
    }
  ];

  return (
    <div className="container">
      <h1>Book Library</h1>
      <p>Explore Popular Books</p>

      <BookList books={books} />
    </div>
  );

}

export default App;