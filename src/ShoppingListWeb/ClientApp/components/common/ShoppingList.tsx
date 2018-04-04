import * as React from "react";
import { connect } from "react-redux";
import { push } from "react-router-redux";
import { Table, Pagination } from "react-bootstrap";
import ShoppingListElement from "./ShoppingListElement";
import ShoppingListDeletePrompt from "./ShoppingItemDeletePrompt";
import ShoppingList from "../../store/ShoppingList";

// Pet list component
export class ShoppingList extends React.Component<ShoppingList, {}> {
    // constructor
    constructor(props) {
        super(props);

        // default ui local state
        this.state = {
            delete_show: false,
            delete_item: {},
        };

        // bind <this> to the event method
        this.changePage = this.changePage.bind(this);
        this.showDelete = this.showDelete.bind(this);
        this.hideDelete = this.hideDelete.bind(this);
        this.itemDelete = this.itemDelete.bind(this);
    }

    // render
    render() {
        // pagination
        const { shoppingList, page } = this.props;
        const per_page = 10;
        const pages = Math.ceil(shoppingList.length / per_page);
        const start_offset = (page - 1) * per_page;
        let start_count = 0;

        // show the list of pets
        return (
            <div>
                <Table bordered hover responsive striped>
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Name</th>
                            <th>Quantity</th>
                            <th>Category</th>
                            <th>Edit</th>
                            <th>Delete</th>
                        </tr>
                    </thead>
                    <tbody>
                        {shoppingList.map((listItem, index) => {
                            if (index >= start_offset && start_count < per_page) {
                                start_count++;
                                return (
                                    <ShoppingListElement key={index} item={listItem} showDelete={this.showDelete} />
                                );
                            }
                        })}
                    </tbody>
                </Table>

                <Pagination className="pets-pagination pull-right" bsSize="medium" maxButtons={10} first last next
                    prev boundaryLinks items={pages} activePage={page} onSelect={this.changePage} />

                <ShoppingListDeletePrompt show={this.state.delete_show} item={this.state.delete_item}
                    hideDelete={this.hideDelete} itemDelete={this.itemDelete} />
            </div>
        );
    }

    // change the pet lists' current page
    changePage(page : number) {
        this.props.dispatch(push('/?page=' + page));
    }

    // show the delete pet prompt
    showDelete(item: ShoppingItem):void {
        // change the local ui state
        this.setState({
            delete_show: true,
            delete_item: item,
        });
    }

    // hide the delete item prompt
    hideDelete():void {
        // change the local ui state
        this.setState({
            delete_show: false,
            delete_item: {},
        });
    }

    // delete the item
    itemDelete():void {
        // delete the pet
        this.props.dispatch({
            type: 'ITEMS_DELETE',
            pet_id: this.state.delete_item.id,
        });

        // hide the prompt
        this.hideDelete();
    }
}

// export the connected class
function mapStateToProps(state): { shoppingItems, number } {
    return {
        shoppingItems: state.shoppingList,

        // https://github.com/reactjs/react-router-redux#how-do-i-access-router-state-in-a-container-component
        // react-router-redux wants you to get the url data by passing the props through a million components instead of
        // reading it directly from the state, which is basically why you store the url data in the state (to have access to it)
        page: Number(state.routing.locationBeforeTransitions.query.page) || 0,
    };
}

//export default connect(
//    (state: ApplicationState) => state., // Selects which state properties are merged into the component's props
//    WeatherForecastsState.actionCreators                 // Selects which action creators are merged into the component's props
//)(ShoppingList) as typeof ShoppingList;

export default connect(mapStateToProps)(ShoppingList) as typeof ShoppingList;
