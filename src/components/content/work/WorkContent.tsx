
import WorkContentStyles from "./styles/WorkContent.module.scss"
import { WorkPlace } from "./WorkPlace";
import { Experiance } from "./data";

export function WorkContent() {
    return <div
        className={WorkContentStyles.WorksContent}
        id="work"
    >
        <h2> Опыт работы </h2>

        <p>
            За время своего существования я успел поработать в некоторых местах (на самом деле пока в одном)), ниже приведен список этих мест, 
            с подробной информацией о каждом из мест работы.
        </p>

        <div
            className={WorkContentStyles.WorksList}
        >
            {
                Experiance.map(e => <WorkPlace
                    {...e}
                    key={e.name}
                />)
            }
        </div>
    </div>
}