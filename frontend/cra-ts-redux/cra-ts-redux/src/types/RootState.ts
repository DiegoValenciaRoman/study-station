// [IMPORT NEW CONTAINERSTATE ABOVE] < Needed for generating containers seamlessly

import { LoginState } from 'app/containers/Login/types';

/* 
  Because the redux-injectors injects your reducers asynchronously somewhere in your code
  You have to declare them here manually
*/
export interface RootState {
  login: LoginState;
  // [INSERT NEW REDUCER KEY ABOVE] < Needed for generating containers seamlessly
}
