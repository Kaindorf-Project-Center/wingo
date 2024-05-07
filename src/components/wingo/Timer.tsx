import {useEffect} from "react";

export function incrementTime(time: ITime): ITime {
    const newSeconds = (time.seconds + 1) % 60
    const overflowMinute = Math.floor((time.seconds + 1) / 60)
    const newMinutes = (time.minutes + overflowMinute) % 60
    const overflowHour = Math.floor((time.minutes + overflowMinute) / 60)
    const newHours = time.hours + overflowHour
    return {
        seconds: newSeconds,
        minutes: newMinutes,
        hours: newHours
    }
}

export interface ITime {
    seconds: number,
    minutes: number,
    hours: number
}

interface Props {
    time: ITime
    dispatch: React.DispatchWithoutAction
    timerRunning: boolean
}

const Timer = (props: Props) => {
    const formatTimeUnit = (unit: number) => (unit < 10 ? `0${unit}` : unit);

    useEffect(() => {
        if(!props.timerRunning)
            return

        const id = setInterval(() => {
            props.dispatch();
        }, 1000);
        return () => clearInterval(id);
    }, [props.dispatch, props.timerRunning]);

    return (
        <div>
            <p className={"text-6xl font-bold m-5"}>
                {formatTimeUnit(props.time.hours)}:
                {formatTimeUnit(props.time.minutes)}:
                {formatTimeUnit(props.time.seconds)}
            </p>
        </div>
    );
};

export default Timer;
