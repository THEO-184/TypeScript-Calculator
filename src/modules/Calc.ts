/* 
Calculator Brain
Input: ---> [UserInput1,UserInput2,...]
Generate: ===> {state}
*/

export enum InputType {
	Numerical,
	Operator,
}

export enum OperatorType {
	Add = "Add",
	Subtract = "Subtract",
	Equals = "Equals",
}

export type CalcInput =
	| {
			type: InputType.Numerical;
			value: number;
	  }
	| {
			type: InputType.Operator;
			operation: OperatorType;
	  };

interface CalcState {
	displayValue: number;
}

export type Operation = {
	operator: OperatorType;
	value: number;
};

type OperationsBuilder = {
	operations: Operation[];
	working: Operation;
};

const getOperationsBuilder = (inputs: CalcInput[]): OperationsBuilder => {
	return inputs.reduce<OperationsBuilder>(
		(builder, input): OperationsBuilder => {
			switch (input.type) {
				case InputType.Numerical:
					const prevValue = builder.working?.value || 0;
					const newValue = prevValue * 10 + input.value;
					return {
						...builder,
						working: { ...builder.working, value: newValue },
					};
				case InputType.Operator:
					if (input.operation === OperatorType.Equals) {
						return {
							operations: [
								...builder.operations,
								builder.working,
								{
									operator: OperatorType.Equals,
									value: 0,
								},
							],
							working: { operator: input.operation, value: 0 },
						};
					}
					return {
						operations: [...builder.operations, builder.working],
						working: { operator: input.operation, value: 0 },
					};
			}
		},
		{
			operations: [],
			working: {
				operator: OperatorType.Add,
				value: 0,
			},
		}
	);
};

const getTotal = (operations: Operation[]): number =>
	operations.reduce<number>((sum, operation): number => {
		switch (operation.operator) {
			case OperatorType.Add:
				return (sum += operation.value);

			case OperatorType.Subtract:
				return (sum -= operation.value);
			case OperatorType.Equals:
				return sum;
		}
	}, 0);

const getState = (inputs: Array<CalcInput>): CalcState => {
	const builder = getOperationsBuilder(inputs);
	const { operations } = builder;
	const lastOperation = operations.length
		? operations[operations.length - 1]
		: null;
	if (!lastOperation) return { displayValue: builder.working.value };

	const lastInput = inputs.length ? inputs[inputs.length - 1] : null;
	const total = getTotal(operations);
	switch (lastOperation.operator) {
		case OperatorType.Equals:
			return { displayValue: total };
		default:
			return {
				displayValue:
					lastInput && lastInput.type === InputType.Numerical
						? builder.working.value
						: total,
			};
	}
};

const Calc = {
	getOperationsBuilder,
	getState,
};

export default Calc;
