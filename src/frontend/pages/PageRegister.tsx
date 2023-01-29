import React, { useState } from 'react'
import * as EmailValidator from 'email-validator'
import '@fortawesome/fontawesome-free/css/all.min.css'
import 'mdb-react-ui-kit/dist/css/mdb.min.css'
import {
  MDBBtn,
  MDBContainer,
  MDBRow,
  MDBCol,
  MDBCard,
  MDBCardBody,
  MDBInput,
  MDBValidationItem,
  MDBValidation
}
  from 'mdb-react-ui-kit'

function PageRegister () {
  const [firstName, setFirstName] = useState('')
  const [firstNameFlag, setFirstNameFlag] = useState(false)
  const [lastName, setLastName] = useState('')
  const [lastNameFlag, setLastNameFlag] = useState(false)
  const [email, setEmail] = useState('')
  const [emailFlag, setEmailFlag] = useState(false)
  const [password, setPassword] = useState('')
  const [passwordFlag, setPasswordFlag] = useState(false)
  const [passwordRepeat, setPasswordRepeat] = useState('')
  const [passwordRepeatFlag, setPasswordRepeatFlag] = useState(false)

  const validateInput = (indicator : boolean, target: HTMLInputElement, funcSetInput : (val : string) => void | null, funcSetInputFlag : (val : boolean) => void | null) => {
    if (indicator === true) {
      funcSetInput(target.value)
      funcSetInputFlag(true)
      target.setCustomValidity('invalid')
      target.reportValidity()
    } else {
      funcSetInputFlag(true)
      funcSetInput(target.value)
      target.setCustomValidity(''); target.reportValidity()
    }
  }

  return (
    <MDBContainer fluid style={{ backgroundColor: '#fff8e3' }}>

      <MDBRow className='d-flex justify-content-center align-items-center h-100'>
        <MDBCol col='12'>

        <h3 className="my-5 text-center" style={{ fontFamily: '"Bevan", cursive' }}>speakeasy.</h3>

          <MDBCard className='bg-white my-5 mx-auto' style={{ borderRadius: '1rem', maxWidth: '500px' }}>
            <MDBCardBody className='p-5 w-100 d-flex flex-column'>

              <h2 className=" mt-0 mb-4 text-center">Register</h2>

              <MDBValidation className={'row g-3 ' + (firstNameFlag ? 'was-validated' : '') }>
                <MDBValidationItem feedback='Please enter your first name.' invalid={firstNameFlag} >
                  <MDBInput wrapperClass='mb-4 w-100' label='First Name' id='formControlLg' defaultValue={firstName} onChange={ (e) => { validateInput((e.target.value.length === 0), e.target, setFirstName, setFirstNameFlag) } } type='text' size="lg" required/>
                </MDBValidationItem>
              </MDBValidation>

              <MDBValidation className={'row g-3 ' + (lastNameFlag ? 'was-validated' : '') }>
                <MDBValidationItem feedback='Please choose your last name.' invalid={lastNameFlag}>
                  <MDBInput wrapperClass='mb-4 w-100' label='Last Name' id='formControlLg' defaultValue={lastName} onChange={ (e) => { validateInput((e.target.value.length === 0), e.target, setLastName, setLastNameFlag) } } type='text' size="lg"/>
                  </MDBValidationItem>
              </MDBValidation>

              <MDBValidation className={'row g-3 ' + (emailFlag ? 'was-validated' : '') }>
                <MDBValidationItem feedback='Please enter a valid email address.' invalid={emailFlag}>
                  <MDBInput wrapperClass='mb-4 w-100' label='Email address' id='formControlLg' defaultValue={email} onChange={ (e) => { validateInput(!(EmailValidator.validate(e.target.value)), e.target, setEmail, setEmailFlag) } } type='email' size="lg"/>
                 </MDBValidationItem>
              </MDBValidation>

              <MDBValidation className={'row g-3 ' + (passwordFlag ? 'was-validated' : '') }>
                <MDBValidationItem feedback='Please enter a password.' invalid={ passwordFlag }>
                  <MDBInput wrapperClass='mb-4 w-100' label='Password' id='formControlLg' defaultValue={password} onChange={ (e) => { validateInput((e.target.value.length === 0), e.target, setPassword, setPasswordFlag) } } type='password' size="lg"/>
                </MDBValidationItem>
              </MDBValidation>

              <MDBValidation className={'row g-3 ' + (passwordRepeatFlag ? 'was-validated' : '') }>
                <MDBValidationItem feedback='Please make the password match the one above.' invalid={ passwordRepeatFlag }>
                  <MDBInput wrapperClass='mb-4 w-100' label='Confirm Password' id='formControlLg' defaultValue={passwordRepeat} onChange={ (e) => { validateInput((e.target.value !== password), e.target, setPasswordRepeat, setPasswordRepeatFlag) } } type='password' size="lg"/>
                </MDBValidationItem>
              </MDBValidation>

              <MDBBtn size='lg' disabled={ !(firstName.length > 0 && lastName.length > 0 && EmailValidator.validate(email) && password === passwordRepeat) }>
                Register
              </MDBBtn>
              <p className="mt-5 text-center">Already a user?<a href="/login"> Login!</a> </p>

            </MDBCardBody>
          </MDBCard>

        </MDBCol>
      </MDBRow>

    </MDBContainer>
  )
}

export default PageRegister
