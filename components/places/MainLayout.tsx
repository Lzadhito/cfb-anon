import { StaticProps } from "common/types";

export default function MainLayout ({children}: StaticProps) {
  return (
    <div className="bg-base-300">
      <div className="flex flex-col items-center w-screen h-screen pb-28 no-scrollbar overflow-auto">
        {children}
      </div>
    </div>
  )
}