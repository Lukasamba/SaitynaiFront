import React, { useState } from 'react';
import * as Yup from 'yup';
import { RegisterRequest } from '../../../api/types/auth';
import { Form, Formik, FormikHelpers } from 'formik';
import { Api } from '../../../api';
import {
  StyledInputBlock,
  StyledLabel,
  StyledRegisterBlock,
  StyledRegisterButton,
  StyledRegisterPage,
  StyledRegisterSuggestionBlock,
  StyledRegisterSuggestionButton,
  StyledRegisterSuggestionText,
} from './Register.style';
import { Input } from 'reactstrap';
import { NavLink } from 'react-router-dom';
import { RouteList } from '../../../routeList';

const Register: React.FC = () => {
  const RegisterSchema = Yup.object().shape({
    name: Yup.string().required(),
    email: Yup.string().email().required(),
    password: Yup.string().required(),
    password_confirmation: Yup.string().required(),
  });

  const [registerRequest] = useState<RegisterRequest>({
    name: '',
    email: '',
    password: '',
    password_confirmation: '',
  });

  const onSubmit = async (request: RegisterRequest, helpers: FormikHelpers<RegisterRequest>) => {
    try {
      await Api.user.auth.register(request);
    } catch (e: any) {
      helpers.setErrors(e.response.errors);
    }
  };

  return (
    <StyledRegisterPage>
      <Formik initialValues={registerRequest} validationSchema={RegisterSchema} onSubmit={onSubmit}>
        {({ handleSubmit, handleChange, values }) => (
          <Form onSubmit={handleSubmit}>
            <StyledRegisterBlock>
              <StyledInputBlock>
                <StyledLabel>Name</StyledLabel>
                <Input
                  id={'name'}
                  name={'name'}
                  type={'text'}
                  placeholder={'Please enter your name.'}
                  onChange={handleChange}
                  value={values.name}
                />
              </StyledInputBlock>

              <StyledInputBlock>
                <StyledLabel>Email</StyledLabel>
                <Input
                  id={'email'}
                  name={'email'}
                  type={'email'}
                  placeholder={'Please enter your email.'}
                  onChange={handleChange}
                  value={values.email}
                />
              </StyledInputBlock>

              <StyledInputBlock>
                <StyledLabel>Password</StyledLabel>
                <Input
                  id={'password'}
                  name={'password'}
                  type={'password'}
                  placeholder={'Please enter your password.'}
                  onChange={handleChange}
                  value={values.password}
                />
              </StyledInputBlock>

              <StyledInputBlock>
                <StyledLabel>Password confirmation</StyledLabel>
                <Input
                  id={'password_confirmation'}
                  name={'password_confirmation'}
                  type={'password'}
                  placeholder={'Please re-enter your password.'}
                  onChange={handleChange}
                  value={values.password_confirmation}
                />
              </StyledInputBlock>

              <StyledRegisterButton>Register</StyledRegisterButton>

              <StyledRegisterSuggestionBlock>
                <StyledRegisterSuggestionText>Want to log in ? </StyledRegisterSuggestionText>

                <StyledRegisterSuggestionButton>
                  <NavLink to={RouteList.AUTH.LOGIN.path}>Log In</NavLink>
                </StyledRegisterSuggestionButton>
              </StyledRegisterSuggestionBlock>
            </StyledRegisterBlock>
          </Form>
        )}
      </Formik>
    </StyledRegisterPage>
  );
};

export default Register;
