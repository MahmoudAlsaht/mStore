import { Form } from 'react-bootstrap';
import LoadingSpinner from './LoadingSpinner';
import { FormEvent } from 'react';

type ButtonProps = {
	body: any;
	variant: string;
	type: string;
	className?: string;
	isLoading?: boolean;
	disabled?: boolean;
	handleClick?: (e?: FormEvent) => void;
};

function LoadingButton({
	body,
	variant,
	type,
	className,
	handleClick,
	isLoading = false,
	disabled = false,
}: ButtonProps) {
	return (
		<>
			{isLoading ? (
				<LoadingSpinner />
			) : (
				<Form.Control
					disabled={disabled}
					className={`${className} btn ${
						!disabled
							? `btn-outline-${variant}`
							: 'btn-outline-secondary'
					}`}
					value={body}
					type={type}
					onClick={handleClick}
				/>
			)}
		</>
	);
}

export default LoadingButton;
