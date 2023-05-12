import React from 'react';
import Crossword from './Crossword';
import {Box, CssBaseline} from '@mui/material';

import './App.css';
import {ThemeProvider} from './ThemeProvider';

function App() {
  return (
	<ThemeProvider>
		<Box>
			<Box sx={{ height: '400px' }}>
				<Crossword />
			</Box>
		</Box>
	</ThemeProvider>
  );
}

export default App;
