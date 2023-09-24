async function getData(query) {
  let response = await fetch(`https://temp-bga-api-c4bd0c7481bf.herokuapp.com/api/search?${query}&client_id=Efb4IXjG2E`)
  if (!response.ok) { 
    throw new Error(response.statusText)
  }
  let data = await response.json()
  return data
} 

export {getData}


