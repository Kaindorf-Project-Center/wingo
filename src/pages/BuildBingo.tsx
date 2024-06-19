import {Button} from "@/components/ui/button";
import {Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue} from "@/components/ui/select";
import {useEffect, useRef, useState} from "react";
import {DndProvider, useDrag, useDrop} from "react-dnd";
import {HTML5Backend} from "react-dnd-html5-backend";
import {useNavigate} from "react-router-dom";
import AppCache from "@/models/AppCache.ts";
import {useService} from "@/hooks/useService.ts";
import {SlidePicker} from "@/components/wingo/SlidePicker.tsx";
import {ITeacher} from "@/models/ITeacher.ts";
import {IQuote} from "@/models/IQuote.ts";
import {getTeacherData} from "@/api/apiClient.ts";
import {TeacherData} from "@/data/TeacherData.ts";
import {container} from "tsyringe";
import {useSubscribe} from "@/hooks/useSubscribe.ts";

interface Size {
    id: string;
    size: number;
    name: string;
}

const sizes: Size[] = [
    {id: "1", size: 2, name: "2x2"},
    {id: "2", size: 3, name: "3x3"},
    {id: "3", size: 4, name: "4x4"},
    {id: "4", size: 5, name: "5x5"},
];

const DragItemType = "quote";

interface DragIndex {
    column: number;
    row: number;
}

