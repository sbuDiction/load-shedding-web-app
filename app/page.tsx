"use client";
import ScheduleAPI from "@/api/schedul.api";
import SearchAPI from "@/api/search.api";
import LoadSheddingOverviewList, {
  ScheduleOverview,
} from "@/components/loadSheddingOverviewList";
import NavigationBar from "@/components/navbar";
import SearchResults from "@/components/searchResults";
import { ResultsType } from "@/types/results";
import LocalStorageManager, { Subscription } from "@/utils/localStorageManager";
import { useEffect, useState } from "react";

export default function Home() {
  const [results, setResults] = useState<ResultsType>({ suburbs: [] });
  const [isSearch, setIsSearch] = useState(false);
  const handleIsSearch = (data: any) => {
    setIsSearch(true);
    setResults(data);
  };

  const handleSubscription = () => {
    setIsSearch(false);
  };

  return (
    <>
      <div className="main_layout">
        <NavigationBar liftSearchResults={handleIsSearch} />
        <div className="container">
          {isSearch ? (
            <div className="search_results">
              <SearchResults
                handleSubscription={handleSubscription}
                suburbs={results.suburbs}
              />
            </div>
          ) : (
            <LoadSheddingOverviewList />
          )}
          <div></div>
        </div>
      </div>
    </>
  );
}
