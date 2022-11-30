import React from 'react';

interface Props {
  component: React.FC<any> | React.ComponentClass<any>;
  layout: React.FC<any> | React.ComponentClass<any>;
  permissions: Array<string>;
}

const AuthPage: React.FC<Props> = ({ component: Component, layout: Layout, permissions }) => {
  return (
    <Layout>
      <Component />
    </Layout>
  );
};
export default AuthPage;
