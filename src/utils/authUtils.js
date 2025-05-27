// not in use but keep for reference
export const hasUserInStorage = () => {
  try {
    const user = localStorage.getItem('user')
    return user !== null && user !== undefined && user !== 'null'
  } catch (error) {
    console.error('Error checking localStorage for user:', error)
    return false
  }
}

export const isTestUser = () => {
  const user = JSON.parse(localStorage.getItem('user'))
  if (user) {
    const customer = user.customer
    return customer.is_test_user
  }
}

function getCsrfToken() {
  const value = `; ${document.cookie}`
  const parts = value.split(`; csrftoken=`)
  if (parts.length === 2) return parts.pop().split(';').shift()
  return ''
}
