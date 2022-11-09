import '../styles/globals.css'
import type { AppProps } from 'next/app'
import { ThemeProvider } from '@providers/ThemeProvider'
import { SearchProvider } from '@providers/SearchProvider'
import { CustomisationProvider } from '@providers/CustomisationProvider'

function MyApp({ Component, pageProps }: AppProps) {
	return (
		<ThemeProvider>
			<SearchProvider>
				<CustomisationProvider>
					<Component {...pageProps} />
				</CustomisationProvider>
			</SearchProvider>
		</ThemeProvider>
	)
}

export default MyApp
