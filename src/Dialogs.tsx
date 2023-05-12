import {Button, Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions} from "@mui/material"

export type DialogProps = {
	open: boolean;

	handleClose: () => void;
}

export const SuccessDialog = ({ open, handleClose }: DialogProps): JSX.Element => (
	<Dialog
		open={open}
	>
		<DialogTitle>
			{"Congratulations!"}
		</DialogTitle>
		<DialogContent>
			<DialogContentText>
				Good job on finishing the crossword punkin, I hope you enjoyed it :3
			</DialogContentText>
			<DialogActions>
				<Button
					onClick={handleClose}
					autoFocus
				>
					Admire Your Solution
				</Button>
			</DialogActions>
		</DialogContent>
	</Dialog>
)
