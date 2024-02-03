const pagination = (data, limit, page) => {
    const pageInt = parseInt(page)
    const limitInt = parseInt(limit)
  
    const startIndex = (pageInt - 1) * limitInt
    const endIndex = pageInt * limitInt
  
    const results = {
        next: {
            page: pageInt + 1,
            limit: limitInt,
        },
        previous: startIndex > 0 ? {
            page: pageInt - 1,
            limit: limitInt,
        } : null,
        results: data.slice(startIndex, endIndex)
    }
    return results
}
  
  export default pagination