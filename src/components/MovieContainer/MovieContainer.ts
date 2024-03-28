import { renderHandler } from './render';
import { API_ENDPOINT, API_OPTION } from '../../constants/api/api';
import renderMovieItemDetailModalHandler from '../MovieItem/eventHandler';
import { initializeInfiniteScroll } from '../ShowMoreButton/infiniteScrollHandler';
import movieFetcher from '../../services/MovieFetcher';
import MovieStorageService from '../../services/MovieStorageService';

async function MovieContainer() {
  const dataFromServer = await movieFetcher.fetchData(API_ENDPOINT.POPULAR(), {
    headers: API_OPTION.headers,
  });
  const { results } = dataFromServer;
  const data = MovieStorageService.addData(results);

  renderHandler(data);
  initializeInfiniteScroll();
  renderMovieItemDetailModalHandler();
}

export default MovieContainer;
