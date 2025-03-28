import { fireEvent, render, screen, waitFor, within } from '@testing-library/react';
import axios from 'axios';
import Sports from '../../src/components/sports';

vi.mock('axios');
const sportsApiUrl = 'http://localhost:3000/sports'

describe('Sports Component', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe('when the API calls are successful', () => {
    const mockSportList = [
      {
        id: 1,
        name: 'TestSport1',
        description: 'TestDescription1'
      },
      {
        id: 2,
        name: 'TestSport2',
        description: "TestDescription2"
      },
    ];

    beforeEach(() => {
      axios.get.mockResolvedValue({ data: mockSportList });
    });

    it('renders the components correctly', () => {
      render( <Sports /> );
      expect(axios.get).toHaveBeenCalledWith(sportsApiUrl);
  
      const addSportElm = screen.getByTitle('Create new sport');
      expect(addSportElm).toBeInTheDocument();
      expect(within(addSportElm).getByText('Create new sport', {selector: 'h2'})).toBeInTheDocument()
      expect(within(addSportElm).getByPlaceholderText('name', {selector: 'input'})).toBeInTheDocument();
      expect(within(addSportElm).getByPlaceholderText('description', {selector: 'input'})).toBeInTheDocument();
      expect(within(addSportElm).getByText('Add', {selector: 'button'})).toBeInTheDocument();
  
      const sportListElm = screen.getByTitle('List of Sports');
      expect(sportListElm).toBeInTheDocument();
      expect(within(sportListElm).getByText('List of Sports', {selector: 'h2'})).toBeInTheDocument();
      waitFor(()=> {
        expect(within(sportListElm).getByText('TestSport1', {selector: 'h3'})).toBeInTheDocument();
        expect(within(sportListElm).getByText('TestDescription1', {selector: 'p'})).toBeInTheDocument();
        expect(within(sportListElm).getByText('TestSport2', {selector: 'h3'})).toBeInTheDocument();
        expect(within(sportListElm).getByText('TestDescription2', {selector: 'p'})).toBeInTheDocument();
      })
    })

    it("user can create sport", async () => {
      const payload = {
        name: 'test', description: 'blablabla'
      }
      render(<Sports />);
      const addSportElm = screen.getByTitle('Create new sport');
      const nameInput = within(addSportElm).getByPlaceholderText('name', {selector: 'input'});
      const descriptionInput = within(addSportElm).getByPlaceholderText('description', {selector: 'input'});

      fireEvent.change(nameInput, {target: {value: payload.name}});
      fireEvent.change(descriptionInput, {target: {value: payload.description}});
      waitFor(() => {
        expect(hasInputValue(nameInput, payload.name)).toBe(true);
        expect(hasInputValue(descriptionInput, payload.description)).toBe(true);
      })

      fireEvent.click(within(addSportElm).getByText('Add', {selector: 'button'}));
      expect(axios.post).toHaveBeenCalledWith(sportsApiUrl, {sport: payload})
    })

    it("User can modify sport informations", async () => {
      const payload = {
        description: 'blablabla',
        name: "TestSport1" // TODO make patch request send only modifed value
      }
      render( <Sports /> ); 

      const editButton = screen.getAllByText('Edit', {selector: 'button'})[0];
      fireEvent.click(editButton);
      const editSportElm = await waitFor(() => screen.getByTitle('Editing information'))
      expect(editSportElm).toBeInTheDocument();
      expect(within(editSportElm).getByText('Editing information', { selector: 'h3'})).toBeInTheDocument();

      const descriptionInput = within(editSportElm).getByPlaceholderText('description', {selector: 'input'});
      fireEvent.change(descriptionInput, {target: {value: payload.description}});
      waitFor(() => {
        expect(hasInputValue(descriptionInput, payload.description)).toBe(true);
      })

      const saveButton = screen.getByText('Save', {selector: 'button'});
      fireEvent.click(saveButton);
      expect(axios.patch).toHaveBeenCalledWith(sportsApiUrl + '/1', {sport: payload})
    })

    it("User can delete sport", async () => {
      render( <Sports /> ); 

      const deleteButton = screen.getAllByText('Delete', {selector: 'button'})[0];
      fireEvent.click(deleteButton);
      expect(axios.delete).toHaveBeenCalledWith(sportsApiUrl + '/1')
    })
  })
})