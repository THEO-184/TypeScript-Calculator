import Calc, { CalcInput, InputType, OperatorType, Operation } from "./Calc";
// "jest": "^27.3.1",
test("generates operations", () => {
	const inputs: Array<CalcInput> = [
		{ type: InputType.Numerical, value: 1 },
		{
			type: InputType.Numerical,
			value: 2,
		},
		{
			type: InputType.Operator,
			operation: OperatorType.Add,
		},
		{
			type: InputType.Numerical,
			value: 3,
		},
		{
			type: InputType.Operator,
			operation: OperatorType.Equals,
		},
	];
	const operations: Array<Operation> = [
		{ operator: OperatorType.Add, value: 12 },
		{ operator: OperatorType.Add, value: 23 },
		{ operator: OperatorType.Equals, value: 0 },
	];

	expect(Calc.getOperationsBuilder(inputs).operations).toEqual(operations);
});

test("has displayValue of 0 with no inputs", () => {
	const inputs: Array<CalcInput> = [];

	const state = Calc.getState(inputs);
	expect(state.displayValue).toEqual(0);
});

test("derive displayValue upon new numerical value", () => {
	const inputs: Array<CalcInput> = [
		{ type: InputType.Numerical, value: 1 },
		{
			type: InputType.Numerical,
			value: 2,
		},
		{
			type: InputType.Operator,
			operation: OperatorType.Add,
		},
		{
			type: InputType.Numerical,
			value: 3,
		},
	];

	const state = Calc.getState(inputs);
	expect(state.displayValue).toEqual(3);
});

test("derive final test", () => {
	const inputs: Array<CalcInput> = [
		{ type: InputType.Numerical, value: 1 },
		{
			type: InputType.Numerical,
			value: 2,
		},
		{
			type: InputType.Operator,
			operation: OperatorType.Add,
		},
		{
			type: InputType.Numerical,
			value: 3,
		},
		{
			type: InputType.Operator,
			operation: OperatorType.Equals,
		},
	];

	const state = Calc.getState(inputs);
	expect(state.displayValue).toEqual(15);
});
