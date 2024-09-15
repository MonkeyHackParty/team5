import '../styles/fonts.css'; // グローバルCSSをインポート
import '../styles/globals.css'; // グローバル CSS ファイルのパス
import '../styles/item-list.module.css'; // 必要に応じて
import '../styles/PlaceRegister.module.css';
import '../styles/MainScene.module.css'

function MyApp({ Component, pageProps }) {
  return <Component {...pageProps} />;
}

export default MyApp