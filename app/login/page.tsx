// app/login/page.tsx
// Chapter 14: Login Page

export const revalidate = 0;

import type { Metadata } from 'next';
import LoginForm from './login-form';

export const metadata: Metadata = {
  title: 'Login',
  description: 'Sign in to your Acme Dashboard account',
};

export default function LoginPage() {
  return <LoginForm />;
}
