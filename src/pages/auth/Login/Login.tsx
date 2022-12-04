import React, { useCallback, useState } from 'react';
import { StyledInputBlock, StyledLabel, StyledLoginButton, StyledLoginPage } from './Login.style';
import { Form, Formik, FormikHelpers } from 'formik';
import * as Yup from 'yup';
import { LoginRequest } from '../../../api/types/auth';
import { Input } from 'reactstrap';
import { Api } from '../../../api';
import { useAppContext } from '../../../AppContext';
import { DataStorage } from '../../../services/dataStorage';
import { useNavigate } from 'react-router-dom';
import { RouteList } from '../../../routeList';

const Login: React.FC = () => {
  const navigate = useNavigate();
  const appContext = useAppContext();

  const LoginSchema = Yup.object().shape({
    email: Yup.string().email().required(),
    password: Yup.string().required(),
  });

  const [loginRequest] = useState({
    email: '',
    password: '',
  });

  const onSubmit = useCallback(
    async (request: LoginRequest, helpers: FormikHelpers<LoginRequest>) => {
      try {
        const response = await Api.user.auth.login(request);

        if (response.access_token) {
          DataStorage.set('jwt', response.access_token);
          appContext.setJwt(response.access_token);
          navigate(RouteList.DASHBOARD.path);
        }
      } catch (e: any) {
        helpers.setErrors(e.response.errors);
      }
    },
    [],
  );

  return (
    <StyledLoginPage>
      <Formik initialValues={loginRequest} validationSchema={LoginSchema} onSubmit={onSubmit}>
        {({ handleSubmit, handleChange, values }) => (
          <Form onSubmit={handleSubmit}>
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
          </Form>
        )}
      </Formik>
    </StyledLoginPage>
  );
};

export default Login;
