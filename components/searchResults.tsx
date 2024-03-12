import React, { Suspense } from "react";
import SearchResultsCard from "./searchResultsCard";
import { ResultsType } from "@/types/results";
import LocationCardSekeleton from "./LocationCardSekeleton";

const SearchResults: React.FC<ResultsType> = ({
  suburbs,
  handleSubscription,
}) => {

  return (
    <>
      {/* <Suspense fallback={<LocationCardSekeleton />}> */}
        {suburbs.map((suburb, i) => (
          <div key={i} className="flex justify-center items-center pt-2 pl-1  ">
            <SearchResultsCard
              name={suburb.name}
              region={suburb.region}
              block={suburb.block}
              sid={suburb.sid}
              handleSubscription={handleSubscription}
            />
          </div>
        ))}
      {/* </Suspense> */}
    </>
  );
};

export default SearchResults;
