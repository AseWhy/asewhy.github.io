import Clouds from "./data/clouds.json";

export type CloudIndex = 0 | 1 | 2;

export interface ICloudProps {
    variation?: CloudIndex;
}

export function randomCloudIntex(): CloudIndex {
    return Math.round(Math.random() * 3) as CloudIndex;
}

export function Cloud({ variation = randomCloudIntex() }: ICloudProps) {
    const cloud = Clouds[variation];

    return <svg
        width={cloud.width + ".000000pt"}
        height={cloud.height + ".000000pt"}
        viewBox={"0 0 " + cloud.width  + ".000000 " + cloud.height + ".000000"}
    >
        <g
            transform={"translate(0.000000," + cloud.height + ".000000) scale(0.100000,-0.100000)"}
            fill="#ffffff"
            stroke="none"
        >
            <path 
                d={cloud.data}
            />
        </g>
    </svg>
}