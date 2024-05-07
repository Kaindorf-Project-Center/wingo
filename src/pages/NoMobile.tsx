import { MdMobileOff } from "react-icons/md";

export function NoMobile() {
    return (
        <div className={"flex flex-col items-center justify-center w-full h-full p-6"}>
            <p className={"text-6xl text-center mb-[4rem] font-bold"}>Sorry, no mobile support</p>
            <MdMobileOff className={"h-[250px] w-[250px]"} />
        </div>
    );
}