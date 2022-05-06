function client(endpoint, customConfig = {}) {
  const fullURL = `${process.env.REACT_APP_API_URL}/${endpoint}`
  const config = {
    method: 'GET',
    ...customConfig,
  }

  return window
    .fetch(fullURL, config)
    .then(async response => {
      const data = await response.json()
      if (response.ok) {
        return data
      } else {
        return Promise.reject(data)
      }
    })
}

export {client}

/*






























💰 spoiler alert below...



























































const config = {
    method: 'GET',
    ...customConfig,
  }
*/
