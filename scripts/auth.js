// auth.js
const AUTH_API_URL = "https://docs.google.com/spreadsheets/d/1iuRuo_-EwQ38-R1-Daie1TK3p7Xne-sV2bA1Aad6CFc/edit?resourcekey=&gid=0#gid=0";

export async function loginUser(email, password) {
  try {
    const response = await fetch(AUTH_API_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        action: 'login',
        email: email,
        password: password
      })
    });
    
    const data = await response.json();
    
    // Successful login
    if (data.success) {
      // Store user data in localStorage
      localStorage.setItem('user', JSON.stringify(data.user));
      localStorage.setItem('lastLogin', new Date().toISOString());
      
      return {
        success: true,
        user: data.user
      };
    }
    
    // Failed login
    return {
      success: false,
      error: data.error || 'Invalid credentials'
    };
    
  } catch (error) {
    console.error('Login error:', error);
    return {
      success: false,
      error: 'Network error. Please try again.'
    };
  }
}

export async function registerUser({ email, password, name }) {
  try {
    const response = await fetch(AUTH_API_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        action: 'register',
        email: email,
        password: password,
        name: name
      })
    });
    
    const data = await response.json();
    
    if (data.success || data.message) {
      return { success: true };
    }
    
    return {
      success: false,
      error: data.error || 'Registration failed'
    };
    
  } catch (error) {
    console.error('Registration error:', error);
    return {
      success: false,
      error: 'Network error. Please try again.'
    };
  }
}