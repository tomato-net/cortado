import React from 'react';
import Crossword from './Crossword';
import {Box, CssBaseline} from '@mui/material';

import './App.css';

function App() {
  return (
	<React.Fragment>
		<CssBaseline />

		<Box sx={{ display: 'flex' }}>
			<Box sx={{ width: '50%' }}>
				<Crossword />
			</Box>
		</Box>
	</React.Fragment>
  );
}

export default App;
