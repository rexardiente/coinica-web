import { ServerAPI } from "Config"; 

// assets
// const Mons001 = `${ServerAPI.assets_url}/imgs/games/ghost_quest/ghost_icons/mons_001.png`;
// const Mons002 = `${ServerAPI.assets_url}/imgs/games/ghost_quest/ghost_icons/mons_002.png`;
// const Mons003 = `${ServerAPI.assets_url}/imgs/games/ghost_quest/ghost_icons/mons_003.png`;
// const Mons004 = `${ServerAPI.assets_url}/imgs/games/ghost_quest/ghost_icons/mons_004.png`;
// const Mons005 = `${ServerAPI.assets_url}/imgs/games/ghost_quest/ghost_icons/mons_005.png`;
// const Mons006 = `${ServerAPI.assets_url}/imgs/games/ghost_quest/ghost_icons/mons_006.png`;
// const Mons007 = `${ServerAPI.assets_url}/imgs/games/ghost_quest/ghost_icons/mons_007.png`;
// const Mons008 = `${ServerAPI.assets_url}/imgs/games/ghost_quest/ghost_icons/mons_008.png`;
// const Mons009 = `${ServerAPI.assets_url}/imgs/games/ghost_quest/ghost_icons/mons_009.png`;
// const Mons010 = `${ServerAPI.assets_url}/imgs/games/ghost_quest/ghost_icons/mons_010.png`;
// const Mons011 = `${ServerAPI.assets_url}/imgs/games/ghost_quest/ghost_icons/mons_011.png`;
// const Mons012 = `${ServerAPI.assets_url}/imgs/games/ghost_quest/ghost_icons/mons_012.png`;

// export const GHOST_AVATAR_MAP = {
//   ATK: [Mons001, Mons002, Mons003],
//   DEF: [Mons004, Mons005, Mons006],
//   SPD: [Mons007, Mons008, Mons009],
//   LUK: [Mons010, Mons011, Mons012],
// }

// const loadImage = async(id) => {
//   try {
//     const image = await import(`assets/imgs/games/ghost_quest/ghost_images/ghost_id_${id}.png`);
//     return image?.default;
//   } catch (e) {
//     console.error({ error_loading_image: e })
//     return null;
//   }
// }

const GET_GHOST_AVATAR = ({ ghost_id }) => {
  // let ghost_avatar = await loadImage(ghost_id)
  // return ghost_avatar
  return `${ServerAPI.assets_url}/imgs/games/ghost_quest/ghost_images/ghost_id_${ghost_id}.png`;
}

export default GET_GHOST_AVATAR
