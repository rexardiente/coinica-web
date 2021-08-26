import { ServerAPI } from "Config"; 
// ATTACK GHOSTS
export const Mons01 = `${ServerAPI.assets_url}/imgs/games/ghost_quest/ghost_icons/attack_ghosts/mons_1.png`;
export const Mons02 = `${ServerAPI.assets_url}/imgs/games/ghost_quest/ghost_icons/attack_ghosts/mons_2.png`;
export const Mons03 = `${ServerAPI.assets_url}/imgs/games/ghost_quest/ghost_icons/attack_ghosts/mons_3.png`;
// DEFENSE GHOSTS
export const Mons04 = `${ServerAPI.assets_url}/imgs/games/ghost_quest/ghost_icons/defense_ghosts/mons_1.png`;
export const Mons05 = `${ServerAPI.assets_url}/imgs/games/ghost_quest/ghost_icons/defense_ghosts/mons_2.png`;
export const Mons06 = `${ServerAPI.assets_url}/imgs/games/ghost_quest/ghost_icons/defense_ghosts/mons_3.png`;
// LUCK GHOSTS
export const Mons07 = `${ServerAPI.assets_url}/imgs/games/ghost_quest/ghost_icons/luck_ghosts/mons_1.png`;
export const Mons08 = `${ServerAPI.assets_url}/imgs/games/ghost_quest/ghost_icons/luck_ghosts/mons_2.png`;
// SPEED GHOSTS
export const Mons09 = `${ServerAPI.assets_url}/imgs/games/ghost_quest/ghost_icons/speed_ghosts/mons_1.png`;
export const Mons10 = `${ServerAPI.assets_url}/imgs/games/ghost_quest/ghost_icons/speed_ghosts/mons_2.png`;
export const Mons11 = `${ServerAPI.assets_url}/imgs/games/ghost_quest/ghost_icons/speed_ghosts/mons_3.png`;

export const GHOST_AVATAR_MAP = {
  ATK: [Mons01, Mons02, Mons03],
  DEF: [Mons04, Mons05, Mons06],
  LUK: [Mons07, Mons08, Mons08],
  SPD: [Mons09, Mons10, Mons11],
}

const GET_GHOST_IMAGE = ({ ghost_class, level }) => {
  let ghost_obj = {
    image: null,
    size: 1,
    name: '',
    description: ''
  }

  switch(+ghost_class) {
    case 1: // ATTACK TYPE GHOST
      if (level < 3) {
        ghost_obj.name = 'FoxGhost'
        ghost_obj.description = 'FoxGhost is a split between a fox and a cat. These little creatures happily return the favor to people who have helped them.'
        ghost_obj.image = GHOST_AVATAR_MAP.ATK[0]
        ghost_obj.size = 1.3
      } else if (level < 5) {
        ghost_obj.name = 'WhiteFox'
        ghost_obj.description = 'A WhiteFox is Fox Spirit with increased spectral power. It is said that the WhiteFox brings happiness to people.'
        ghost_obj.image = GHOST_AVATAR_MAP.ATK[1]
        ghost_obj.size = 1
      } else if (level >= 5) {
        ghost_obj.name = 'Tenko'
        ghost_obj.description = `A fox ghost with divine powers. After living 1000 years, fox ghost becomes "Tenko".`
        ghost_obj.image = GHOST_AVATAR_MAP.ATK[2]
        ghost_obj.size = 0.8
      }
      break;
    case 2: // DEFENSE TYPE GHOST
      if (level < 3) {
        ghost_obj.name = 'MameDanuki'
        ghost_obj.description = 'MameDanuki is a raccoon ghost, they take the form of a human and sit in the barn door.'
        ghost_obj.image = GHOST_AVATAR_MAP.DEF[0]
        ghost_obj.size = 1.1
      } else if (level < 5) {
        ghost_obj.name = 'BakeDanuki'
        ghost_obj.description = 'BakeDanuki is a mischievous ghost and takes the form of humans in order to to fool them.'
        ghost_obj.image = GHOST_AVATAR_MAP.DEF[1]
        ghost_obj.size = 0.9
      } else if (level >= 5) {
        ghost_obj.name = 'FullDanuki'
        ghost_obj.description = 'A grown-up BakeDanuki with powerful witchcraft. BakeDanuki can distract people with mirages.'
        ghost_obj.image = GHOST_AVATAR_MAP.DEF[2]
        ghost_obj.size = 0.8
      }
      break;
    case 3: // LUCK TYPE GHOST
      if (level < 3) {
        ghost_obj.name = 'KoTengu'
        ghost_obj.description = 'A young Tengu in training, can use numerous, but less effective powers.'
        ghost_obj.image = GHOST_AVATAR_MAP.LUK[0]
        ghost_obj.size = 1.2
      } else if (level < 5) {
        ghost_obj.name = 'OTengu'
        ghost_obj.description = `OTengu is called "The Great Demon King", is a great monster that shakes the nation.`
        ghost_obj.image = GHOST_AVATAR_MAP.LUK[1]
        ghost_obj.size = 0.9
      } else if (level >= 5) {
        ghost_obj.name = 'OTengu'
        ghost_obj.description = `OTengu is called "The Great Demon King", is a great monster that shakes the nation.`
        ghost_obj.image = GHOST_AVATAR_MAP.LUK[2]
        ghost_obj.size = 0.9
      }
      break;
    case 4: // SPEED TYPE GHOST
      if (level < 3) {
        ghost_obj.name = 'KuroNeko'
        ghost_obj.description = `Witch's messenger and a symbol of good luck and prosperity.`
        ghost_obj.image = GHOST_AVATAR_MAP.SPD[0]
        ghost_obj.size = 1.2
      } else if (level < 5) {
        ghost_obj.name = 'BakeNeko'
        ghost_obj.description = 'Long lived KuroNeko becomes BakeNeko It is said to haunt and curse people.'
        ghost_obj.image = GHOST_AVATAR_MAP.SPD[1]
        ghost_obj.size = 1
      } else if (level >= 5) {
        ghost_obj.name = 'NekoMata'
        ghost_obj.description = 'NekoMata is able to understand human speech. He loves to dance.'
        ghost_obj.image = GHOST_AVATAR_MAP.SPD[2]
        ghost_obj.size = 0.7
      }
      break;
    default:
      ghost_obj.image = GHOST_AVATAR_MAP.ATK[0]
      ghost_obj.size = 1.3
      break;
  }

  return ghost_obj
}

export default GET_GHOST_IMAGE
