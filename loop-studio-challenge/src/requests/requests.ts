import axios from "axios";


/**
 * Makes a request to the Wikipedia API to search for a given term.
 * @param searchTerm - The term to search for in Wikipedia.
 * @returns A Promise that resolves to the response data from the API, or rejects with an error.
 */
export const wikiRequest = async (searchTerm: string) => {
const apiUrl = `https://en.wikipedia.org/w/api.php?origin=*&action=opensearch&search=${searchTerm}`;

try {
    const response = await axios.get(apiUrl);
    return response.data;
} catch (error) {
    return Promise.reject(error);
}
}
