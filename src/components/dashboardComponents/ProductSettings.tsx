import { useState } from 'react';
import { Button } from 'react-bootstrap';
import DeleteProductForm from '../forms/DeleteProductForm';
import EditProductForm from '../forms/EditProductForm';
import { TProduct } from '../../app/store/product';
import { BsPen } from 'react-icons/bs';
import { BsTrash } from 'react-icons/bs';

type ProductSettingsProps = {
	product: TProduct;
	index: number;
};

function ProductSettings({
	product,
	index,
}: ProductSettingsProps) {
	const [show, setShow] = useState(false);
	const [showEditProductForm, setShowEditProductForm] =
		useState(false);

	const handleClickEditProduct = () => {
		setShowEditProductForm(!showEditProductForm);
	};

	const handleProductDeletion = async () => setShow(!show);

	return (
		<>
			<tr>
				<td>{index + 1}</td>
				<td>{product?.name}</td>

				<td>
					<EditProductForm
						product={product}
						show={showEditProductForm}
						handleClose={handleClickEditProduct}
					/>
					<Button
						variant='outline-warning'
						onClick={handleClickEditProduct}
					>
						<BsPen />
					</Button>
				</td>
				<td>
					<Button
						variant='outline-danger'
						onClick={handleProductDeletion}
						className='ms-1'
					>
						<BsTrash />
					</Button>

					<DeleteProductForm
						productId={product?.id}
						show={show}
						handleClose={handleProductDeletion}
						productName={product?.name}
					/>
				</td>
			</tr>
		</>
	);
}

export default ProductSettings;
