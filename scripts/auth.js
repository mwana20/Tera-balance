
const AUTH_API_URL = "https://script.google.com/macros/s/AKfycbyYUHnp8s_jD3H4yxIbmW7A3FWgbfr7bnNbW1VVzk5xZvryWPozZdIgYy_YOm9XLRWl3A/exec";

export async function loginUser(email, password) {
  try {
    const url = `${AUTH_API_URL}?action=login&email=${encodeURIComponent(email)}&password=${encodeURIComponent(password)}`;
    
    const response = await fetch(url, {
      method: 'GET',
      redirect: 'follow'
    });
    
    const data = await response.json();
    
    if (data.success) {
      localStorage.setItem('user', JSON.stringify(data.user));
      localStorage.setItem('lastLogin', new Date().toISOString());
      return { success: true, user: data.user };
    }
    
    return { success: false, error: data.error || 'Invalid credentials' };
    
  } catch (error) {
    console.error('Login error:', error);
    return { success: false, error: 'Network error. Please try again.' };
  }
}

export async function registerUser({ email, password, name }) {
  try {
    const url = `${AUTH_API_URL}?action=register&email=${encodeURIComponent(email)}&password=${encodeURIComponent(password)}&name=${encodeURIComponent(name)}`;
    
    const response = await fetch(url, {
      method: 'GET',
      redirect: 'follow'
    });
    
    const data = await response.json();
    
    if (data.success || data.message) {
      return { success: true };
    }
    
    return { success: false, error: data.error || 'Registration failed' };
    
  } catch (error) {
    console.error('Registration error:', error);
    return { success: false, error: 'Network error. Please try again.' };
  }
}