export interface FormSubmitState {
    error: string,  // redux-form general `_error` message
    invalid: boolean,  // redux-form invalid prop
    submitting: boolean,   // redux-form invalid submitting
    buttonSaveLoading: string, // save button loading text, default is "Saving..."
    buttonSave: string
}