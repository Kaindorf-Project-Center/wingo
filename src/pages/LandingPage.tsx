import {GlowingButton} from "@/components/wingo/GlowingButton.tsx";

function LandingPage() {
    return (
        <div className={"flex flex-col items-center justify-center w-screen h-screen"}>
            <div className={"w-[600px] flex flex-col items-center justify-center gap-6"}>
                <div>
                    <p className={"font-bold text-8xl mb-6 text-center text-primary"}>wingo</p>
                    <p className={"font-bold text-4xl text-center text-primary"}>Play bingo with your favourite teacher quotes!</p>
                </div>
                <GlowingButton/>
            </div>
        </div>
    );
}

export default LandingPage;