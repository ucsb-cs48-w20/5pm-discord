import React from 'react';
import {shallow} from 'enzyme';
import {Button} from './button';

describe('Button', () => {
    it('should be defined', () => {
        expect(Button).toBeDefined();
    });
    it('should render correctly', () => {
        const handleClick = jest.fn();

        const tree = shallow(
            <Button children={"Test1"} onClick={handleClick}/>
        );
        expect(tree).toMatchSnapshot();
    });
    it('should call mock function when button is clicked', () => {
        const mockFn = jest.fn();
        const tree = shallow(
            <Button children={"Test2"} onClick={mockFn}/>
        );
        tree.simulate('click');
        expect(mockFn).toHaveBeenCalled();
    });
});
