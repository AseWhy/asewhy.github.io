import { ParallaxProvider } from "react-scroll-parallax";
import { MainPage } from "./components/MainPage";

import AppModule from './styles/Root.module.scss';

export function App() {
    return <ParallaxProvider>
        <div
            className={AppModule.App}
        >
            <MainPage/>
        </div>
    </ParallaxProvider>;
}
