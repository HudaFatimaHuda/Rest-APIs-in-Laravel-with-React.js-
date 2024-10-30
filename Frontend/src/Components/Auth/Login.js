import useInput from "../hooks/use-input";
import { Link, useSubmit, useActionData, useNavigation } from "react-router-dom";

const Login = () => {
  // this hook is to access the from data return by the action
  const actionData = useActionData();
  // use this hook to disable the login button while submitting data to avoid unnecessary requests
  const navigation =  useNavigation();
  // this hook is used to call action function because we are not using From Component 
  const submit = useSubmit();
  // using custom hooks to Validate
  const {value: enteredEmail, isValid: enteredEmailIsValid, hasError: emailInputIsInvalid, onChangeHandler: emailChangeHandler, onBlurHandler: onEmailBlurHandler, reset: emailReset} = useInput((email) => email.includes('@')); 
  const {value: enteredPassword, isValid: enteredPasswordIsValid, hasError: passwordInputIsInvalid, onChangeHandler: passwordChangeHandler, onBlurHandler: onPasswordBlurHandler, reset: passwordReset} = useInput((pass) => pass.trim().length !== 0); 
  
  // checking form validity and then sending request to backend using submit 
  let formIsValid = false; 

  if( enteredEmailIsValid && enteredPasswordIsValid ){
    formIsValid = true; 
  }

  const formSubmitHandler = (event) => {
      event.preventDefault(); 
      
      if(!formIsValid){
        return; 
      }

      submit({email:enteredEmail, password: enteredPassword},{method:'POST'})

      emailReset();
      passwordReset();
  }


  const emailInputClassName = !emailInputIsInvalid ? 'form-control form-control-lg': 'invalid form-control form-control-lg'
  const passwordInputClassNames = !passwordInputIsInvalid ? 'form-control form-control-lg': 'invalid form-control form-control-lg'


    return(
        <section className="">
          <div className="px-4 py-5 px-md-5 text-center text-lg-start">
            <div className="container">
          
                <div className="col-lg-6 mb-5 mb-lg-0 mx-auto">
                  <div className="card back-ground-skin">
                    <div className="card-body py-5 px-md-5">
                      <form onSubmit={formSubmitHandler}>

                        <div className="form-outline mb-4">
                          <label className="form-label" htmlFor="Email">Email address</label>
                          <input name = 'email' type="text" id="Email" className={emailInputClassName} onChange={emailChangeHandler} onBlur={onEmailBlurHandler} value={enteredEmail}/>
                          {emailInputIsInvalid && <p className='error-text'>Email is invalid</p>}
                        </div>

                        <div className="form-outline mb-4">
                          <label className="form-label" htmlFor="Password">Password</label>
                          <input name= 'password' type="password" id="Password" className={passwordInputClassNames} onChange={passwordChangeHandler} onBlur={onPasswordBlurHandler} value={enteredPassword}/>
                          {passwordInputIsInvalid && <p className='error-text'>Password is invalid.</p>}
                        </div>

                        <div>
                          {actionData && actionData.message && <p className='error-text d-flex justify-content-center'>{actionData.message}</p>}

                        </div>
                        <div className="d-flex justify-content-center mb-4 pt-3">
                        <div className="d-flex justify-content-center justify-content-lg-end"><button className = ' button btn' type='submit' disabled={!formIsValid || navigation.state === 'submitting'}>Submit</button></div>
                        </div>

                      </form>
                      <div className="form-check d-flex justify-content-center mb-4">Do not have an account.&nbsp;&nbsp;<Link to='/signup'>Sign Up</Link></div>
                    </div>
                  </div>
              </div>
            </div>
          </div>
        </section>
    )
}

export default Login; 