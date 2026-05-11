import ru from "date-fns/esm/locale/ru/index.js";
import format from "date-fns/format";

import { Parallax } from "react-scroll-parallax";
import { Responsibility } from "./Responsibility";

import WorkPlaceModule from "./WorkPlace.module.scss";

export interface IWorkPlaceProps {
    name: string,
    project: string,
    location: string,
    sphere: string,
    site: string,
    color?: string;
    last?: boolean;
    logo: any,
    dateStart: Date,
    dateEnd: Date,
    responsibilities: (string | {
        group: string;
        items: string[];
    })[]
}

const ACCENT_BY_COLOR: Record<string, string> = {
    skyblue: 'var(--color-accent-bifit)',
    red: 'var(--color-accent-recode)',
};

export function WorkPlace({
    logo,
    dateStart,
    dateEnd,
    site,
    color = 'red',
    last = false,
    sphere,
    location,
    project,
    responsibilities
}: IWorkPlaceProps) {
    const accent = ACCENT_BY_COLOR[color] ?? color;

    return <Parallax
        opacity={ [ 0.25, 2 ] }
    >
        <div
            className={WorkPlaceModule.WorkPlace}
            style={{ ['--job-accent' as any]: accent }}
            data-last={last}
        >
            <div
                className={WorkPlaceModule.colDates}
            >
                <span>
                    { format(dateStart, "LLLL yyyy", { locale: ru }) }
                </span>

                <span>
                    { format(dateEnd, "LLLL yyyy", { locale: ru }) }
                </span>
            </div>

            <div
                className={WorkPlaceModule.colResponsibilities}
            >
                {
                    responsibilities.map((e, i) => <Responsibility
                        responsibility={e}
                        key={i}
                    />)
                }
            </div>

            <div
                className={WorkPlaceModule.colInfo}
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
