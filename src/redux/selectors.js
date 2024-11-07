// users
export const getUserSelector = (state) => state.userSlice.user;

// land
export const getListOfRequestViewLandSlice = (state) => state.landSlice.requets;

//plant
export const isLoadingPlant = (state) => state.plantSlice.loading;
export const plantListSelector = (state) => state.plantSlice.plant;
export const plantSeasonListSelector = (state) => state.plantSlice.plantSeason;

//service
export const isLoadingService = (state) => state.serviceSlice.loading;
export const servicePackageListSelector = (state) => state.serviceSlice.service;

//material
export const isLoadingMaterial = (state) => state.materialSlice.loading;
export const materialListSelector = (state) => state.materialSlice.material;

//process
export const isLoadingProcess = (state) => state.processSlice.loading;
export const standardProcessListSelector = (state) => state.processSlice.standardProcess;
