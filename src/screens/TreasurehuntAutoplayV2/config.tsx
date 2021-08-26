import { translate } from "helpers/translate";

const STEPS = [
  {
    step: 0,
    title: "No title",
    message: "No Message"
  },
  {
    step: 1,
    title: translate("th.autoplay.step1.text"),
    message: "Select destination to explore in Auto Play."
  },
  {
    step: 2,
    title: translate("th.autoplay.step2.text"),
    message: "Please select the strategy when to renew the current map to go to the new one. You can also choose \"or\" option to set the condition."
  },
  {
    step: 3,
    title: translate("th.autoplay.step3.text"),
    message: "Set an order to explore islands or choose explorer random option."
  },
  {
    step: 4,
    title: translate("th.autoplay.step4.text"),
    message: "Please select a condition and set value."
  },
  {
    step: 5,
    title: translate("th.autoplay.step5.text"),
    message: translate("th.autoplay.step5.message")
  },
  {
    step: 6,
    title: translate("th.autoplay.step6.text"),
    message: "Please confirm your selected options"
  }
]

const OPTIONS_STEP_2 = [
  {
    id: 0,
    title: 'A. Fixed islands',
    message: 'Keep exploring islands until the fixed number each time and renew the map.'
  },
  {
    id: 1,
    title: 'B. Until receives the prize',
    message: 'Keep exploring until the fixed Prize (x1, x2, x3...x16 over) discovered and renew the map.'
  },
  {
    id: 2,
    title: 'A or B',
    message: 'Renew the map either condition A or B becomes fulfilled.'
  }
]

const OPTIONS_STEP_4 = [
  {
    id: 0,
    name: 'gamesPlayed',
    title: translate("th.autoplay.stop.param1"),
    message: translate("th.autoplay.stop.param1.message")
  },
  {
    id: 1,
    name: 'minBalance',
    title: translate("th.autoplay.stop.param2"),
    message: translate("th.autoplay.stop.param2.message")
  },
  {
    id: 2, 
    name: 'maxBalance',
    title: translate("th.autoplay.stop.param3"),
    message: translate("th.autoplay.stop.param3.message")
  }
]

const OPTIONS_CONFIRMATION = [
  {
    id: 1,
    title: 'Select destination:'
  },
  {
    id: 2,
    title: 'Select number of rivals:'
  },
  {
    id: 3, 
    title: 'Number of panels to open:'
  },
  {
    id: 4, 
    title: 'Select panels to open:'
  },
    {
    id: 5, 
    title: 'Stop parameters:'
  }
]

export {
  STEPS,
  OPTIONS_STEP_2,
  OPTIONS_STEP_4,
  OPTIONS_CONFIRMATION
}