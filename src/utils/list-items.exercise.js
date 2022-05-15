import {useQuery, useMutation, queryCache} from 'react-query'
import {client} from './api-client.exercise'

function useListItem(user, bookId) {
  const {listItems} = useListItems(user)
  const listItem = listItems?.find(li => li.bookId === bookId) ?? null

  return listItem
}

function useListItems(user) {
  const {
    data: listItems,
    error,
    isLoading,
    isError,
    isSuccess,
  } = useQuery({
    queryKey: 'list-items',
    queryFn: () =>
      client(`list-items`, {token: user.token}).then(data => data.listItems),
  })

  return {listItems, error, isLoading, isError, isSuccess}
}

function useUpdateListItem(user) {
  const [update] = useMutation(
    updates =>
      client(`list-items/${updates.id}`, {
        method: 'PUT',
        data: updates,
        token: user.token,
      }),
    {onSettled: () => queryCache.invalidateQueries('list-items')},
  )

  return update
}

function useRemoveListItem(user) {
  const [remove] = useMutation(
    ({id}) => client(`list-items/${id}`, {method: 'DELETE', token: user.token}),
    {onSettled: () => queryCache.invalidateQueries('list-items')},
  )

  return remove
}

function useCreateListItem(user) {
  const [create] = useMutation(
    ({bookId}) => client(`list-items`, {data: {bookId}, token: user.token}),
    {onSettled: () => queryCache.invalidateQueries('list-items')},
  )

  return create
}

export {
  useListItem,
  useListItems,
  useUpdateListItem,
  useRemoveListItem,
  useCreateListItem,
}
