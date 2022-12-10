import React, { useState } from 'react';
import {
  StyledInputBlock,
  StyledLabel,
  StyledLoginBlock,
  StyledLoginButton,
  StyledLoginPage,
  StyledLoginSuggestionBlock,
  StyledLoginSuggestionButton,
  StyledLoginSuggestionText,
} from './Login.style';
import { Form, Formik } from 'formik';
import * as Yup from 'yup';
import { LoginRequest } from '../../../api/types/auth';
import { Input } from 'reactstrap';
import { Api, http } from '../../../api';
import { useAppContext } from '../../../AppContext';
import { DataStorage } from '../../../services/dataStorage';
import { NavLink } from 'react-router-dom';
import { RouteList } from '../../../routeList';
import { toast } from 'react-toastify';

const Login: React.FC = () => {
  const appContext = useAppContext();

  const LoginSchema = Yup.object().shape({
    email: Yup.string().email().required(),
    password: Yup.string().required(),
  });

  const [loginRequest] = useState<LoginRequest>({
    email: '',
    password: '',
  });

  const onSubmit = async (request: LoginRequest) => {
    let didCatchError = false;
    try {
      const response = await Api.user.auth.login(request);

      if (response.access_token) {
        http.setBearer(response.access_token);
        DataStorage.set('jwt', response.access_token);
        appContext.setJwt(response.access_token);
      }
    } catch (e: any) {
      didCatchError = true;
      toast.error('Invalid credentials.');
    } finally {
      !didCatchError && toast.success('Logged in successfully!');
    }
  };

  return (
    <StyledLoginPage>
      <Formik initialValues={loginRequest} validationSchema={LoginSchema} onSubmit={onSubmit}>
        {({ handleSubmit, handleChange, values }) => (
          <Form onSubmit={handleSubmit}>
            <StyledLoginBlock>
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

              <StyledLoginButton>Login</StyledLoginButton>

              <StyledLoginSuggestionBlock>
                <StyledLoginSuggestionText>Want to sign up ? </StyledLoginSuggestionText>

                <StyledLoginSuggestionButton>
                  <NavLink to={RouteList.AUTH.REGISTER.path}>Sign up</NavLink>
                </StyledLoginSuggestionButton>
              </StyledLoginSuggestionBlock>
            </StyledLoginBlock>
          </Form>
        )}
      </Formik>
    </StyledLoginPage>
  );
};

export default Login;
