import React, { useEffect } from "react"
import { WikiResponseMapped } from "../models/wikiResponse"

/**
 * Add a debounce to a value change
 * @param value - The value to debounce
 * @param value - The delay in ms
 * @returns The debounced value
 */
export const useDebounce = (value: any, delay: number) => {
    const [debouncedValue, setDebouncedValue] = React.useState(value)
    useEffect(() => {
      const handler = setTimeout(() => {
        setDebouncedValue(value)
      }, delay)
      return () => {
        clearTimeout(handler)
      }
    }, [value, delay])
  
    return debouncedValue
  }

/**
 * Maps the response from the Wikipedia API to an array of WikiResponseMapped objects.
 * 
 * @param response - The response from the Wikipedia API.
 * @returns An array of WikiResponseMapped objects.
 */
export const MapWikiResponse = (response: any): WikiResponseMapped[] => {
    const mapped = response[1].map((title: string, index: number) => ({
        title: title,
        article: response[2][index]
    } as WikiResponseMapped))
    return mapped
}