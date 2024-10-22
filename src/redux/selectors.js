// users
export const getUserSelector = (state) => state.userSlice.user;

// land
export const getListOfRequestViewLandSlice = (state) => state.landSlice.requets;

//plant
export const isLoadingPlant = (state) => state.plantSlice.loading;
export const plantListSelector = (state) => state.plantSlice.plant;
