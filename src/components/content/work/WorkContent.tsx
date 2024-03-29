import { WorkPlace } from "./WorkPlace";
import { Experiance } from "./data";
import { formatDuration, intervalToDuration } from "date-fns";
import { ru } from "date-fns/locale";
import { StackView } from "./StackView";

import WorkContentModule from "./WorkContent.module.scss"

const MIN_START = Math.min(...Experiance.map(e => e.dateStart.getTime()));
const MAX_END = Math.max(...Experiance.map(e => e.dateEnd.getTime()));
const DIFFERENCE = intervalToDuration({ start: MIN_START, end: MAX_END });
const format = ["years", "months", "weeks", "days"];

export function WorkContent() {
    return <div
        className={WorkContentModule.WorksContent}
        id="work"
    >
        <h2> Опыт работы </h2>

        <p>
            За время своего существования я успел поработать в некоторых местах, ниже приведен список этих мест, 
            с подробной информацией о каждом из мест работы
        </p>

        <StackView/>

        <div
            className={WorkContentModule.WorksList}
        >
            {
                Experiance.map(e => <WorkPlace
                    {...e}
                    key={e.name}
                />)
            }
        </div>

        <p
            className={WorkContentModule.FootContent}
        >
            Общий стаж: { formatDuration(DIFFERENCE, { locale: ru, format }) }
        </p>
    </div>
}