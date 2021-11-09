import React from "react";
import styled from "styled-components";

const ButtonContainer = styled.button`
	background: #727171;
	border-radius: 8px;
	border: none;
	color: #fff;
	font-size: 1.5rem;
	cursor: pointer;
	:focus {
		border: 1px solid blue;
	}
`;

export enum ButtonType {
	Operation,
	Number,
}

type Props = React.HTMLProps<HTMLButtonElement> & {
	label: string;
	buttonType: ButtonType;
	position?: [x: number, y: number];
	width?: number;
	height?: number;
};

const Button: React.FC<Props> = ({
	buttonType = ButtonType.Operation,
	label,
	position,
	width,
	height,
	onClick,
}) => {
	const styles: React.CSSProperties = {};

	if (position) {
		styles.gridColumnStart = position[0] + 1;
		styles.gridRowStart = position[1] + 1;
	}
	if (width) styles.gridColumnEnd = `span ${width}`;
	if (height) {
		styles.gridRowEnd = `span ${height}`;
	}
	if (buttonType) {
		if (buttonType === ButtonType.Number) {
			styles.color = "#000";
			styles.backgroundColor = "#E48900";
		}
	}
	return (
		<ButtonContainer onClick={onClick} style={styles}>
			{label}
		</ButtonContainer>
	);
};

export default Button;
