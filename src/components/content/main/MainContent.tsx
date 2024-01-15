import { Parallax } from "react-scroll-parallax";
import { TypeAnimation } from "react-type-animation";

import MainContentModule from "./MainContent.module.scss";

export function MainContent() {
    return <div
        className={MainContentModule.MainContent}
        id="main"
    >
        <div
            className={MainContentModule.ShortDescription}
        >
            <Parallax
                translateY={[ '-200px', '200px' ]}
            >
                <TypeAnimation
                    sequence={[ 'AseWhy/Asetecom', 1500 ]}
                    wrapper="h1"
                    repeat={1}
                />

                <p>
                    Web разработчик
                </p>
            </Parallax>
        </div>
    </div>
}