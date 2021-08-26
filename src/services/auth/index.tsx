export const setHeaderParams = ({ CLIENT_TOKEN, CLIENT_ID }) => {
  localStorage.setItem('CLIENT_TOKEN', CLIENT_TOKEN)
  localStorage.setItem('CLIENT_ID', CLIENT_ID)
}

export const getHeaderParams = () => {
  return {
    CLIENT_TOKEN: localStorage.getItem('CLIENT_TOKEN'),
    CLIENT_ID: localStorage.getItem('CLIENT_ID')
  }
}

export const deleteHeaderParams = () => {
  localStorage.removeItem('CLIENT_TOKEN')
  localStorage.removeItem('CLIENT_ID')
}
