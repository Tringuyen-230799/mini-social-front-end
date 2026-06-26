import clsx from "clsx";

const Loading = ({ size = 4 }: { size: number }) => {
  return (
    <div className="min-w-40 h-6 flex justify-center ">
      <div
        className={clsx("loader")}
        style={{
          fontSize: `${size}px`,
        }}
      />
    </div>
  );
};

export default Loading;
