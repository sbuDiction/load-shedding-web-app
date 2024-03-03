import { baseURL } from "@/globals";
import { SearchResultsType } from "@/types/searchResultsType";

class SearchAPI {
    static search = async (searchQuery: string) => {
        const request = new Request(`${baseURL}/search?text=${searchQuery}`, {
            method: 'GET'
        });
        const response = await fetch(request);
        const data = response.json();
        return data;
    }
}

export default SearchAPI;