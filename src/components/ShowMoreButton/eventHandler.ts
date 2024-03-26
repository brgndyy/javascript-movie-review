import { API_ENDPOINT } from '../../constants/api/api';
import { ShowMoreButtonOption } from '../../types/movie';
import { createMovieItems } from '../MovieContainer/render';
import removeHTMLElements from '../../utils/removeHTMLElements';
import pageManager from '../../services/PageManager';
import getMovieListByKeywordAndUpdatedPageNumber from '../../services/getMovieListByKeywordAndUpdatedPageNumber';

const MAX_PAGE_NUMBER = 10;

export const DATA_LENGTH_PER_PAGE = 20;

const checkMaxPage = (pageNumber: number, eventTarget: EventTarget) => {
  if (pageNumber > MAX_PAGE_NUMBER && eventTarget instanceof Element) {
    removeHTMLElements('.btn');
  }
};

export const checkDataLength = (dataLength: number) => {
  if (dataLength < DATA_LENGTH_PER_PAGE) removeHTMLElements('.btn');
};

export const getTotalApiUrl = (option: ShowMoreButtonOption, keyword: string, pageNumber: number) => {
  return option === 'search' && keyword.length > 0
    ? API_ENDPOINT.SEARCH(keyword, pageNumber)
    : API_ENDPOINT.POPULAR(pageNumber);
};

const fetchNextPage = async (event: Event, option: ShowMoreButtonOption, keyword: string) => {
  const updatePageNumber = pageManager.increasePage();
  const totalUrl = getTotalApiUrl(option, keyword, updatePageNumber);
  const movieListResults = await getMovieListByKeywordAndUpdatedPageNumber(totalUrl);
  checkDataLength(movieListResults.length);
  createMovieItems(movieListResults);
  if (!event.target) return;
  checkMaxPage(updatePageNumber, event.target);
};

let currentShowMoreEventHandler: (event: Event) => void;

const showMoreButtonEventHandler = (option: ShowMoreButtonOption, inputValue: string) => {
  return async (event: Event) => {
    fetchNextPage(event, option, inputValue);
  };
};

export const addShowMoreButtonEventListener = (option: ShowMoreButtonOption = 'popular', inputValue: string = '') => {
  const showMoreButton = document.querySelector('.btn');
  if (!showMoreButton) return;
  if (currentShowMoreEventHandler) showMoreButton.removeEventListener('click', currentShowMoreEventHandler);

  currentShowMoreEventHandler = showMoreButtonEventHandler(option, inputValue);
  showMoreButton.addEventListener('click', currentShowMoreEventHandler);
};
