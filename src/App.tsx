import React from "react";
import styled from "styled-components";
import Calculator from "./components/Calculator";

const Container = styled.div`
	background: #323232;
	min-height: 100vh;
	display: flex;
	align-items: center;
	justify-content: center;
	flex-direction: column;
	width: 100vw;
`;

function App() {
	return (
		<Container>
			<Calculator />
		</Container>
	);
}

export default App;
