const TableSkeleton = () => {
  return (
    <>
      <div className="flex flex-col items-center gap-1">
        <div className="w-full h-4 bg-gray-200 animate-pulse"></div>
        <div className="w-full h-4 bg-gray-200 animate-pulse"></div>
        <div className="w-full h-4 bg-gray-200 animate-pulse"></div>
      </div>
    </>
  );
};

export default TableSkeleton;
