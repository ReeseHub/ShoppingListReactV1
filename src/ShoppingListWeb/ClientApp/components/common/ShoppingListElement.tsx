import * as React from "react";
import { Link } from "react-router-dom";
import { Button, Glyphicon } from "react-bootstrap";
import * as ShoppingListElementState from '../../store/ShoppingListElement';


type ShoppingListElementState = ShoppingListElementState.ShoppingListElementState;

// Pet List Element component
export default class ShoppingListElement extends React.Component<ShoppingListElementState, {}> {
    // render
    render() {
        const { item, showDelete } = this.props;
        return (
            <tr>
                <td>#{item.id}</td>
                <td>{item.itemName}</td>
                <td>{item.quantity}</td>
                <td>{item.category.name}</td>
                <td>
                    <Link to={'shoppinglist-edit/' + item.id}>
                        <Button bsSize="xsmall">
                            Edit <Glyphicon glyph="edit" />
                        </Button>
                    </Link>
                </td>
                <td>
                    <Button bsSize="xsmall" className="pet-delete" onClick={() => showDelete(item)}>
                        Delete <Glyphicon glyph="remove-circle" />
                    </Button>
                </td>
            </tr>
        );
    }
}






