/* --- STATE --- */
export interface LoginState {
  username: string;
  password: string;
  // declare what you want in your Homepage state
}

/* 
  If you want to use 'ContainerState' keyword everywhere in your feature folder, 
  instead of the 'HomePageState' keyword.
*/
export type ContainerState = LoginState;
