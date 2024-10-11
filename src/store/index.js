// Importing the necessary function from Redux Toolkit to configure the Redux store
import { configureStore } from "@reduxjs/toolkit";

// Importing the default configuration object, which contains the app's initial settings
import { DEFAULT_CONFIG } from "../constants";

// The reducer function manages state changes based on the dispatched action
// It accepts the current state and the action as parameters, and returns the updated state
const reducer = (state = DEFAULT_CONFIG, action) => {
  // Handling different action types using conditional blocks

  // If the action type is 'SET_TIME_COLOR', update the `timeColor` property in the state
  if (action.type === "SET_TIME_COLOR") {
    return {
      ...state, // Spread the current state
      timeColor: action.payload // Update only the `timeColor` property with the new value (from action payload)
    };

    // If the action type is 'SET_TIME_FONT', update the `timeFont` property
  } else if (action.type === "SET_TIME_FONT") {
    return {
      ...state,
      timeFont: action.payload // Update the `timeFont` property with the new font value
    };

    // If the action type is 'SET_TIME_FORMAT', update the `timeFormat` property
  } else if (action.type === "SET_TIME_FORMAT") {
    return {
      ...state,
      timeFormat: action.payload // Update the `timeFormat` property (e.g., 12-hour or 24-hour format)
    };

    // If the action type is 'SET_SHOW_SECONDS', update the `showSeconds` property
  } else if (action.type === "SET_SHOW_SECONDS") {
    return {
      ...state,
      showSeconds: action.payload // Toggle or set whether seconds should be displayed in the time
    };

    // If the action type is 'SET_SHOW_DATE', update the `showDate` property
  } else if (action.type === "SET_SHOW_DATE") {
    return {
      ...state,
      showDate: action.payload // Toggle or set whether the date should be displayed
    };

    // If the action type is 'SET_SHOW_BATTERY', update the `showBattery` property
  } else if (action.type === "SET_SHOW_BATTERY") {
    return {
      ...state,
      showBattery: action.payload // Toggle or set whether the battery level should be displayed
    };
  }

  // If none of the action types match, return the current state without making any changes
  return state;
};

// Configuring the Redux store
// `reducer`: the function that manages state updates
// `preloadedState`: initial state of the store, provided by DEFAULT_CONFIG
export default configureStore({
  reducer, // Attaching the reducer function to the store
  preloadedState: DEFAULT_CONFIG // Setting the initial state of the store to DEFAULT_CONFIG
});
