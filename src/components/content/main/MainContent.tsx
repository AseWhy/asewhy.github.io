import { Parallax } from "react-scroll-parallax";
import { TypeAnimation } from "react-type-animation";
import MainContentStyles from "./styles/MainContent.module.scss";


export function MainContent() {
    return <div
        className={MainContentStyles.MainContent}
        id="main"
    >
        <div
            className={MainContentStyles.ShortDescription}
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
                    Разработчик программного обеспечения
                </p>
            </Parallax>
        </div>
    </div>
}