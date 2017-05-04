import React from 'react';
const TMDBLogo = 'https://www.themoviedb.org/assets/static_cache/41bdcf10bbf6f84c0fc73f27b2180b95/images/v4/logos/91x81.png';

const List = (props) => {
  let postUrl = 'https://image.tmdb.org/t/p/w500';
  const { original_title, overview, poster_path } = props;
  postUrl = `${postUrl}${poster_path}`;
  return(
    <li className="list-group-item">
      <div className="media">
          <div className="media-left">
            <a href="#">
              <img className="media-object" width="100" src={postUrl ? postUrl: TMDBLogo} alt="..."/>
            </a>
          </div>
          <div className="media-body">
            <h4 className="media-heading">{props.original_title}</h4>
            <p>{props.overview}</p>
          </div>
        </div>
    </li>
  )
}

export default List;
