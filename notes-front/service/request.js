export async function getNotes (url) {
  const fetching = await fetch(url)
  const response = await fetching.json()
  const data = await response

  return data
}

export async function AddNote (url, content) {
  const feching = await fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ content })
  })
  const response = await feching.json()
  const data = await response

  return data
}

export async function deleteNote (url, id) {
  const feching = await fetch(`${url}/${id}`, {
    method: 'DELETE'
  })

  const response = await feching.json()
  const data = await response

  return data
}

export async function toggleImportant (url, id) {
  const feching = await fetch(`${url}/${id}`, {
    method: 'PUT'
  })

  const response = await feching.json()
  const data = await response

  return data
}
