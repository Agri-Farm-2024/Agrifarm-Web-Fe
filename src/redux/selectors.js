// users
export const getUserSelector = (state) => state.userSlice.user;
export const getListUserSelector = (state) => state.userSlice.userList;

// land
export const getListOfRequestViewLandSlice = (state) => state.landSlice.requets;
export const getLandTypeListSelector = (state) => state.landSlice.landType;
export const isLoadingLandSelector = (state) => state.landSlice.loading;

//plant
export const isLoadingPlant = (state) => state.plantSlice.loading;
export const plantListSelector = (state) => state.plantSlice.plant;
export const plantSeasonListSelector = (state) => state.plantSlice.plantSeason;

//service
export const isLoadingService = (state) => state.serviceSlice.loading;
export const servicePackageListSelector = (state) => state.serviceSlice.service;
export const serviceInUseListSelector = (state) => state.serviceSlice.serviceInUse;

//material
export const isLoadingMaterial = (state) => state.materialSlice.loading;
export const materialListSelector = (state) => state.materialSlice.material;

//process
export const isLoadingProcess = (state) => state.processSlice.loading;
export const standardProcessListSelector = (state) => state.processSlice.standardProcess;

//transaction
export const isLoadingTransaction = (state) => state.transactionSlice.loading;
export const transactionListSelector = (state) => state.transactionSlice.transactions;
