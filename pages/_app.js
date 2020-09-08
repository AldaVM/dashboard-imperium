import '../styles/globals.css'
import '../antd.less';
import { AuthProvider } from '../src/context';

function MyApp({ Component, pageProps }) {
    return (
        <AuthProvider>
            <Component {...pageProps} />
        </AuthProvider>
    )
}

export default MyApp