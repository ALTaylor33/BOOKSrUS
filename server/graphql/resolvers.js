const booksData = [
    {
      _id: '1',
      title: 'Book 1',
      authors: ['Author 1'],
      description: 'Description for Book 1',
      image: 'https://example.com/image1.jpg',
    },
    {
      _id: '2',
      title: 'Book 2',
      authors: ['Author 2'],
      description: 'Description for Book 2',
      image: 'https://example.com/image2.jpg',
    },
    // Add more book data as needed
  ];
  
  const resolvers = {
    Query: {
      books: () => booksData,
      book: (_, { _id }) => booksData.find((book) => book._id === _id),
    },
    Mutation: {
      addBook: (_, { title, authors, description, image }) => {
        const newBook = {
          _id: String(booksData.length + 1),
          title,
          authors,
          description,
          image,
        };
        booksData.push(newBook);
        return newBook;
      },
      deleteBook: (_, { _id }) => {
        const deletedBook = booksData.find((book) => book._id === _id);
        booksData = booksData.filter((book) => book._id !== _id);
        return deletedBook;
      },
    },
  };
  
  module.exports = { resolvers };