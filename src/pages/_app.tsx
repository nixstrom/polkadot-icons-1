import '../styles/globals.css'
import type { AppProps } from 'next/app'
import { CustomisationProvider } from '../providers/CustomisationProvider'

function MyApp({ Component, pageProps }: AppProps) {
	return (
		<CustomisationProvider>
			<Component {...pageProps} />
		</CustomisationProvider>
	)
}

export default MyApp