const BuildBingo = () => {
    const appCache = useService(AppCache)
    const navigate = useNavigate();

    const teachersData = container.resolve(TeacherData)
    const teachers = useSubscribe(teachersData.teachers)

    // -----------------------------
    // State Variables
    // -----------------------------

    const [teacher, setTeacher] = useState<ITeacher | null>(null);
    const [size, setSize] = useState<Size | null>(null);
    const [columns, setColumns] = useState<{row: (undefined | IQuote)[]}[]>([])

    // -----------------------------
    // Effects
    // -----------------------------

    useEffect(() => {
        loadData();
    }, []);

    useEffect(() => {
        if (size != null) {
            resetBoard(size.size);
        }
    }, [size]);

    useEffect(() => {
        if (teacher != null) {
            resetBoard(size?.size ?? undefined);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [teacher]);

    // -----------------------------
    // Data INPUT
    // -----------------------------

    const loadData = async () => {
        // TODO: load actual data

        await getTeacherData()
    };

    // -----------------------------
    // Data OUTPUT
    // -----------------------------

    const startGame = async () => {
        if (size == null || columns.length == 0 || teacher == null)
            return

        const cleanColumns: {row: IQuote[]}[] = []
        const saidQuotes: boolean[][] = []
        for (let i = 0; i < size.size; i++) {
            saidQuotes.push([])
            cleanColumns.push({row: []})
            for (let j = 0; j < size.size; j++) {
                saidQuotes[i].push(false)

                if(columns[i].row[j] == undefined)
                    return
                cleanColumns[i].row.push(columns[i].row[j]!)
            }
        }

        appCache.playingGame.next({
            board: {
                teacher: teacher,
                size: size.size,
                columns: cleanColumns
            },
            saidQuotes: saidQuotes,
        })

        navigate("/game");
    };

    // -----------------------------
    // Utility methods
    // -----------------------------

    const resetBoard = (size?: number) => {
        if (size != null) {
            setColumns(Array.from({length: size},
                () => ({row: Array.from({length: size}, () => undefined)})))
        }
        else
            setColumns([])
    };

    const handleMove = (quote: IQuote, from?: DragIndex, to?: DragIndex) => {
        if (columns.length == 0) {
            return;
        }

        const newColumns: {row: (undefined | IQuote)[]}[] = [...columns];

        // remove from board
        if (from != null && to == null) {
            newColumns[from.column].row[from.row] = undefined;
        }

        // change pos on board
        if (from != null && to != null) {
            newColumns[from.column].row[from.row] = undefined; // Clear the original slot
            newColumns[to.column].row[to.row] = quote; // Place item in the new slot
        }

        // initial add
        if (from == null && to != null) {
            newColumns[to.column].row[to.row] = quote;
        }

        setColumns(newColumns)
    };

    const quotesInBoard =
        columns.flatMap((column) => column.row).filter((quote): quote is IQuote => quote !== undefined) ?? [];

    const availableQuotes = teacher?.quotes.filter((c) => !quotesInBoard.some((bc) => bc == c)) ?? [];

    const allFilled = columns.length > 0 && quotesInBoard.length == (size?.size ?? 0) * (size?.size ?? 0);

    return (
        <div className="h-full max-w-[1000px] mx-auto py-6">
            {/* Intro */}
            <div className={"px-6 pb-3 border-b"}>
                <h1 className="text-2xl font-bold">Build your Game</h1>
                <p className="mt-1">
                    Start by selecting a teacher, then build out the Bingo game build. If you're unsure how Bingo works,
                    checkout{" "}
                    <a className="underline" href="https://www.youtube.com/watch?v=nGCEpUAnkSg" target="_blank">
                        this video
                    </a>
                    .
                </p>
            </div>

            {/*
            // -----------------------------
            // Bingo creation
            // -----------------------------
            */}

            <div className="flex w-full h-[calc(570px)]">
                {/*
                // -----------------------------
                // Step 1: Select teacher & teacher quotes
                // -----------------------------
                */}
                <div className={"w-[40%] border-r"}>
                    <div>
                        <div className={"p-3"}>
                            <Select onValueChange={(v) => setTeacher(teachers?.find((t) => t.teacherId == v) ?? null)}>
                                <SelectTrigger className="max-w-[400px]">
                                    <SelectValue placeholder="Select a teacher"/>
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectGroup>
                                        {teachers?.map((t) => {
                                            return (
                                                <SelectItem key={t.teacherId} value={t.teacherId}>
                                                    {t.shortHand + ": " + t.name}
                                                </SelectItem>
                                            );
                                        })}
                                    </SelectGroup>
                                </SelectContent>
                            </Select>
                        </div>
                    </div>

                    {/*
                    // -----------------------------
                    // Quotes list
                    // -----------------------------
                    */}

                    <DndProvider backend={HTML5Backend}>
                        <div
                            className="w-full max-w-[500px] h-full max-h-[500px] overflow-y-scroll px-5 flex flex-col gap-5"
                        >
                            {teacher != null &&
                                availableQuotes.map((c) => {
                                    return (
                                        <DraggableQuote
                                            key={c.quoteId}
                                            quote={c}
                                            handleMove={(quote, from, to) => handleMove(quote, from, to)}
                                        />
                                    );
                                })
                            }
                        </div>
                    </DndProvider>
                </div>


                {/*
                // -----------------------------
                // Step 2: Select board size & drop fields
                // -----------------------------
                */}
                <div className={"w-[60%]"}>
                    <div className={"mx-auto max-w-[500px]"}>
                        <div className={"py-3 flex items-center gap-3 justify-between"}>
                            <div className={"flex items-center gap-3"}>
                                <p className={"text-lg"}>Field size: </p>

                                <SlidePicker
                                    values={sizes.map(s => s.name)}
                                    selectedIndex={size ? sizes.findIndex(s => s.id === size.id) : undefined}
                                    setSelectedIndex={i => setSize(i == undefined ? null : sizes[i])}
                                />
                            </div>

                            {/*
                            // -----------------------------
                            // Start game
                            // -----------------------------
                            */}

                            <Button onClick={() => startGame()} disabled={!allFilled}>Start Game</Button>
                        </div>

                        {/*
                    // -----------------------------
                    // Wingo grid drop fields
                    // -----------------------------
                    */}

                        <DndProvider backend={HTML5Backend}>
                            <div
                                className="w-full max-w-[500px] h-full max-h-[500px] rounded-lg p-3 flex flex-col gap-3 flex-1 aspect-square bg-fill-tertiary"
                            >
                                {columns.length > 0 &&
                                    columns.map((c, ci) => {
                                        return (
                                            <div key={ci} className="flex flex-row flex-1 gap-3">
                                                {c.row.map((q, qi) => {
                                                    const index = ci + "-" + qi;
                                                    return (
                                                        <DropZone
                                                            key={index}
                                                            quote={q}
                                                            index={{column: ci, row: qi}}
                                                            handleMove={(quote, from, to) => handleMove(quote, from, to)}
                                                        />
                                                    );
                                                })}
                                            </div>
                                        );
                                    })
                                }
                            </div>
                        </DndProvider>
                    </div>
                </div>
            </div>
        </div>
    );
};

// -----------------------------
// A single draggable quote
// -----------------------------

const DraggableQuote = (props: {
    quote: IQuote;
    handleMove: (quote: IQuote, from?: DragIndex, to?: DragIndex) => void;
}) => {
    const [, drag] = useDrag({
        type: DragItemType,
        item: {id: props.quote.quoteId, quote: props.quote},
        end: (item, monitor) => {
            const dropResult = monitor.getDropResult();
            if (item && dropResult) {
                props.handleMove(props.quote, undefined, (dropResult as unknown as { index: DragIndex }).index);
            }
        },
        collect: (monitor) => ({
            isDragging: monitor.isDragging(),
        }),
    });

    const ref = useRef<HTMLDivElement>(null);
    drag(ref)

    return (
        <div className="rounded-lg p-4 cursor-pointer bg-fill-quaternary" ref={ref}>
            <p>{props.quote.quote}</p>
        </div>
    );
};

// -----------------------------
// A single drop zone on the board
// -----------------------------

const DropZone = (props: {
    index: DragIndex;
    quote?: IQuote;
    handleMove: (quote: IQuote, from?: DragIndex, to?: DragIndex) => void;
}) => {
    // Setup drop target
    const [{isOver, canDrop}, drop] = useDrop({
        accept: DragItemType,
        drop: () => ({index: props.index}),
        collect: (monitor) => ({
            isOver: monitor.isOver(),
            canDrop: monitor.canDrop(),
        }),
    });

    // Setup drag source
    const [, drag] = useDrag({
        type: DragItemType,
        item: {id: props.quote?.quoteId, from: props.index},
        canDrag: !!props.quote,
        end: (item, monitor) => {
            const dropResult = monitor.getDropResult();
            if (item && dropResult) {
                props.handleMove(props.quote!, item.from, (dropResult as unknown as { index: DragIndex }).index);
            }
        },
        collect: (monitor) => ({
            isDragging: monitor.isDragging(),
        }),
    });

    const ref = useRef<HTMLDivElement>(null);

    // Connect drag and drop using a single ref
    drag(drop(ref));


    // TODO
    console.log(    `${
                isOver && canDrop ? "bg-indigo-400" : props.quote == null ? "bg-indigo-200" : "bg-indigo-500"
            }`)

    return (
        <div
            ref={ref}
            className={`relative w-full flex-1 rounded-md p-4 cursor-pointer bg-fill-quaternary`}
            onClick={() => props.quote && props.handleMove(props.quote, props.index, undefined)}
        >
            <div className="absolute inset-0 p-3 flex justify-center items-center overflow-y-scroll">
                <p className="text-xs text-center whitespace-normal">{props.quote?.quote}</p>
            </div>
        </div>
    );
};

export default BuildBingo;
