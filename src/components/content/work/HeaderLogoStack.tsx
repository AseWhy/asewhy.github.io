import { useEffect, useMemo, useRef, useState } from "react";
import { useSize } from "../../../hooks";
import { Stack } from "./stack";

import HeaderLogoStackModule from "./HeaderLogoStack.module.scss";

export interface StackViewPorps {
    height: number;
}

export function StackView() {
    const { ref, width, height } = useSize();
    const [ slide, setSlide ] = useState(0);
    const [ direction, setDirection ] = useState(1);
    const [ offset, setOffset ] = useState(0);

    const blocks = useMemo(() => Math.min(Math.floor(width / 144), 5), [ width ]);
    const intervalRef = useRef<any>();
    const imageWidth = useMemo(() => width / blocks, [ blocks, width ]);
    const imageHeight = useMemo(() => height * .6, [ height ]);

    useEffect(
        () => {
            if(intervalRef.current) {
                clearInterval(intervalRef.current);
            }

            intervalRef.current = setInterval(
                () => {
                    let newIndex = slide + direction;

                    if(newIndex <= 0) {
                        newIndex = slide + 1;
                    } else if(newIndex >= Stack.length / 2) {
                        newIndex = slide - 1;
                    }

                    let newOffset = imageWidth * newIndex;

                    setDirection(newIndex - slide);
                    setSlide(newIndex);

                    setOffset(-newOffset);
                },
                2500
            );

            return () => clearInterval(intervalRef.current);
        },
        [ imageWidth, slide ]
    );

    return  <div
        className={HeaderLogoStackModule.container}
        ref={ref}
    >
        {
            Stack.map(
                (item, i) => <div
                    key={item}
                    className={HeaderLogoStackModule.logo}
                    style={
                        {
                            position: 'relative',
                            left: offset,
                            width: imageWidth,
                            height: imageHeight
                        }
                    }
                >
                    <img
                        src={item}
                        width={imageWidth}
                        className={HeaderLogoStackModule.sponsor}
                        style={
                            {
                                height: imageHeight
                            }
                        }
                    />
                </div>
            )
        }
    </div>;
}