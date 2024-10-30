import useInput from "../hooks/use-input";
import { useActionData, useNavigation, useSubmit } from "react-router-dom";


const SignUp = props => {
  const actionData = useActionData();
  const navigation =  useNavigation();
  const submit = useSubmit();

  // managing the state of input elements 
  const {value: enteredName, isValid: enteredNameIsValid, hasError: nameInputIsInvalid, onChangeHandler: nameChangeHandler, onBlurHandler: onNameBlurHandler, reset: nameReset} = useInput((name) => name.trim() !== ''); 
  const {value: enteredEmail, isValid: enteredEmailIsValid, hasError: emailInputIsInvalid, onChangeHandler: emailChangeHandler, onBlurHandler: onEmailBlurHandler, reset: emailReset} = useInput((email) => email.includes('@')); 
  const {value: enteredPassword, isValid: enteredPasswordIsValid, hasError: passwordInputIsInvalid, onChangeHandler: passwordChangeHandler, onBlurHandler: onpasswordBlurHandler, reset: passwordReset} = useInput((pass) => pass.trim().length >= 6); 
  const {value: confirmPassword, isValid: confirmPasswordIsValid, hasError: confirmPasswordInputIsInvalid, onChangeHandler: confirmPasswordChangeHandler, onBlurHandler: onconfirmPasswordBlurHandler, reset: confirmPasswordReset} = useInput((pass) => pass===enteredPassword); 


  let formIsValid = false; 

  if(enteredNameIsValid && enteredEmailIsValid && enteredPasswordIsValid && confirmPasswordIsValid ){
    formIsValid = true; 
  }



  const formSubmitHandler = (event) => {
      event.preventDefault(); 

      if(!formIsValid){
        return; 
      }

      submit({email: enteredEmail, name: enteredName, password: enteredPassword, password_confirmation: confirmPassword},{method:'POST'})
      nameReset();
      emailReset();
      passwordReset();
      confirmPasswordReset();
  }


  const nameInputClassNames = !nameInputIsInvalid ? 'form-control form-control-lg': 'invalid form-control form-control-lg'
  const emailInputClassName = !emailInputIsInvalid ? 'form-control form-control-lg': 'invalid form-control form-control-lg'
  const passwordInputClassNames = !passwordInputIsInvalid ? 'form-control form-control-lg': 'invalid form-control form-control-lg'
  const confirmPasswordInputClassNames = !confirmPasswordInputIsInvalid ? 'form-control form-control-lg': 'invalid form-control form-control-lg'



    return(
    <section className="h-100">
      <div className="container pt-5 h-100">
        <div className="row d-flex justify-content-center align-items-center h-50">
          <div className="col-xl-6">
            <div className="card back-ground-skin card-registration">
                <form onSubmit={formSubmitHandler}>
                  <div className="card-body p-md-5 text-black">
                    <h3 className="mb-5 text-uppercase">Sign Up</h3>

                    <div className="form-outline mb-4">
                      <label className="form-label" htmlFor="form3Example8">Name</label>
                      <input type="text" name='name' id="Name" className={nameInputClassNames} onChange={nameChangeHandler} onBlur={onNameBlurHandler} value={enteredName}/>
                      {nameInputIsInvalid && <p className='error-text'>Name is invalid</p>}
                      {/* {actionData && actionData.errors.name && <p className='error-text'>{actionData.errors.name}</p>} */}
                    </div>

                    <div className="form-outline mb-4">
                      <label className="form-label" htmlFor="form3Example97">Email ID</label>
                      <input type="email" name='email' id="Email" className={emailInputClassName} onChange={emailChangeHandler} onBlur={onEmailBlurHandler} value={enteredEmail}/>
                      {emailInputIsInvalid && <p className='error-text'>Email is invalid</p>}
                      {/* {actionData && actionData.errors.email && <p className='error-text'>{actionData.errors.email}</p>} */}
                    </div>

                    <div className="form-outline mb-4">
                      <label className="form-label" htmlFor="form3Example90">Password</label>
                        <input type="password" name='password' id="Password" className={passwordInputClassNames} onChange={passwordChangeHandler} onBlur={onpasswordBlurHandler} value={enteredPassword}/>
                        {passwordInputIsInvalid && <p className='error-text'>Password should be have at least 6 characters.</p>}
                        {/* {actionData && actionData.errors.password && <p className='error-text'>{actionData.errors.password}</p>} */}
                    </div>

                    <div className="form-outline mb-4">
                      <label className="form-label" htmlFor="form3Example90">Confirm Password</label>
                        <input type="password" name='confirmation' id="Confirmation" className={confirmPasswordInputClassNames} onChange={confirmPasswordChangeHandler} onBlur={onconfirmPasswordBlurHandler} value={confirmPassword} disabled={passwordInputIsInvalid}/>
                        {confirmPasswordInputIsInvalid && <p className='error-text'>Password does not match.</p>}
                    </div>

                    {actionData && actionData.message && <p className='error-text'>{actionData.message}</p>}
                    <div className="d-flex justify-content-center justify-content-lg-end"><button className = ' button btn' type='submit' disabled={!formIsValid || navigation.state === 'submitting'}>Submit</button></div>
                  </div>
                  </form>
            </div>
          </div>
        </div>
      </div>
    </section>
    )
}

export default SignUp; 