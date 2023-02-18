import '../styles/globals.css';
import 'prismjs/themes/prism-tomorrow.css';
import { SessionProvider } from "next-auth/react"

function MyApp({ Component, pageProps }) {
	return (
		<SessionProvider session={pageProps.session}>
			<span className="theme-bejamas" />
			<Component {...pageProps} />
		</SessionProvider>
	);
}

export default MyApp;
