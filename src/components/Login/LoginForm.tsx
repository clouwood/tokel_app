import React, { useState } from 'react';
import styled from '@emotion/styled';
import Input from '../_General/Input';
import Button from '../_General/Button';
import password from './assets/password.svg';
import Link from '../_General/Link';
import Logo from '../_General/Logo';
import { listnunspent, login } from '../../util/nspvlib';
import ErrorMessage from '../_General/ErrorMessage';
import { sendInfo, showDash } from '../../util/electron';

type LoginFormProps = {
  addNewWallet: () => void;
};

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  .welcome {
    color: var(--color-gray);
    font-weight: 400;
    margin: 0;
    margin-bottom: 1rem;
  }
  button {
    margin-bottom: 0rem;
  }
`;

const LoginForm = ({ addNewWallet }: LoginFormProps) => {
  const [loginValue, setloginValue] = useState('');
  const [error, setError] = useState('');

  const loginUser = (value) => {
    setError('');
    login(value)
      .then(() => {
        return listnunspent();
      })
      .then((res) => {
        sendInfo(res);
        showDash();
        return 1;
      })
      .catch((e) => {
        setError(e.message);
      });
  };

  return (
    <Container>
      <Logo />
      <h1>Welcome to TOKEL</h1>
      <p className="welcome">Komodo ecosystem Token Platform</p>
      <Input
        onChange={(e) => setloginValue(e.target.value)}
        icon={password}
        value={loginValue}
        placeholder="Key or Seed Phrase"
      />
      <Button
        onClick={() => loginUser(loginValue)}
        theme="purple"
        buttonText="Login"
      />
      <div style={{ marginBottom: '2rem' }}>
        <ErrorMessage>{error}</ErrorMessage>
      </div>
      <Link onClick={addNewWallet} linkText="Add New Wallet" />
    </Container>
  );
};

export default LoginForm;
