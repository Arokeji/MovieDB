import { useState } from "react";

export const usePagination = (items, itemsPerPage = 4) => {
  // Pagination
  const [numItemsToShow, setNumItemsToShow] = useState(itemsPerPage);
  const firstItems = items?.slice(0, numItemsToShow) || [];
  const showMore = () => {
    setNumItemsToShow(numItemsToShow + itemsPerPage);
  };
  const isThereAnymore = items?.length > numItemsToShow;

  return [firstItems, showMore, isThereAnymore];
};
