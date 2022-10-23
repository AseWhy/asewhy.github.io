import { Parallax } from "react-scroll-parallax"
import AboutContentStyles from "./styles/AboutContent.module.scss"

export function AboutContent() {
    return <div
        className={AboutContentStyles.AboutContent}
        id="about"
    >
        <div
            className={AboutContentStyles.sides}
        >
            <div className={AboutContentStyles.leftSide}>
                <Parallax
                    rotate={ [ "14deg", "49deg" ] }
                    translateY={ [ "-200px", "200px" ] }
                    opacity={ [ 1, 0, "easeIn" ] }
                >
                    <img
                        src="https://avatars.githubusercontent.com/u/25382242?v=4"
                        alt="My avatar"
                    />
                </Parallax>
            </div>
            
            <div
                className={AboutContentStyles.rightSide}
            >
                <h2> Обо мне </h2>

                <Parallax
                    opacity={ [ 0, 2 ] }
                >
                    <p>
                        Меня зовут Плеханов Алексей. Мне 20 лет, я закончил обучение, на СПО по специальности техник программист.
                        Увлекаюсь программированием и всем что с этим связанно, люблю запускать дронов во всяких интересных местах.
                        За время своего бытия попробовал много различных фреймворков библиотек и движков.
                        Пробовал писать игры, честно говоря получалось не очень.
                        На данный момент остановился на web разработке, и занимаюсь ей последние 2 года (а может уже и не два).
                        Человек не конфликтный, и хотя и выгляжу как будто я завтра отброшу коньки, достаточно бодрый)
                    </p>
                </Parallax>
            </div>
        </div>
    </div>
}