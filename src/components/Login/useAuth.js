/* Authetifacation actions */
// LOGIN

export const login = (data) => {
    fetch(`http://192.168.2.33:8000/token-auth/`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
          username: data.username.toUpperCase(),
          password: data.password
      })
    })
    .then(res => res.json().then(json => {
      if(res.ok === true){
        localStorage.setItem('token', json.token);
        localStorage.setItem('auth', JSON.stringify(data.username));
        if (json.user.groups) {
          localStorage.setItem('grupo', JSON.stringify(json.user.groups));
        };
        window.location.reload();
      } else {
          localStorage.setItem('erroLogin', json.non_field_errors);
      }
    }))
};

// LOGOUT
export const logout = () => {
    localStorage.removeItem('auth')
    localStorage.removeItem('token')
    window.location.reload();
}

// LOGIN STATUS

export default function isLogin() {
    if (localStorage.getItem('token')) return true;
    return false;
};