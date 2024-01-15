import { ParallaxProvider } from "react-scroll-parallax";
import { MainPage } from "./components/MainPage";

import RootModule from './Root.module.scss';

export function App() {
    return <ParallaxProvider>
        <div
            className={RootModule.App}
        >
            <MainPage/>
        </div>
    </ParallaxProvider>;
}
