import { memo } from "react";

const Background = () => {
  return (
    <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden">
      <div className="absolute -top-40 -right-40 w-[500px] h-[500px] bg-blue-100/40 rounded-full blur-[120px]"></div>
      <div className="absolute top-1/2 -left-20 w-80 h-80 bg-indigo-100/30 rounded-full blur-[100px]"></div>
      <div className="absolute top-10 right-[10%] w-32 h-32 bg-gradient-to-br from-blue-400/20 to-indigo-400/10 rounded-full animate-shape blur-sm"></div>
      <div className="absolute top-[15%] left-[15%] w-24 h-24 border border-blue-200/50 rotate-12 rounded-2xl glass-shape animate-shape-slow"></div>
      <div className="absolute top-1/3 -right-10 w-64 h-64 bg-indigo-50/60 rounded-full mix-blend-multiply filter blur-3xl opacity-70 animate-drift"></div>
      <div className="absolute top-[40%] right-[20%] w-16 h-16 border-4 border-slate-200/40 rounded-full animate-shape"></div>
      <div className="absolute bottom-[20%] -left-8 w-40 h-40 bg-gradient-to-tr from-blue-50 to-white/10 border border-blue-100/30 rounded-3xl rotate-[35deg] animate-shape glass-shape shadow-sm"></div>
      <div className="absolute top-1/2 right-[5%] w-20 h-20 bg-slate-100/80 rounded-full animate-shape-slow"></div>
      <div
        className="absolute bottom-10 right-10 w-48 h-48 bg-slate-100/40 rounded-full mix-blend-multiply filter blur-3xl opacity-50 animate-drift"
        style={{ animationDelay: "-2s" }}
      ></div>
      <div className="absolute top-1/4 left-1/4 w-3 h-3 bg-blue-400/40 rounded-full"></div>
      <div className="absolute bottom-1/3 right-1/3 w-2 h-2 bg-indigo-300/60 rounded-full animate-pulse"></div>
      <div className="absolute top-[60%] right-[10%] w-4 h-4 border border-blue-300/50 rounded-sm rotate-45"></div>
      <div className="absolute bottom-[15%] right-[25%] w-6 h-6 bg-blue-100/60 rounded-full glass-shape"></div>
    </div>
  );
};

export default memo(Background);
