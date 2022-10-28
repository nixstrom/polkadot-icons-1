import '../styles/globals.css'
import type { AppProps } from 'next/app'
import { ThemeProvider } from '@providers/ThemeProvider'
import { CustomisationProvider } from '@providers/CustomisationProvider'

function MyApp({ Component, pageProps }: AppProps) {
	return (
		<ThemeProvider>
			<CustomisationProvider>
				<Component {...pageProps} />
			</CustomisationProvider>
		</ThemeProvider>
	)
}

export default MyApp
