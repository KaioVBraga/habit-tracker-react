import { combineReducers } from 'redux';
import { reducer as userCourses } from './ducks/userCourses';
import { reducer as goals } from './ducks/goals';
import { reducer as activeHabit } from './ducks/activeHabit';
import { reducer as goalModal } from './ducks/goalModal';

const rootReducer = combineReducers({
  userCourses,
  goals,
  activeHabit,
  goalModal
});

export default rootReducer;
