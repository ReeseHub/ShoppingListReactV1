import * as React from "react";
import { FormGroup, FormControl, HelpBlock, Row, Col } from "react-bootstrap";
import * as FormFieldState from '../../store/FormField';

type FormFieldProps =
    FormFieldState.FormFieldState;



// Form field component
export default class FormField extends React.Component<FormFieldProps, {}> {

    render() {
        const { className, doValidate, meta  } = this.props;

        if (doValidate) {
            return (
                <FormGroup className={className}
                    validationState={!meta.touched ? null : (meta.error ? 'error' : 'success')}>
                    {this.content()}
                    <FormControl.Feedback />
                    <HelpBlock>
                        {meta.touched && meta.error ? meta.error : null}
                    </HelpBlock>
                </FormGroup>
            );
        } else {
            return (
                <FormGroup className={className}>
                    {this.content()}
                </FormGroup>
            );
        }
    }


    content() {
        const { theme, label } = this.props;
        if ('other_theme' === theme) {
            // layout for some other theme
        } else {
            // default theme: 2col
            return (
                <Row>
                    <Col sm={3}>{label}</Col>
                    <Col sm={9}>{this.field()}</Col>
                </Row>
            );
        }
    }

    field() {
        const { input, componentClass, type, placeholder, children } = this.props;
        return (
            <FormControl {...input} componentClass={componentClass} type={type} placeholder={placeholder}>
                {children}
            </FormControl>
        );
    }
}