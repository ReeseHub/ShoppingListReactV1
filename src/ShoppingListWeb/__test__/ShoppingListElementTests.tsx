import * as React from "react";
import { HTMLAttributes, shallow, ShallowWrapper } from "enzyme";
import ShoppingListElement from "../ClientApp/components/common/ShoppingListElement";
import { ShoppingListElementState, ShoppingListItem } from "../ClientApp/store/ShoppingListElement";

import * as enzyme from 'enzyme';
import * as Adapter from 'enzyme-adapter-react-16';
import * as renderer from 'react-test-renderer';

enzyme.configure({ adapter: new Adapter() });

const testShoppingListElementProps: ShoppingListElementState = {

    item: {
        id: 1,
        item: "Test",
        quantity: 2,
        category: { id: 1, name: "TestCategory" }

    },
    showDelete: (item: ShoppingListItem): void => { }
};

let child: ShallowWrapper<undefined, undefined>;



beforeEach(() =>
    child = shallow(<ShoppingListElement {...testShoppingListElementProps} />));


it("should render without error", () => {

    expect(1).toBe(1);
});

it("should render without error", () => {

    expect(child.length).toBe(1);
});

 //checking that all is fine and component has been rendered
//it("should render without error", () => {
//    console.log(child);
//    expect(child.length).toBe(1);
//});

it('renders correctly', () => {
   
    expect(child).toMatchSnapshot();
});



test('adds 1 + 2 to equal 3', () => {

    let temp: number = 1 + 2;

    expect(temp).toBe(3);
});

    