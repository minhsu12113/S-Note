import { Header } from '../../views/layouts/todo/Header';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event'
import { vi } from 'vitest';

describe('Todo Header component', () => {  

	it('The component should be render', () => {
		render(
			<Header
				addTodoCallBack={(e) => {
					console.log(e);
				}}
			/>
		);
		const pTag = screen.getByText('S-Note');
		expect(pTag).toBeInTheDocument();
    screen.debug()
	});

	it('It should be render a textbox to add todo', () => {
		render(
			<Header
				addTodoCallBack={(e) => {
					console.log(e);
				}}
			/>
		);
		const inputTag = screen.getByPlaceholderText('Enter somethings...');
		expect(inputTag).toBeInTheDocument();
    screen.debug()
	});

  it('The input can enter text', async () => {
		render(
			<Header
				addTodoCallBack={(e) => {
					console.log(e);
				}}
			/>
		);
		const inputTag = screen.getByRole('textbox');
		expect(inputTag).toBeInTheDocument();

    const user = userEvent.setup()
    const textEnter = 'Testing input can enter test'
    await user.type(inputTag, textEnter)
 
    expect(inputTag).toHaveDisplayValue(textEnter)
    screen.debug()
	});

  it('It should be render a button to add todo', async () => {
		render(
			<Header
				addTodoCallBack={(e) => {
					console.log(e);
				}}
			/>
		);
		const btnTag = screen.getByRole('button');
		expect(btnTag).toBeInTheDocument();  
    screen.debug()
	});

  it('The button add todo can click', async () => {
    const mockOnClick = vi.fn();
		render(
			<Header
				addTodoCallBack={(e) => {
					mockOnClick(e)
				}}
			/>
		);
   
		const btnTag = screen.getByRole('button');     
    const user = userEvent.setup()
    await user.click(btnTag)
		expect(mockOnClick).toHaveBeenCalledTimes(1);
    screen.debug()
	});

  it('The input should be cleared after adding todo', async () => {
    const mockOnClick = vi.fn();
    render(
      <Header
        addTodoCallBack={mockOnClick}
      />
    );

    const inputTag = screen.getByRole('textbox');
    const btnTag = screen.getByRole('button');     
    const user = userEvent.setup()

    await user.type(inputTag, 'New Todo');
    await user.click(btnTag);
    expect(mockOnClick).toHaveBeenCalledWith('New Todo');
    expect(inputTag).toHaveDisplayValue('');
    screen.debug();
  }); 
});
