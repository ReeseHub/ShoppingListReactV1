import * as React from 'react';
import { Link, RouteComponentProps } from 'react-router-dom';
import { connect } from 'react-redux';
import { ApplicationState } from '../store';
import { ShoppingListState } from '../store/ShoppingList';
import * as ShoppingListActions from "../actions/ShoppingListActions"
import { ShoppingList } from '../components/common/ShoppingList';


type ShoppingListContainterProps = ShoppingListState
    & typeof ShoppingListActions.actionCreators      // ... plus action creators we've requested
    & RouteComponentProps<{ page: string, size: string }>; // ... plus incoming routing parameters

// Container component
class ShoppingListContainter extends React.Component<ShoppingListContainterProps, {}> {
    componentWillMount() {
        console.log("here");
        // This method runs when the component is first added to the page
        let page = parseInt(this.props.match.params.page) || 1;
        let size = parseInt(this.props.match.params.size) || 10;

        this.props.fetchShoppingList(page, size);
        console.log("here2");
    }

    componentWillReceiveProps(nextProps: ShoppingListContainterProps) {
        // This method runs when incoming props (e.g., route params) change
        let page = parseInt(this.props.match.params.page) || 1;
        let size = parseInt(this.props.match.params.size) || 10;

        this.props.fetchShoppingList(page, size);

        
     
    }

    public render() {
        return (
            <div className="page-home">
              
                <ShoppingList shoppingItems={this.props.shoppingItems}
                    page={this.props.page}
                    isLoading={this.props.isLoading}
                    fetchShoppingList={this.props.fetchShoppingList} />
            </div>
        );

    }
}

//<ShoppingList shoppingItems={this.props.shoppingItems} page={this.props.page} fetchShoppingList={this.props.fetchShoppingList} />

export default connect(
    (state: ApplicationState) => state.shoppingList, // Selects which state properties are merged into the component's props
    ShoppingListActions.actionCreators                // Selects which action creators are merged into the component's props
)(ShoppingListContainter) as typeof ShoppingListContainter;
