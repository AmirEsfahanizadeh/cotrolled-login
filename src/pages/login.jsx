import { useAuth } from 'contexts/Auth'
import { useEffect, useState } from 'react'
import { useHistory } from 'react-router-dom'
import { loginAPI } from 'services/api'

export const ERROR_MESSAGES = {
  'Cannot find user': 'کاربری با این ایمیل یافت نشد!',
  'Incorrect password': 'گذرواژه اشتباه می‌باشد!',
}

const LoginPage = () => {

  const [errorMessage, setErrorMessage] = useState("");
  const [email, setEmail] = useState("");
  const [pass, setPass] = useState("");

  const { toggleAuth, user } = useAuth()
  const history = useHistory()

  useEffect(() => {
    if (user.loggedIn) {
      history.push('/dashboard')
    }
  }, [user])

  const onSubmit = (e) => {
    e.preventDefault();
    loginAPI({email: email, password: pass}).then((response) => {
      console.log(response.data);
      setErrorMessage("");
      toggleAuth();
      history.push("/dashboard");
    }).catch((error) => {
      if (error.response) {
        setErrorMessage(ERROR_MESSAGES[error.response.data])
      } else if (error.request) {
        console.log(error.request);
      } else {
        console.log("problem")
      }
    })
  }

  return (
    <div className="container">
      <div className="row justify-content-center">
        <div className="col-4">
          {errorMessage && 
            <div className="alert alert-danger" role="alert">
              {errorMessage}
            </div>
          }
          <div className="card">
            <form className="card-body" onSubmit={onSubmit}>
              <div className='mb-3'>
                <label htmlFor='email' className='form-lable'>
                  ایمیل
                </label>
                <input id='email' type='email' value={email} onChange={(e) => setEmail(e.target.value)} />
              </div>
              <div className='mb-3'>
                <label htmlFor='password' className='form-lable' >
                  گذرواژه
                </label>
                <input id='password' type='password' value={pass} onChange={(e) => setPass(e.target.value)} />
              </div>
              <button type='submit' disabled={!email || !pass} >ورود</button>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}

export default LoginPage
