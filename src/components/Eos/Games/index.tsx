import React, { Fragment } from "react";
import { ChevronContract } from "react-bootstrap-icons";
import { Link } from "react-router-dom";
import { translate } from "../../../helpers";
import "./Games.scss";

type GamesProps = {
  games: any[];
  genres: any[];
};

const Tiles = ({ games, genres }: GamesProps) => {
  return (
    <Fragment>
      {games?.length ? games.map((game, index) => (
        <div
          className="card card-play col-md-4 col-12 mt-3 mb-3 w-100"
          key={index}
        >
          <div className="row box-shadow">
            <div
              className="col-12 d-md-flex justify-content-center"
              id="card-banner"
            >
              <img
                src={game.imgURL}
                alt="Avatar"
                className="game-img img-fluid w-100"
              />
            </div>
            <div className="play-button">
              <Link to={game.path} className="btn btn-sm btn-danger">
                {translate("game.play.button")}
              </Link>
            </div>
            <div className="card-body">
              <h1 className="text-md-left text-center">{game.name}</h1>
              {/* <small className="card-text"></small> */}
            </div>
          </div>
          <div className="row">
            <div className="col-12 mt-3 description">
              <p className="small m-0 mb-1">
                <ChevronContract className="mr-1" />
                {
                  <Fragment>
                    {genres.map((genre, index) =>
                      genre.id === game.genre ? (
                        <span key={index}>{genre.name}</span>
                      ) : (
                        ""
                      )
                    )}
                  </Fragment>
                }
              </p>
              <p className="card-text">{game.description}</p>
            </div>
          </div>
        </div>
      )) : null}
    </Fragment>
  );
};

const Games = ({ games, genres }: GamesProps) => {
  return (
    <div className="row justify-content-left">
      <Tiles games={games} genres={genres} />
    </div>
  );
};

export default Games;
