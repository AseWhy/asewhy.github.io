import { RefObject, useEffect, useMemo, useRef, useState } from "react";

/**
 * Получить размеры элемента переданного по ссылке
 * 
 * @param myRef ссылка
 * @returns размеры элемента
 */
export function useResize(myRef: RefObject<HTMLElement>) {
    const prevObserve = useRef<any>();

    const [ width, setWidth ] = useState(0);
    const [ height, setHeight ] = useState(0);

    const observer = useMemo(
        () => new ResizeObserver(entries => {
            for(const { target } of entries) {
                setWidth(target.clientWidth)
                setHeight(target.clientHeight)
            }
        }),
        [ ]
    )

    useEffect(
        () => {
            if(myRef.current == null) {
                return;
            }

            if(prevObserve.current != null) {
                observer.unobserve(prevObserve.current);
            }
            
            observer.observe(myRef.current);

            prevObserve.current = myRef.current;

            return () => {
                observer.disconnect();
            }
        },
        [ myRef ]
    );
  
    return { width, height }
}

/**
 * Получить размеры элемента
 * 
 * @returns размеры элемента и ссылка для измерения
 */
export function useSize() {
    const ref = useRef<any>();

    return {
        ref,
        ...useResize(ref)
    };
}