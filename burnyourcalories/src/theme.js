import { createTheme, ThemeProvider } from '@mui/material/styles'

const defaultTheme = createTheme ({
	palette: {
		background: {
			default: '#ececec', // #282c34
		},
	},
	typography: {
		fontFamily: "'Poppins', sans-serif",
	},
})

const {
	breakpoints,
	palette,
	typography: { pxToRem },
} = defaultTheme

const theme = {
	...defaultTheme,
	overrides: {},
}

export default theme
