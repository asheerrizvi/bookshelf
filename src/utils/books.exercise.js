import {useQuery} from 'react-query'
import {client} from './api-client.exercise'
import bookPlaceholderSvg from 'assets/book-placeholder.svg'

const loadingBook = {
  title: 'Loading...',
  author: 'loading...',
  coverImageUrl: bookPlaceholderSvg,
  publisher: 'Loading Publishing',
  synopsis: 'Loading...',
  loadingBook: true,
}

function useBook(bookId, user) {
  const {data: book = loadingBook, error, isLoading, isError, isSuccess} = useQuery({
    queryKey: ['book', {bookId}],
    queryFn: () =>
      client(`books/${bookId}`, {token: user.token}).then(data => data.book),
  })

  return {book, error, isLoading, isError, isSuccess};
}

const loadingBooks = Array.from({length: 10}, (v, index) => ({
  id: `loading-book-${index}`,
  ...loadingBook,
}))

function useBookSearch(query, user) {
  const {
    data: books = loadingBooks,
    error,
    isLoading,
    isError,
    isSuccess,
  } = useQuery({
    queryKey: ['bookSearch', {query}],
    queryFn: () =>
      client(`books?query=${encodeURIComponent(query)}`, {
        token: user.token,
      }).then(data => data.books),
  })

  return {books, error, isLoading, isError, isSuccess};
}

export {useBook, useBookSearch}
