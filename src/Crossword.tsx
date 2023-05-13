import React, {useCallback, useRef} from 'react';

import {CrosswordImperative, CrosswordProvider, CrosswordGrid, DirectionClues} from '@jaredreisinger/react-crossword';
import {Box, Button, Card, Grid, Paper, Stack} from '@mui/material';
import {useTheme} from './ThemeProvider';
import {CluesInput, Direction} from '@jaredreisinger/react-crossword/dist/types';
import {ClueBox} from './ClueBox';

const data: CluesInput = {
	across: {
		1: {
			clue: 'Plan the perfect heist using creative problem solving, brute force, and everything around you',
			answer: 'TEARDOWN',
			row: 0,
			col: 0,
		},
		5: {
			clue: 'He wants your keys!',
			answer: 'KEYBUM',
			row: 0,
			col: 9,
		},
		8: {
			clue: 'Programming language with a blue mascot',
			answer: 'GOLANG',
			row: 2,
			col: 9,
		},
		9: {
			clue: 'Preferred places for Pringls',
			answer: 'BLANKIES',
			row: 3,
			col: 0,
		},
		10: {
			clue: 'Great Angel',
			answer: 'SANGUINIUS',
			row: 6,
			col: 0,
		},
		13: {
			clue: 'Outward appearances',
			answer: 'PERSONAS',
			row: 8,
			col: 1,
		},
		16: {
			clue: 'Everything in Kotor',
			answer: 'SVE',
			row: 8,
			col: 10,
		},
		18: {
			clue: 'Deal with the consequence of stealing cheese from the Dairy Plant',
			answer: 'MINNAH',
			row: 10,
			col: 0,
		},
		19: {
			clue: 'Smouldering stone source',
			answer: 'CERBERUS',
			row: 10,
			col: 7,
		},
		21: {
			clue: 'The real way to play',
			answer: 'TACTICS',
			row: 12,
			col: 5,
		},
		25: {
			clue: 'Sign of summer',
			answer: 'LEO',
			row: 13,
			col: 3,
		},
		26: {
			clue: 'Used to sign a cert.',
			answer: 'SHA',
			row: 14,
			col: 1,
		},
		27: {
			clue: 'The Source King',
			answer: 'BRACCUSREX',
			row: 14,
			col: 5,
		},
	},
	down: {
		1: {
			clue: 'TV show/comic featuring rogue superheroes',
			answer: 'THEBOYS',
			row: 0,
			col: 0,
		},
		2: {
			clue: 'City of White Towers',
			answer: 'ADUA',
			row: 0,
			col: 2,
		},
		3: {
			clue: 'Home of GiantDad',
			answer: 'DARKSOULS',
			row: 0,
			col: 4,
		},
		4: {
			clue: 'Newcomers, for short',
			answer: 'NUBS',
			row: 0,
			col: 7,
		},
		6: {
			clue: 'Sorry!, for one',
			answer: 'BOARDGAME',
			row: 0,
			col: 12,
		},
		7: {
			clue: 'Heralded by a five pointed star',
			answer: 'MEGASATAN',
			row: 0,
			col: 14,
		},
		8: {
			clue: 'Elder___',
			answer: 'GLASS',
			row: 2,
			col: 9,
		},
		11: {
			clue: '12/31, for short',
			answer: 'NYE',
			row: 6,
			col: 2,
		},
		12: {
			clue: 'Often found in the basement',
			answer: 'ISAAC',
			row: 6,
			col: 7,
		},
		13: {
			clue: 'Gremlin',
			answer: 'PRINGLS',
			row: 8,
			col: 1,
		},
		14: {
			clue: 'Renowned astrologer turned heartbroken recluse',
			answer: 'RENNALA',
			row: 8,
			col: 3,
		},
		15: {
			clue: '"Now I get it!"',
			answer: 'OHH',
			row: 8,
			col: 5,
		},
		17: {
			clue: 'Its patrons are usually kept in the dark',
			answer: 'VUE',
			row: 8,
			col: 11,
		},
		20: {
			clue: 'Streets in Podgorica',
			answer: 'ULICE',
			row: 10,
			col: 13,
		},
		21: {
			clue: 'OSRS second raid',
			answer: 'TOB',
			row: 12,
			col: 5,
		},
		22: {
			clue: 'Often comes in pairs, or sometimes triplets.',
			answer: 'CHA',
			row: 12,
			col: 7,
		},
		23: {
			clue: 'Lich King\'s res.',
			answer: 'ICC',
			row: 12,
			col: 9,
		},
		24: {
			clue: '"You\'re acting weird"',
			answer: 'SUS',
			row: 12,
			col: 11,
		},
	},
}

export default function Crossword() {
	const crossword = useRef<CrosswordImperative>(null)


	const { onComplete } = useTheme();

	return <Box sx={{position: 'relative', display: 'flex', flexDirection: 'column', minHeight: 0, verticalAlign: 'baseline' }}>
		<CrosswordProvider data={data} useStorage={true} onCrosswordComplete={(correct) => correct ? onComplete() : null } ref={crossword}>
			<Box sx={{maxWidth: '1300px', maxHeight: '800px', alignItems: 'flex-start', display: 'flex', height: '100vh', justifyContent: 'space-around', p: 10, margin: 'auto'}}>
				<Box sx={{height: '100%', width: '48%', display: 'flex', flexDirection: 'column'}}>
					<ClueBox />
					<CrosswordGrid />
				</Box>
				<Box sx={{height: '100%', width: '48%', display: 'flex', flexWrap: 'wrap', justifyContent: 'space-around', maxHeight: '625px', verticalAlign: 'baseline'}}>
					<Box sx={{width: '47%', height: '100%', display: 'block', pl: '10px', overflowY: 'scroll', mt: '10px'}}>
							<DirectionClues direction={"across"} label={""} />
					</Box>
					<Box sx={{width: '47%', height: '100%', display: 'block', pl: '10px', overflowY: 'scroll', mt: '10px'}}>
						<Paper sx={{overflow: 'auto'}}>
							<DirectionClues direction={"down"} label={""} />
						</Paper>
					</Box>
				</Box>
			</Box>
		</CrosswordProvider>
	</Box>

}
