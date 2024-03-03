import React from "react";
import SearchResultsCard from "./searchResultsCard";
import { ResultsType } from "@/types/results";

const SearchResults: React.FC<ResultsType> = ({ suburbs, handleSubscription }) => {
    // const handleSubscription=()=>{
    //     console.log();
        
    // }
    // const { suburbs, handleSubscription } = props;
    return (
        suburbs.map((suburb, i) => (
            <div key={i} className="flex justify-center items-center pt-2 pl-1  ">
                <SearchResultsCard
                    name={suburb.name}
                    region={suburb.region}
                    block={suburb.block}
                    sid={suburb.sid}
                    handleSubscription={handleSubscription}
                />
            </div>
        ))
    );
}

export default SearchResults;