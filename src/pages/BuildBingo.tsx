import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import Step from "@/components/wingo/Step";
import { BingoExampleData, Quote, Teacher, bingoExampleData } from "@/data/bingoExampleData";
import { useEffect, useRef, useState } from "react";
import { DndProvider, useDrag, useDrop } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";

interface Board {
  size: number;
  columns: {
    row: Array<Quote | undefined>;
  }[];
}

interface Size {
  id: string;
  size: number;
  name: string;
}

const sizes: Size[] = [
  { id: "1", size: 3, name: "3x3" },
  { id: "2", size: 4, name: "4x4" },
];

const DragItemType = "quote";

interface DragIndex {
  column: number;
  row: number;
}

const BuildBingo = () => {
  // -----------------------------
  // State Variables
  // -----------------------------

  const [data, setData] = useState<BingoExampleData | null>(null);
  const [teacher, setTeacher] = useState<Teacher | null>(null);
  const [size, setSize] = useState<Size | null>(null);
  const [board, setBoard] = useState<Board | null>(null);

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
    setData(bingoExampleData);
  };

  // -----------------------------
  // Data OUTPUT
  // -----------------------------

  const startGame = async () => {
    console.log("start game now with board: " + board);
  };

  // -----------------------------
  // Utility methods
  // -----------------------------

  const resetBoard = (size?: number) => {
    if (size != null) {
      Array(3).fill(undefined);
      setBoard({
        size: size,
        columns: Array.from({ length: size }, () => ({ row: Array.from({ length: size }, () => undefined) })),
      });
    } else {
      setBoard(null);
    }
  };

  const handleMove = (quote: Quote, from?: DragIndex, to?: DragIndex) => {
    if (board == null) {
      return;
    }

    const newBoard: Board = { ...board };

    // remove from board
    if (from != null && to == null) {
      newBoard.columns[from.column].row[from.row] = undefined;
    }

    // change pos on board
    if (from != null && to != null) {
      newBoard.columns[from.column].row[from.row] = undefined; // Clear the original slot
      newBoard.columns[to.column].row[to.row] = quote; // Place item in the new slot
    }

    // initial add
    if (from == null && to != null) {
      newBoard.columns[to.column].row[to.row] = quote;
    }

    setBoard(newBoard);
  };

  const quotesInBoard =
    board?.columns.flatMap((column) => column.row).filter((quote): quote is Quote => quote !== undefined) ?? [];

  const availableQuotes = teacher?.quotes.filter((c) => !quotesInBoard.some((bc) => bc == c)) ?? [];

  const allFilled = board != null && quotesInBoard.length == (size?.size ?? 0) * (size?.size ?? 0);

  return (
    <div className="container">
      {/* Intro */}
      <h1 className="text-2xl">Build your Game</h1>
      <p className="mt-1">
        Start by selecting a teacher, then build out the Bingo game build. If you're unsure how Bingo works, checkout{" "}
        <a className="underline" href="https://www.youtube.com/watch?v=nGCEpUAnkSg" target="_blank">
          this video
        </a>
        .
      </p>

      {/*
      // -----------------------------
      // Step 1: Select teacher
      // -----------------------------  
      */}

      <Step number={1} title="Select teacher" />

      <Select onValueChange={(v) => setTeacher(data!.teachers.find((t) => t.id == v)!)}>
        <SelectTrigger className="max-w-[400px]">
          <SelectValue placeholder="Select a teacher" />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            {data?.teachers.map((t) => {
              return (
                <SelectItem key={t.id} value={t.id}>
                  {t.name + " (" + t.shortName + ")"}
                </SelectItem>
              );
            })}
          </SelectGroup>
        </SelectContent>
      </Select>

      {/*
      // -----------------------------
      // Step 2: Select board size
      // -----------------------------  
      */}

      {teacher != null && (
        <div>
          <Step number={2} title="Choose board size" />

          <Select onValueChange={(v) => setSize(sizes.find((s) => s.id == v)!)}>
            <SelectTrigger className="max-w-[400px]">
              <SelectValue placeholder="Select size" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                {sizes.map((s) => {
                  return (
                    <SelectItem key={s.id} value={s.id}>
                      {s.name}
                    </SelectItem>
                  );
                })}
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>
      )}

      {/*
      // -----------------------------
      // Step 3: Build game
      // -----------------------------  
      */}

      {teacher != null && size != null && (
        <div>
          <Step number={3} title="Build game board" />

          <DndProvider backend={HTML5Backend}>
            <div className="flex flex-row flex-wrap gap-10">
              {/* Left/top */}
              {teacher != null && board != null && (
                <div
                  style={{ width: "500px", maxWidth: "500px" }}
                  className="bg-indigo-500 bg-opacity-25 rounded-2xl p-5 flex flex-col gap-5"
                >
                  {availableQuotes.map((c) => {
                    return (
                      <DraggableQuote
                        key={c.id}
                        quote={c}
                        handleMove={(quote, from, to) => handleMove(quote, from, to)}
                      />
                    );
                  })}
                </div>
              )}

              {/* Right/bottom */}
              {board != null && (
                <div
                  style={{ maxWidth: "500px" }}
                  className="bg-indigo-500 bg-opacity-25 rounded-2xl p-5 flex flex-col gap-3 flex-1 aspect-square"
                >
                  {board.columns.map((c, ci) => {
                    return (
                      <div key={ci} className="flex flex-row flex-1 gap-3">
                        {c.row.map((q, qi) => {
                          const index = ci + "-" + qi;
                          return (
                            <DropZone
                              key={index}
                              quote={q}
                              index={{ column: ci, row: qi }}
                              handleMove={(quote, from, to) => handleMove(quote, from, to)}
                            />
                          );
                        })}
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          </DndProvider>
        </div>
      )}

      {/*
      // -----------------------------
      // Step 4: Start game
      // -----------------------------  
      */}

      {board != null && (
        <div>
          <Step number={4} title="Start game" />

          {!allFilled && <p>Please fill the entire board before starting a game...</p>}

          {allFilled && <Button onClick={() => startGame()}>Start Game</Button>}
        </div>
      )}
    </div>
  );
};

// -----------------------------
// A single draggable quote
// -----------------------------

const DraggableQuote = (props: {
  quote: Quote;
  handleMove: (quote: Quote, from?: DragIndex, to?: DragIndex) => void;
}) => {
  const [, drag] = useDrag({
    type: DragItemType,
    item: { id: props.quote.id, quote: props.quote },
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

  return (
    <div className="bg-indigo-500 rounded-2xl p-4 cursor-pointer" ref={drag}>
      <p>{props.quote.template}</p>
    </div>
  );
};

// -----------------------------
// A single drop zone on the board
// -----------------------------

const DropZone = (props: {
  index: DragIndex;
  quote?: Quote;
  handleMove: (quote: Quote, from?: DragIndex, to?: DragIndex) => void;
}) => {
  // Setup drop target
  const [{ isOver, canDrop }, drop] = useDrop({
    accept: DragItemType,
    drop: () => ({ index: props.index }),
    collect: (monitor) => ({
      isOver: monitor.isOver(),
      canDrop: monitor.canDrop(),
    }),
  });

  // Setup drag source
  const [, drag] = useDrag({
    type: DragItemType,
    item: { id: props.quote?.id, from: props.index },
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

  return (
    <div
      ref={ref}
      className={`relative w-full flex-1  rounded-2xl p-4 cursor-pointer flex-1 ${
        isOver && canDrop ? "bg-indigo-400" : props.quote == null ? "bg-indigo-200" : "bg-indigo-500"
      }`}
      onClick={() => props.quote && props.handleMove(props.quote, props.index, undefined)}
    >
      <div className="absolute inset-0 p-1 p-3 truncate">
        <p className="text-xs text-center whitespace-normal">{props.quote?.template}</p>
      </div>
    </div>
  );
};

export default BuildBingo;
