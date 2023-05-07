import React from 'react';

import { Crossword as C } from '@jaredreisinger/react-crossword';

const data = {
	across: {
		1: {
			clue: 'one plus one',
			answer: 'TWO',
			row: 0,
			col: 0,
		},
	},
	down: {
		2: {
			clue: 'three minus two',
			answer: 'ONE',
			row: 0,
			col: 2,
		},
	},
}

export default function Crossword() {
	return <C data={data} />
}
