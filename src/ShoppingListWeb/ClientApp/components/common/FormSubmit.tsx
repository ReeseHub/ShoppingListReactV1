import * as React from "react";
import { FormGroup, HelpBlock, Button } from "react-bootstrap";
import * as FormSubmitState from '../../store/FormSubmit';

type FormSubmitProps =
    FormSubmitState.FormSubmitState;

// Form submit component
export default class FormSubmit extends React.Component<FormSubmitProps, {}> {
    // render
    render() {
        const { error, invalid, submitting, buttonSaveLoading, buttonSave } = this.props;
        return (
            <div>
                {error &&
                    <FormGroup validationState="error">
                        <HelpBlock>{error}</HelpBlock>
                    </FormGroup>}

                <FormGroup className="submit">
                    <Button type="submit" bsStyle="primary" disabled={invalid || submitting}>
                        {submitting ?
                            (buttonSaveLoading ? buttonSaveLoading : 'Saving...') :
                            (buttonSave ? buttonSave : 'Save')}
                    </Button>
                </FormGroup>
            </div>
        );
    }
}


