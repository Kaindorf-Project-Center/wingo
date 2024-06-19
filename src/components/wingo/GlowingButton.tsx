import {backendURL} from "@/api/apiClient.ts";

export function GlowingButton() {
  return (
    <div className="flex justify-center items-center p-6">
      <div className="relative inline-flex  group">
        <div className="absolute transitiona-all duration-1000 opacity-70 -inset-px bg-gradient-to-r from-[#5865F2] via-[#5865F2] to-[#5865F2] rounded-md blur-lg group-hover:opacity-100 group-hover:-inset-1 group-hover:duration-200 animate-tilt"></div>
        <a
          href={backendURL + "/auth"}
          title="Get quote now"
          className="relative inline-flex items-center justify-center px-8 py-4 text-lg font-bold transition-all duration-200 font-pj rounded-xl focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-900 gap-4 bg-fill-input-primary"
          role="button"
        >
          <p className={"text-quaternary"}>Log in with Discord</p>
          <img src={"/discord_icon.svg"} alt={"Discord icon"} className={"w-[50px] h-[50px] text-white"} />
        </a>
      </div>
    </div>
  );
}
