


async function getData(query) {
  let response = await fetch(`https://api.boardgameatlas.com/api/search?${query}&client_id=iFrcfZiq9e`)
  if (!response.ok) { 
    throw new Error(response.statusText)
  }
  let data = await response.json()
  return data
} 


// 'https:api.boardgameatlas.com/api/search?year_published=2019&client_id=iFrcfZiq9e'

export {getData}
