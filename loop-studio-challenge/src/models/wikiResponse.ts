/**
 * Represents a response from the Wikipedia API.
 * @interface WikiResponse
 * @param {string} title - The title of the article.
 * @param {string} article - The article.
 */
export interface WikiResponseMapped {
    title: string;
    article: string;
}