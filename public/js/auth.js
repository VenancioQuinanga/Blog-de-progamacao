const id = document.querySelector('input#id')
const email = document.querySelector('input#email')
console.log(id,email)

const getUser = () => {
    const user = sessionStorage.getItem("user") ||null;
    const user_id = sessionStorage.getItem("user_id") ||null;
  
    return user;
  };

  const saveUser = (newUser,user_id) => {

    sessionStorage.setItem("user", newUser);
    sessionStorage.setItem("user_id", user_id);
      
  };

  saveUser(email.value,id.value)