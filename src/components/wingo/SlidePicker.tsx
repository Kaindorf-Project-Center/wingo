import {RefObject, useEffect, useRef, useState} from "react";

type Props = {
    values: string[]
    selectedIndex: number | undefined,
    setSelectedIndex: (index: number | undefined) => void
};



export function SlidePicker(props: Props) {
    const values: string[] = Array.from(new Set(props.values))

    // -----------------------------
    // State variables
    // -----------------------------

    const indicatorRef: RefObject<HTMLDivElement> = useRef<HTMLDivElement>(null);
    const optionsContainerRef = useRef<HTMLDivElement>(null)
    const [maxWidth, setMaxWidth] = useState<number | undefined>(undefined)

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

            if(maxWidth == undefined || newMax > maxWidth)
                setMaxWidth(newMax)
        }
    }, [optionsContainerRef, maxWidth]);

    useEffect(() => {
        if(maxWidth != undefined)
            setMaxWidth(undefined)
    }, [props.values])

    return (
        <div className="bg-[#6C6C6C77] rounded-md relative">
            <div ref={indicatorRef} className={"absolute h-full bg-[#99999977] rounded-md z-0 top-0 left-0 transition-all " + (props.selectedIndex == undefined ? "hidden" : "")} />
            <div ref={optionsContainerRef} className={"flex"}>
                {
                    values.map((value: string, index: number) => {
                        return (
                            <div key={value} className={"p-1 z-10 h-full cursor-default flex justify-center"} style={{width: maxWidth == undefined ? "auto" : `${maxWidth}px`}}
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