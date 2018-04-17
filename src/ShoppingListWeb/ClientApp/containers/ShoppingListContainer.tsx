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

    private routerPage: number = 0;

    componentWillMount() {
        console.log("here");
        // This method runs when the component is first added to the page
        let page = parseInt(this.props.match.params.page) || 1;
        let size = parseInt(this.props.match.params.size) || 10;

        this.routerPage = page;

        this.props.fetchShoppingList(page, size);
        console.log("page count in component will mount : " +  this.props.pageCount);
    }


    componentWillReceiveProps(nextProps: ShoppingListContainterProps) {
        // This method runs when incoming props (e.g., route params) change
        let page = parseInt(nextProps.match.params.page) || 1;
        let size = parseInt(nextProps.match.params.size) || 10;

        // Only fetch if it has changed
        //if (this.props.location.pathname === nextProps.location.pathname) {
        //    return;
        //}

        this.routerPage = page;

        //if (page !== this.props.page)
        //{
        //    nextProps.fetchShoppingList(page, size);

        //    var currentdate = new Date();
        //    var datetime = "Last Sync: " + currentdate.getDate() + "/"
        //        + (currentdate.getMonth() + 1) + "/"
        //        + currentdate.getFullYear() + " @ "
        //        + currentdate.getHours() + ":"
        //        + currentdate.getMinutes() + ":"
        //        + currentdate.getSeconds();

        //    console.log("Receive Props called " + datetime);
        //}
    }

    public render() {
        return (
            <div className="page-home">
              
                <ShoppingList
                    shoppingItems={this.props.shoppingItems}
                    page={this.routerPage}
                    isLoading={this.props.isLoading}
                    pageCount={this.props.pageCount}
                    fetchShoppingList={this.props.fetchShoppingList}
                    changePage={this.props.changePage} />
            </div>
        );

    }
}

//<ShoppingList shoppingItems={this.props.shoppingItems} page={this.props.page} fetchShoppingList={this.props.fetchShoppingList} />

//export default connect<ShoppingListContainterProps>((state: ApplicationState) => state.shoppingList, ShoppingListActions.actionCreators)(ShoppingListContainter) as any;

export default connect(
    (state: ApplicationState) => state.shoppingList, // Selects which state properties are merged into the component's props
    ShoppingListActions.actionCreators                // Selects which action creators are merged into the component's props
)(ShoppingListContainter) as typeof ShoppingListContainter;
