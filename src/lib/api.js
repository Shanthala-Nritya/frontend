const API_BASE_URL = (import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000').replace(/\/$/, '')
const TRANSIENT_DB_ERROR = 'database is not connected'

function delay(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms))
}

export function getApiUrl(path) {
  return `${API_BASE_URL}${path.startsWith('/') ? path : `/${path}`}`
}

export async function apiFetch(path, options = {}) {
  const method = (options.method || 'GET').toUpperCase()
  const maxAttempts = method === 'GET' ? 2 : 1
  let lastError

  for (let attempt = 1; attempt <= maxAttempts; attempt += 1) {
    let response

    try {
      response = await fetch(getApiUrl(path), options)
    } catch (error) {
      const networkError = new Error('Unable to reach the server. Please try again.')
      networkError.cause = error
      throw networkError
    }

    const contentType = response.headers.get('content-type') || ''
    const data = contentType.includes('application/json')
      ? await response.json()
      : await response.text()

    if (response.ok) {
      return data
    }

    const message = typeof data === 'string' ? data : data?.message
    lastError = new Error(message || 'Request failed')
    lastError.status = response.status

    const isTransientDbError = (message || '').toLowerCase().includes(TRANSIENT_DB_ERROR)
    if (attempt < maxAttempts && isTransientDbError) {
      await delay(600)
      continue
    }

    throw lastError
  }

  throw lastError || new Error('Request failed')
}

export function getAuthToken() {
  return localStorage.getItem('shanthala_admin_token') || ''
}

export function setAuthToken(token) {
  localStorage.setItem('shanthala_admin_token', token)
}

export function clearAuthToken() {
  localStorage.removeItem('shanthala_admin_token')
}

export function getAuthHeaders(extraHeaders = {}) {
  const token = getAuthToken()
  return token
    ? { ...extraHeaders, Authorization: `Bearer ${token}` }
    : { ...extraHeaders }
}
