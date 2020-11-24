export const setSortBy = (name) => ({
   type: 'LOAD_SORT_BY',
   payload: name
})

export const setPenCategory = (catIndex) =>( {
   type: 'LOAD_CATEGORY',
   payload: catIndex
})