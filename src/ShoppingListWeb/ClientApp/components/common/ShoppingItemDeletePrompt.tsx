import * as React from "react";
import { Modal, Button } from "react-bootstrap";
import * as ShoppingItemPromptState from '../../store/ShoppingItemDeletePrompt';

type ShoppingItemDeletePromptProps =
    ShoppingItemPromptState.ShoppingItemDeletePromptState;

// Pet delete component
export default class ShoppingItemDeletePrompt extends React.Component<ShoppingItemDeletePromptProps, {}> {

    handleClose() {
       // this.setState({ show: false });
    }

    // render
    render() {
        const { show, item, hideDelete, itemDelete } = this.props;
        return (
            <Modal show={show} onHide={this.handleClose}>
                <Modal.Header>
                    <Modal.Title>
                        Are you sure you want to delete pet <strong>{item.itemName}</strong>?
          </Modal.Title>
                </Modal.Header>
                <Modal.Footer>
                    <Button onClick={hideDelete}>No</Button>
                    <Button bsStyle="primary" onClick={itemDelete}>Yes</Button>
                </Modal.Footer>
            </Modal>
        );
    }
}

