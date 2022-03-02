import { createMuiTheme } from '@material-ui/core/styles'

const defaultTheme = createMuiTheme({
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
