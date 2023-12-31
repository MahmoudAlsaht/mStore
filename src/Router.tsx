import { SpeedInsights } from '@vercel/speed-insights/next';
import { createBrowserRouter, Outlet } from 'react-router-dom';
import Home from './routes/Home';
import RootLayout from './layouts/RootLayout';
import { Provider } from 'react-redux';
import { store } from './app/store';
import AuthLayout from './layouts/AuthLayout';
import Signup from './routes/Signup';
import SignIn from './routes/Signin';
import AccountLayout from './layouts/AccountLayout';
import Profile from './routes/account/Profile';
import EditUser from './routes/account/EditUser';
import ResetPassword from './routes/ResetPassword';
import NotFound404 from './routes/NotFound404';
import { motion } from 'framer-motion';
import Category from './routes/store/Category';
import DashboardLayout from './layouts/DashboardLayout';
import Dashboard from './routes/dashboard/Dashboard';
import CategoriesSettings from './routes/dashboard/CategoriesSettings';
import ProductsSettings from './routes/dashboard/ProductsSettings';
import ShowProduct from './routes/store/ShowProduct';
import OrderSettings from './routes/dashboard/OrderSettings';
import ContactInfo from './routes/account/ContactInfo';
import ShowContactInfo from './routes/account/ShowContactInfo';
import AddNewContact from './routes/account/AddNewContact';
import Checkout from './routes/checkout/Checkout';
import CartCheckout from './routes/checkout/CartCheckout';

export const Router = createBrowserRouter([
	{
		element: <Wrapper />,
		children: [
			{
				element: <RootLayout />,
				children: [
					{ path: '/', element: <Home /> },
					{ path: 'about', element: <h1>About</h1> },
					{ path: 'cart', element: <CartCheckout /> },
					{
						path: '/checkout',
						children: [
							{
								index: true,
								element: <Checkout />,
							},
						],
					},
				],
			},
			{
				element: <RootLayout />,
				path: 'store',
				children: [
					{
						path: 'categories/:categoryId/products',
						element: <Category />,
					},
					{
						path: 'products/:productId',
						element: <ShowProduct />,
					},
				],
			},
			{
				element: <AuthLayout />,
				path: 'auth',
				children: [
					{ path: 'signup', element: <Signup /> },
					{ path: 'signin', element: <SignIn /> },
					{
						path: 'reset-password',
						element: <ResetPassword />,
					},
				],
			},
			{
				element: <AccountLayout />,
				path: 'account',
				children: [
					{
						path: 'profile/:profileId',
						element: <Profile />,
					},
					{
						path: 'profile/:profileId/account-setting',
						element: <EditUser />,
					},
					{
						path: 'profile/:profileId/contact-info',
						element: <ContactInfo />,
					},
					{
						path: 'profile/:profileId/contact-info/:contactId',
						element: <ShowContactInfo />,
					},
					{
						path: 'profile/:profileId/contact-info/new-contact',
						element: <AddNewContact />,
					},
				],
			},
			{
				element: <DashboardLayout />,
				path: 'dashboard',
				children: [
					{
						path: 'admin/:adminId',
						element: <Dashboard />,
					},
					{
						path: 'settings/categories',
						element: <CategoriesSettings />,
					},
					{
						path: 'settings/products',
						element: <ProductsSettings />,
					},
					{
						path: 'settings/orders',
						element: <OrderSettings />,
					},
				],
			},
			{
				path: '*',
				element: <NotFound404 />,
			},
		],
	},
]);

function Wrapper() {
	return (
		<Provider store={store}>
			<motion.div
				initial={{ x: -2000, opacity: 0 }}
				animate={{ x: 0, opacity: 1 }}
				exit={{ x: 2000, opacity: 0 }}
			>
				<Outlet />
				<SpeedInsights />
			</motion.div>
		</Provider>
	);
}
