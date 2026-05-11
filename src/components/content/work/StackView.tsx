import { useEffect, useMemo, useState } from "react";
import { useSize } from "../../../hooks";
import { Stack } from "./stack";

import StackViewModule from "./StackView.module.scss";

const SLIDE_INTERVAL = 2800;
const SLIDE_DURATION = 600;
const SLOT_TARGET_WIDTH = 170;
const MAX_VISIBLE = 5;

export function StackView() {
    const { ref, width } = useSize();

    const visible = useMemo(
        () => (width ? Math.max(1, Math.min(Math.floor(width / SLOT_TARGET_WIDTH), MAX_VISIBLE)) : 0),
        [ width ]
    );
    const slotWidth = useMemo(
        () => (visible ? width / visible : 0),
        [ width, visible ]
    );

    // original list + a copy of its head, so sliding past the end wraps seamlessly
    const items = useMemo(
        () => (visible ? [ ...Stack, ...Stack.slice(0, visible) ] : Stack),
        [ visible ]
    );

    const [ index, setIndex ] = useState(0);
    const [ animated, setAnimated ] = useState(true);

    useEffect(() => { setIndex(0); }, [ visible ]);

    useEffect(() => {
        if (!slotWidth) {
            return;
        }

        const id = window.setInterval(() => setIndex(i => i + 1), SLIDE_INTERVAL);

        return () => window.clearInterval(id);
    }, [ slotWidth ]);

    // when we've slid onto the duplicated head, snap back to the real start without animation
    useEffect(() => {
        if (index < Stack.length) {
            return;
        }

        const id = window.setTimeout(() => {
            setAnimated(false);
            setIndex(0);
        }, SLIDE_DURATION + 40);

        return () => window.clearTimeout(id);
    }, [ index ]);

    // re-enable the transition a couple of frames after the snap
    useEffect(() => {
        if (animated) {
            return;
        }

        let raf2 = 0;
        const raf1 = requestAnimationFrame(() => {
            raf2 = requestAnimationFrame(() => setAnimated(true));
        });

        return () => {
            cancelAnimationFrame(raf1);
            cancelAnimationFrame(raf2);
        };
    }, [ animated ]);

    return <div
        className={StackViewModule.container}
        ref={ref}
    >
        <div
            className={StackViewModule.track}
            data-animated={animated}
            style={{
                transform: `translate3d(${-index * slotWidth}px, 0, 0)`,
                transitionDuration: `${SLIDE_DURATION}ms`,
            }}
        >
            {
                items.map((item, i) => <div
                    key={i}
                    className={StackViewModule.slot}
                    style={{ flex: `0 0 ${slotWidth}px`, width: slotWidth }}
                >
                    <img
                        src={item}
                        className={StackViewModule.sponsor}
                        alt=""
                    />
                </div>)
            }
        </div>
    </div>;
}
