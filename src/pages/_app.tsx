import '../styles/globals.css'
import type { AppProps } from 'next/app'
import { ThemeProvider } from '@providers/ThemeProvider'
import { SearchProvider } from '@providers/SearchProvider'
import { SelectionProvider } from '@providers/SelectionProvider'
import { CustomisationProvider } from '@providers/CustomisationProvider'

function MyApp({ Component, pageProps }: AppProps) {
	return (
		<ThemeProvider>
			<SearchProvider>
				<SelectionProvider>
					<CustomisationProvider>
						<Component {...pageProps} />
					</CustomisationProvider>
				</SelectionProvider>
			</SearchProvider>
		</ThemeProvider>
	)
}

export default MyApp
