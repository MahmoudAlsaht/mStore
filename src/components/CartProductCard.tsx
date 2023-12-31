import { Link } from 'react-router-dom';
import { useAppDispatch } from '../app/hooks';
import {
	TCartProduct,
	addToCounter,
	removeFromCounter,
	removeProduct,
} from '../app/store/cart';
import { Image, Pagination } from 'react-bootstrap';
import { BsTrash } from 'react-icons/bs';
import { useEffect, useState } from 'react';
import { sumEachProductTotalPrice } from '../utils';

type CartProductCardProps = {
	product: TCartProduct | null;
};

function CartProductCard({ product }: CartProductCardProps) {
	const dispatch = useAppDispatch();
	const [totalProductPrice, setTotalProductPrice] =
		useState(0);

	useEffect(() => {
		setTotalProductPrice(sumEachProductTotalPrice(product!));
	}, [product]);

	return (
		<>
			<div className='cartContainer mb-5'>
				<Image
					src={product?.imageUrl}
					className='imageProduct'
				/>

				<div className='productInfo'>
					<h6>{product?.name?.substring(0, 52)}</h6>
					<h6>{product?.price} JOD</h6>
					<h6>
						{product?.quantity}{' '}
						<span className='text-muted'>
							In stock
						</span>
					</h6>
					<Pagination>
						<Pagination.Item
							onClick={() =>
								dispatch(
									removeFromCounter(
										product?.id as string,
									),
								)
							}
						>
							-
						</Pagination.Item>
						<Pagination.Item>
							{product?.counter}
						</Pagination.Item>
						<Pagination.Item
							onClick={() =>
								dispatch(
									addToCounter({
										id: product?.id as string,
										maxNum: parseInt(
											product?.price as string,
										),
									}),
								)
							}
						>
							+
						</Pagination.Item>
						<Link
							to='#'
							className='border p-1'
							onClick={() =>
								dispatch(
									removeProduct(
										product?.id as string,
									),
								)
							}
						>
							<BsTrash className='text-danger' />
						</Link>
					</Pagination>
					<span className='text-muted'>
						Total Price For This Product:{' '}
						<span className='text-dark'>
							{totalProductPrice}
						</span>
					</span>
				</div>
			</div>
		</>
	);
}

export default CartProductCard;
