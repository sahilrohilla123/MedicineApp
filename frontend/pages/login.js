import { useState } from 'react';
import axios from 'axios';
import { useRouter } from 'next/router';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('https://medicine-app-six.vercel.app/api/users/login', { email, password });
      localStorage.setItem('token', response.data.token);
      router.push('/search');
    } catch (error) {
      console.error('Error logging in', error);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-black text-white">
      <div className="bg-white p-8 rounded-lg shadow-lg max-w-md md:w-3/4 lg:w-1/2">
        <h1 className="text-2xl text-black font-bold mb-4">Login</h1>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-black text-sm font-medium mb-2">Email:</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="px-3 py-2 text-black border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
            />
          </div>
          <div className="mb-6">
            <label className="block text-black text-sm font-medium mb-2">Password:</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="w-full px-3 py-2 text-black border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
            />
          </div>
          <button
            type="submit"
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          >
            Login
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
