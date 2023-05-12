import {EnhancedProps} from "@jaredreisinger/react-crossword/dist/types";
import {CssBaseline, ThemeProvider as MThemeProvider, createTheme, Theme} from "@mui/material";
import PropTypes from "prop-types";
import React from "react";
import ReactConfetti from "react-confetti";
import {SuccessDialog} from "./Dialogs";

export interface Themes{
	light: Theme;
}

export interface ThemeContextType{
	theme: Theme;

	setTheme: (theme: Theme) => void;

	onComplete: () => void;
}

export const themes: Themes = {
	light: createTheme({
		palette: {
			mode: 'light',
		},
	})
}

export const ThemeContext = React.createContext<ThemeContextType>({
	theme: themes.light,
	setTheme: () => {},
	onComplete: () => {},
})

export const themeProviderPropTypes = {
	children: PropTypes.node,
}

export type ThemeProviderProps = EnhancedProps<
	typeof themeProviderPropTypes,
	{
	}
>;

export const ThemeProvider: React.FC<ThemeProviderProps> = ({
	children,
}) => {
	const [theme, setTheme] = React.useState(themes.light)
	const [confettiEnabled, setConfetti] = React.useState(false)
	const [displaySuccess, setDisplaySuccess] = React.useState(false)
	const [success, setSuccess] = React.useState(false)

	const themeContext = React.useMemo<ThemeContextType>(() => ({
		theme: theme,
		setTheme: setTheme,
		onComplete: () => setSuccess(true),
	}), [theme])

	React.useMemo(() => {
		setConfetti(success)
		setDisplaySuccess(success)
	}, [success])

	const confettiOpacity = React.useMemo(() => (confettiEnabled ? 1 : 0), [confettiEnabled])

	return (
		<ThemeContext.Provider value={themeContext}>
			<MThemeProvider theme={themeContext.theme}>
				<CssBaseline />

				<ReactConfetti opacity={confettiOpacity} />
				<SuccessDialog open={displaySuccess} handleClose={() => setSuccess(false)} />

				{children}
			</MThemeProvider>
		</ThemeContext.Provider>
	)
}

export const useTheme = () => React.useContext(ThemeContext)
