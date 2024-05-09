import {RefObject, useEffect, useRef, useState} from "react";

type Props = {
    values: string[]
    selectedIndex: number | undefined,
    setSelectedIndex: (index: number | undefined) => void
    backgroundColor?: string
    foregroundColor?: string
};

const sliderItemStyle: string = "p-1 z-10 h-full cursor-default flex justify-center px-3"

export function SlidePicker(props: Props) {
    const values: string[] = Array.from(new Set(props.values))

    // -----------------------------
    // State variables
    // -----------------------------

    const indicatorRef: RefObject<HTMLDivElement> = useRef<HTMLDivElement>(null);
    const optionsContainerRef = useRef<HTMLDivElement>(null)
    const [maxWidth, setMaxWidth] = useState<number>(0)

    // -----------------------------
    // Effects
    // -----------------------------

    useEffect(() => {
        if(indicatorRef.current)
            indicatorRef.current.style.width = 100 / values.length + "%"
    }, [indicatorRef.current]);

    useEffect(() => {
        if(indicatorRef.current && props.selectedIndex != undefined) {
            indicatorRef.current.style.left = 100 / values.length * props.selectedIndex + "%"
            props.setSelectedIndex(props.selectedIndex)
        }
    }, [props.selectedIndex]);

    useEffect(() => {
        if(optionsContainerRef.current)
        {
            let newMax: number = 0;

            [...optionsContainerRef.current.children].forEach(option => {
                if(option.clientWidth > newMax)
                {
                    newMax = option.getBoundingClientRect().width
                }
            })

            setMaxWidth(newMax)
        }
    }, [optionsContainerRef, props.values]);

    return (
        <div className="relative inline-flex h-10 items-center justify-center rounded-md bg-muted p-1 text-muted-foreground" style={{background: props.backgroundColor ?? "#6C6C6C77" ,width: `${maxWidth * props.values.length}px`}}>
            <div ref={indicatorRef} className={"absolute h-full w-full z-0 top-0 left-0 p-1 " + (props.selectedIndex == undefined ? "hidden" : "transition-all")}>
                <div className={"h-full w-full rounded-sm bg-opacity-40"} style={{background: props.foregroundColor ?? "#999"}} />
            </div>

            <div ref={optionsContainerRef} className="absolute">
                {
                    values.map((value: string) => {
                        return (
                            <div key={value} className={"absolute invisible " + sliderItemStyle}>
                                {value}
                            </div>
                        )
                    })
                }
            </div>

            <div className={"flex"}>
                {
                    values.map((value: string, index: number) => {
                        return (
                            <div key={value} className={sliderItemStyle} style={{width: `${maxWidth}px`}}
                                 onClick={() => props.setSelectedIndex(index)}>
                                {value}
                            </div>
                        )
                    })
                }
            </div>
        </div>
    );
}