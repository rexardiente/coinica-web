import React, { useEffect } from "react";
import { connect } from "react-redux";
import { Controller } from "react-bootstrap-icons";
import Games from "../../Eos/Games/index";
import { games as gamesApi, genres as genresApi } from "services/api/server/index.js";
import { setGameList, setGenreList } from "redux/platform/platform_action";
import { translate } from "helpers/translate";

const All = ({ platform, dispatch }) => {
  const { gameList, genreList } = platform;

  useEffect(() => {
    // Fetch Games
    gamesApi().then(res => {
      dispatch(setGameList(res.data))
    })

    // Fetch Genres
    genresApi().then(res => {
      dispatch(setGenreList(res.data))
    })
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="row">
      <h4 className="mt-3 font-weight-bold ml-md-3 text-md-left text-center">
        <Controller className="mr-2" />
        {translate("home.gameList.title")}
      </h4>
      <>
        <Games games={gameList} genres={genreList}/>
      </>
      {/* <h5 className="mt-3">Section B</h5> */}
      {/* {this.gameComponent()} */}
    </div>
  );
}

const mapStateToProps = ({ platform }) => ({ platform });
const mapDispatchToProps = (dispatch) => ({ dispatch });
export default connect(mapStateToProps, mapDispatchToProps)(All);
