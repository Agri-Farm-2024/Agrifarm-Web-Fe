// users
export const getUserSelector = (state) => state.userSlice.user;

//plant
export const isLoadingPlant = (state) => state.plantSlice.loading;
export const plantListSelector = (state) => state.plantSlice.plant;
