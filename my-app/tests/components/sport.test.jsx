import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import Sports from '../../src/components/sports';

describe('Sports Component', () => {
  it('renders the component', () => {
    render( <Sports /> );
    expect(screen.getByText('List of Sports')).toBeInTheDocument();
  })

  it("respond correctly on user's actions", async () => {
    render( <Sports /> ); 
    const button = screen.getAllByText('Edit', {selector: 'button'})[0];
    console.log(button);
    fireEvent.click(button);
    const element = await waitFor(() => screen.findByRole('section', {name: 'Editing_sport_information'}))
    expect(element).toBeInTheDocument();
  })
})