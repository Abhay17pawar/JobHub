import { ChevronRight, SparklesIcon } from "lucide-react";

export default function Button1({setClicked}) {
    const LinkedinData = async () => {
     setClicked(true);
    }
  return (
    <button
    onClick={LinkedinData}
      className="ml-1 group flex transform-gpu items-center gap-1 rounded-md px-2 py-1 transition-colors 
                 bg-black hover:bg-gray-900 active:bg-gray-800 text-white"
      type="button"
    >
      <SparklesIcon aria-hidden="true" className="size-6 text-white" />
      <span className="w-fit max-w-0 transform-gpu overflow-hidden transition-all duration-500 group-hover:max-w-20">
        <span className="transform-gpu whitespace-nowrap text-white text-xl opacity-0 transition-opacity duration-500 group-hover:opacity-100">
          LinkedIn
        </span>
      </span>
      <ChevronRight aria-hidden="true" className="size-6 text-white" />
    </button>
  );
}
