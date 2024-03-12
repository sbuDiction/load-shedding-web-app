import Skeleton from "react-loading-skeleton";
const LocationCardSekeleton = () => {
  return Array(3)
    .fill(1)
    .map((item, i) => (
      <div key={i} className="w-screen md:w-screen  md:justify-center lg:w-6/12  bg-white rounded-lg border border-gray-200 shadow-md p-3 flex items-center">
        <div className="flex-shrink-0">
          {/* Icon skeleton */}
          <Skeleton />
        </div>
        <div className="ml-4">
          {/* name and region skeleton */}
          <Skeleton />
        </div>

        <div className="ml-auto">
          {/* Subscribe button skeleton */}
          <Skeleton />
        </div>
      </div>
    ));
};

export default LocationCardSekeleton;
