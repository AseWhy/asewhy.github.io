import { ParallaxProvider } from "react-scroll-parallax";
import { MainPage } from "./components/MainPage";

import AppStyles from './styles/Root.module.scss';

export function App() {
    return <ParallaxProvider>
        <div
            className={AppStyles.App}
        >
            <MainPage/>
        </div>
    </ParallaxProvider>;
}
