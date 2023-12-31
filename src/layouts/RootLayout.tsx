import { Outlet } from 'react-router-dom';
import MainNavbar from '../components/MainNavbar';
import FloatingButton from '../components/FloatingButton';
import { BsCart } from 'react-icons/bs';
import CategoryNavbar from '../components/CategoryNavbar';
import Cart from '../components/Cart';
import { useState } from 'react';

function RootLayout() {
	const [show, setShow] = useState(false);

	const handleClickCart = () => setShow(!show);

	const isCheckoutPage =
		window.location.pathname.includes('checkout');

	const isCartPage = window.location.pathname.includes('cart');

	return (
		<>
			{!isCheckoutPage && <MainNavbar />}
			{!isCheckoutPage && <CategoryNavbar />}
			<Outlet />

			{!isCheckoutPage && !isCartPage && (
				<div>
					<FloatingButton
						icon={
							<BsCart className='floatingButtonIcon text-white' />
						}
						handleClickFn={handleClickCart}
					/>

					<Cart
						show={show}
						handleClose={handleClickCart}
					/>
				</div>
			)}
		</>
	);
}

export default RootLayout;
