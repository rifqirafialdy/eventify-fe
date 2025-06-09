'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Eye, EyeOff } from 'lucide-react';
import { registerUser } from '@/lib/auth';
interface Props {
  onBack: () => void;
}

export default function RegisterFormOrganizer({ onBack }: Props) {
  const router = useRouter();
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const formik = useFormik({
    initialValues: {
      name: '',
      email: '',
      password: '',
      firstName: '',
      lastName: '',
    },
    validationSchema: Yup.object({
      name: Yup.string().required('Organizer name is required'),
      email: Yup.string().email('Invalid email').required('Email is required'),
      password: Yup.string()
        .min(6, 'Minimum 6 characters')
        .matches(/[A-Z]/, 'Must contain at least one uppercase letter')
        .matches(/[0-9]/, 'Must contain at least one number')
        .required('Password is required'),
      firstName: Yup.string().required('First name is required'),
      lastName: Yup.string().required('Last name is required'),
    }),
    onSubmit: async (values) => {
      try {
        await registerUser({ ...values, role: 'ORGANIZER' });
        setSuccess(true);
        setTimeout(() => {
          router.push('/login');
        }, 2000);
      } catch (err: unknown) {
        const axiosError = err as { response?: { data?: { message?: string } } };
        const message =
          axiosError?.response?.data?.message || (err as Error).message || 'Registration failed';
        setError(message);
      }
    },
  });

  return (
    <div className="bg-white p-8 rounded-xl shadow max-w-md w-full">
      <button onClick={onBack} className="text-amber-600 text-sm mb-4 underline">
        ← Back to role selection
      </button>

      <h2 className="text-2xl font-bold mb-4 text-amber-700">Register as Organizer</h2>

      {error && <div className="text-red-500 mb-3 text-sm">{error}</div>}

      {success && (
        <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded mb-4 text-sm text-center">
          Registration successful! Redirecting to login...
        </div>
      )}

      <form onSubmit={formik.handleSubmit} className="space-y-4">
        <div>
          <Input
            name="name"
            placeholder="Organization Name"
            value={formik.values.name}
            onChange={formik.handleChange}
            className={formik.errors.name && formik.touched.name ? 'border-red-500' : ''}
          />
          {formik.touched.name && formik.errors.name && (
            <p className="text-sm text-red-500 mt-1">{formik.errors.name}</p>
          )}
        </div>

        <div>
          <Input
            name="email"
            type="email"
            placeholder="Email"
            value={formik.values.email}
            onChange={formik.handleChange}
            className={formik.errors.email && formik.touched.email ? 'border-red-500' : ''}
          />
          {formik.touched.email && formik.errors.email && (
            <p className="text-sm text-red-500 mt-1">{formik.errors.email}</p>
          )}
        </div>

        <div className="relative">
          <Input
            name="password"
            type={showPassword ? 'text' : 'password'}
            placeholder="Password"
            value={formik.values.password}
            onChange={formik.handleChange}
            className={
              formik.errors.password && formik.touched.password ? 'border-red-500 pr-10' : 'pr-10'
            }
          />
          <button
            type="button"
            onClick={() => setShowPassword((prev) => !prev)}
            className="absolute top-2 right-3 text-gray-500"
          >
            {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
          </button>
          {formik.touched.password && formik.errors.password && (
            <p className="text-sm text-red-500 mt-1">{formik.errors.password}</p>
          )}
        </div>

        <div>
          <Input
            name="firstName"
            placeholder="First Name"
            value={formik.values.firstName}
            onChange={formik.handleChange}
            className={formik.errors.firstName && formik.touched.firstName ? 'border-red-500' : ''}
          />
          {formik.touched.firstName && formik.errors.firstName && (
            <p className="text-sm text-red-500 mt-1">{formik.errors.firstName}</p>
          )}
        </div>

        <div>
          <Input
            name="lastName"
            placeholder="Last Name"
            value={formik.values.lastName}
            onChange={formik.handleChange}
            className={formik.errors.lastName && formik.touched.lastName ? 'border-red-500' : ''}
          />
          {formik.touched.lastName && formik.errors.lastName && (
            <p className="text-sm text-red-500 mt-1">{formik.errors.lastName}</p>
          )}
        </div>

        <Button
          type="submit"
          className="w-full bg-amber-600 hover:bg-amber-700 text-white font-semibold py-3 rounded-lg"
        >
          Register
        </Button>
      </form>
    </div>
  );
}
