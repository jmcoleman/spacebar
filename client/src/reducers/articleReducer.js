import {
  GET_ARTICLES,
  GET_ARTICLE,
  ADD_ARTICLE,
  UPDATE_ARTICLE,
  DELETE_ARTICLE,
  SCRAPE_ARTICLES
} from "../actions/types";

const initialState = {
  articles: [],
  article: {}
};

export default function(state = initialState, action) {
  console.log("action type is:  " + action.type);
  switch (action.type) {
    case SCRAPE_ARTICLES:
      console.log("made it to SCRAPE_ARTICLES");
      return {
        ...state,
        articles: action.payload
      };
    case GET_ARTICLES:
      console.log("made it to GET_ARTICLES");
      return {
        ...state,
        articles: action.payload
      };
    case GET_ARTICLE:
      console.log("made it to GET_ARTICLE");
      return {
        ...state,
        article: action.payload
      };
    case DELETE_ARTICLE:
      console.log("made it to DELETE_ARTICLE");
      console.log(state);
      return {
        ...state,
        articles: state.articles.filter(
          article => article._id !== action.payload
        )
      };
    case ADD_ARTICLE:
      console.log("made it to ADD_ARTICLE");
      return {
        ...state,
        articles: [action.payload, ...state.articles]
      };
    case UPDATE_ARTICLE:
      console.log("made it to UPDATE_ARTICLE");
      return {
        ...state,
        articles: state.articles.map(
          article =>
            article._id === action.payload._id
              ? (article = action.payload)
              : article
        )
      };
    default:
      console.log("Hit the default in articleReducer.");
      return state;
  }
}
