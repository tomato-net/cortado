import {CrosswordContext} from "@jaredreisinger/react-crossword";
import {CrosswordContextType} from "@jaredreisinger/react-crossword/dist/context";
import {Box, Typography} from "@mui/material";
import React from "react";

export const ClueBox = (): JSX.Element => {
	const { clues, selectedDirection, selectedNumber } = React.useContext<CrosswordContextType>(CrosswordContext)
	const [clue, setClue] = React.useState("")
	const [ ctx, setCtx ] = React.useState("")

	React.useMemo(() => {
		const sd = selectedDirection ? selectedDirection : "across"
		const sn = selectedNumber ? selectedNumber : "1"

		console.log("hello")
		console.log(clues)
		if (!clues)
			return

		const foundClue = clues[sd].find((e) => e.number == sn)

		if (!foundClue)
			return

		setCtx(sn + sd.charAt(0).toUpperCase())
		setClue(foundClue.clue)
	}, [clues, selectedDirection, selectedNumber])

	return(
		<Box sx={{minHeight: '60px', mb: '10px', alignItems: 'center', display: 'flex'}}>
			<Typography sx={{display: 'inline-block'}}>
				<b>{ctx}</b> {clue}
			</Typography>
		</Box>
	)
}
