import ru from "date-fns/esm/locale/ru/index.js";
import format from "date-fns/format";
import { Parallax } from "react-scroll-parallax";
import { Responsibility } from "./Responsibility";
import WorkPlaceStyles from "./styles/WorkPlace.module.scss";

export interface IWorkPlaceProps {
    name: string,
    project: string,
    location: string,
    sphere: string,
    site: string,
    logo: any,
    dateStart: Date,
    dateEnd: Date,
    responsibilities: (string | {
        group: string;
        items: string[];
    })[]
}

export function WorkPlace({
    logo,
    dateStart,
    dateEnd,
    site,
    sphere,
    location,
    project,
    responsibilities
}: IWorkPlaceProps) {
    return <Parallax
        opacity={ [ 0.25, 2 ] }
    >
        <div
            className={WorkPlaceStyles.WorkPlace}
        >
            <div
                className={WorkPlaceStyles.colDates}
            >
                <span>
                    { format(dateStart, "LLLL yyyy", { locale: ru }) }
                </span>

                <span>
                    { format(dateEnd, "LLLL yyyy", { locale: ru }) }
                </span>
            </div>

            <div
                className={WorkPlaceStyles.colResponsibilities}
            >
                {
                    responsibilities.map((e, i) => <Responsibility
                        responsibility={e}
                        key={i}
                    />)
                }
            </div>

            <div
                className={WorkPlaceStyles.colInfo}
            >
                
                <div>
                    <img
                        src={logo}
                        alt="Company logo"
                    />

                    <p> Сфера деятельности: <b> { sphere } </b> </p>
                    <p> Местоположение: { location } </p>
                    <p> Проект: <a href={project}> { project?.replace(/http(?:s)?:\/\//, "") } </a> </p>
                    <p> Сайт: <a href={site}> { site?.replace(/http(?:s)?:\/\//, "") } </a> </p>
                </div>
            </div>
        </div>
    </Parallax>
}