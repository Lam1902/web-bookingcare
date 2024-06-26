import actionTypes from './actionTypes';

export const appStartUpComplete = () => ({
    type: actionTypes.APP_START_UP_COMPLETE
});

export const setContentOfConfirmModal = (contentOfConfirmModal) => ({
    type: actionTypes.SET_CONTENT_OF_CONFIRM_MODAL,
    contentOfConfirmModal: contentOfConfirmModal
});


// hàm tạo ra các hàng động
export const changeLanguage = (languageInput) => ({
    type : actionTypes.CHANGE_LANGUAGE,
    language: languageInput
})