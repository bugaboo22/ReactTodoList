import React from 'react';
import App from './App';
import { render, fireEvent, getByText } from'@testing-library/react';
import Todolist from './todolist';
import'@testing-library/jest-dom/extend-expect';


test('addtodo',()=>   {
  const { container, getByText, getByPlaceholderText} = render(<App/> );})

test('test remove', () => {
  const deleteAll = getByText('Clear');
  fireEvent.click(deleteAll);

  expect(container).not.toHaveTextContent('')
}); 

test('renders todolist', () => {
  const row = [{}]
  const todotable= render(<Todolist todos={row}/>);expect(todotable.container).not.toHaveTextContent('Go to coffee');
})