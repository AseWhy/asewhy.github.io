import { Parallax } from "react-scroll-parallax"
import { REF_BIRTH_DATE, REF_WORK_START_DATE, calcYearRest, numWord } from "../../../service"

import AboutContentModule from "./AboutContent.module.scss"

/** Склонения для форматирования лет */
const CUR_YEARS_VARIANTS: [ string, string, string ] = [ 'год', 'года', 'лет' ];
/** Шаблон для форматирования лет */
const CUR_YEARS_TEMPLATE = "${value} ${variant}";
/** Количнество лет с даты рождения */
const CUR_YEARS = numWord(CUR_YEARS_TEMPLATE, calcYearRest(REF_BIRTH_DATE), CUR_YEARS_VARIANTS);
/** Количество лет в разработке */
const CUR_YEARS_IN_DEV = numWord(CUR_YEARS_TEMPLATE, calcYearRest(REF_WORK_START_DATE), CUR_YEARS_VARIANTS);

export function AboutContent() {
    return <div
        className={AboutContentModule.AboutContent}
        id="about"
    >
        <div
            className={AboutContentModule.sides}
        >
            <div className={AboutContentModule.leftSide}>
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
                className={AboutContentModule.rightSide}
            >
                <h2> Обо мне </h2>

                <Parallax
                    opacity={ [ 0, 2 ] }
                >
                    <p>
                        Меня зовут Плеханов Алексей. Мне {CUR_YEARS}, я закончил обучение, на СПО по специальности техник программист.
                        Увлекаюсь программированием и всем что с этим связанно, люблю запускать дронов во всяких интересных местах.
                        За время своего бытия попробовал много различных фреймворков библиотек и движков.
                        Пробовал писать игры, честно говоря получалось не очень.
                        На данный момент остановился на web разработке, и занимаюсь ей последние {CUR_YEARS_IN_DEV}.
                        Человек не конфликтный, и хотя и выгляжу как будто я завтра отброшу коньки, достаточно бодрый)
                    </p>
                </Parallax>
            </div>
        </div>
    </div>
}