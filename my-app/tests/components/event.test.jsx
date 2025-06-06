import { fireEvent, render, screen, waitFor, within } from '@testing-library/react';
import axios from 'axios';
import Event from '../../src/components/event';
import Events from '../../src/components/events';

vi.mock('axios');
const eventsApiUrl = 'http://localhost:3000/events'
const matchesApiUrl = "http://localhost:3000/matches"

describe('Events Components', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe('when the API calls are successful', () => {
    const mockEventList = [
      {
        id: 1,
        name: 'TestEvent1',
        description: 'TestDescription1'
      },
      {
        id: 2,
        name: 'TestEvent2',
        description: "TestDescription2"
      },
    ];

    beforeEach(() => {
      axios.get.mockResolvedValue({ data: mockEventList });
    });

    it('renders the components correctly', () => {
      render( <Events /> );
      expect(axios.get).toHaveBeenCalledWith(eventsApiUrl);
  
      const addEventElm = screen.getByTitle('Create new event');
      expect(addEventElm).toBeInTheDocument();
      expect(within(addEventElm).getByText('Create new event', {selector: 'h2'})).toBeInTheDocument()
      expect(within(addEventElm).getByPlaceholderText('name', {selector: 'input'})).toBeInTheDocument();
      expect(within(addEventElm).getByPlaceholderText('description', {selector: 'input'})).toBeInTheDocument();
      expect(within(addEventElm).getByText('Add', {selector: 'button'})).toBeInTheDocument();
  
      const eventListElm = screen.getByTitle('List of Events');
      expect(eventListElm).toBeInTheDocument();
      expect(within(eventListElm).getByText('List of Events', {selector: 'h2'})).toBeInTheDocument();
      waitFor(()=> {
        expect(within(eventListElm).getByText('TestEvent1', {selector: 'h3'})).toBeInTheDocument();
        expect(within(eventListElm).getByText('TestDescription1', {selector: 'p'})).toBeInTheDocument();
        expect(within(eventListElm).getByText('TestEvent2', {selector: 'h3'})).toBeInTheDocument();
        expect(within(eventListElm).getByText('TestDescription2', {selector: 'p'})).toBeInTheDocument();
      })
    })

    it("user can create event", async () => {
      const payload = {
        name: 'test', 
        description: 'blablabla',
        start_date: '',
        end_date: '',
        attendees_nb: '',
        venue_fee: '',
        required_score: '',
        rules: '',
        schedule: '',
        status_id: '',
        location_id: '',
        sport_id: '',
        type_event_id: ''
      }

      render(<Events />);

      const addEventElm = screen.getByTitle('Create new event');
      const nameInput = within(addEventElm).getByPlaceholderText('name', {selector: 'input'});
      const descriptionInput = within(addEventElm).getByPlaceholderText('description', {selector: 'input'});

      fireEvent.change(nameInput, {target: {value: payload.name}});
      fireEvent.change(descriptionInput, {target: {value: payload.description}});
      waitFor(() => {
        expect(hasInputValue(nameInput, payload.name)).toBe(true);
        expect(hasInputValue(descriptionInput, payload.description)).toBe(true);
      })

      fireEvent.click(within(addEventElm).getByText('Add', {selector: 'button'}));
      expect(axios.post).toHaveBeenCalledWith(eventsApiUrl, {event: payload})
    })
  })
})

describe('Event Components', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe('when the API calls are successful', () => {
    const mockEvent = {
      id: 1,
      name: 'TestEvent1',
      description: 'TestDescription1'
    }

    const mockAttendeeList = [
      {
        id: 1,
        name: 'TestAttendee1',
        other: 'Some infos here'
      },
      {
        id: 2,
        name: 'TestAttendee2',
        other: "Some others info here"
      },
    ];

    
    const mockBracket = {
      match: {
        id: 872915261,
        event_id: 529523276,
        user1_id: null,
        user2_id: null,
        winner_id: null,
        previous_match_1: 872915259,
        previous_match_2: 872915260,
        created_at: "2025-03-28T15:49:34.184Z",
        updated_at: "2025-03-28T15:49:34.185Z"
      },
      user1: null,
      user2: null,
      submatch1: {
        match: {
          id: 872915259,
          event_id: 529523276,
          user1_id: 656437878,
          user2_id: 220998596,
          winner_id: null,
          previous_match_1: null,
          previous_match_2: null,
          created_at: "2025-03-28T15:49:34.182Z",
          updated_at: "2025-03-28T15:49:34.182Z"
        },
        user1: {
          id:656437878,
          name: "ann",
          other: null,
          position: null,
          first_team: null,
          created_at: "2025-03-28T15:49:34.053Z",
          updated_at: "2025-03-28T15:49:34.053Z",
          club_id: null,
          team_id: null,
          location_id: null,
          email: "ann@email.com",
          jti: null
        },
        user2: {
          id: 220998596,
          name: "iris",
          other: null,
          position: null,
          first_team: null,
          created_at: "2025-03-28T15:49:34.053Z",
          updated_at: "2025-03-28T15:49:34.053Z",
          club_id: null,
          team_id: null,
          location_id: null,
          email: "iris@email.com",
          jti: null
        }
      },
      submatch2: {
        match: {
          id: 872915260,
          event_id: 529523276,
          user1_id: 902541635,
          user2_id: 758109964,
          winner_id: null,
          previous_match_1: null,
          previous_match_2: null,
          created_at: "2025-03-28T15:49:34.183Z",
          updated_at: "2025-03-28T15:49:34.183Z"
        },
        user1: {
          id: 902541635,
          name: "bob",
          other: null,
          position: null,
          first_team: null,
          created_at: "2025-03-28T15:49:34.053Z",
          updated_at: "2025-03-28T15:49:34.211Z",
          club_id: null,
          team_id: null,
          location_id: null,
          email: "bob@email.com",
          jti: null
        },
        user2: {
          id: 758109964,
          name: "jean",
          other: null,
          position: null,
          first_team: null,
          created_at: "2025-03-28T15:49:34.053Z",
          updated_at: "2025-03-28T15:49:34.053Z",
          club_id: null,
          team_id: null,
          location_id: null,
          email: "jean@email.com",
          jti: null
        }
      }
    };

    beforeEach(() => {
      axios.get.mockImplementation((url) => {
        switch (url) {
          case eventsApiUrl + '/' + mockEvent.id:
            return Promise.resolve({data: mockEvent})
          case eventsApiUrl + '/' + mockEvent.id + '/attendees':
            return Promise.resolve({data: mockAttendeeList})
          case eventsApiUrl + '/' + mockEvent.id + '/display_tree_bracket':
            return Promise.resolve({data: mockBracket})
          case eventsApiUrl + '/' + mockEvent.id + '/generate_tree_bracket':
              return Promise.resolve({data: mockBracket})
          default:
            return Promise.reject(new Error('not found'))
        }
      })
    });

    it("render component correctly", () => {
      render( <Event /> );
      
      const editingInfosElm = screen.getByTitle('Event details');
      expect(editingInfosElm).toBeInTheDocument();
      expect(within(editingInfosElm).getAllByText("Subscribe", {selector: 'button'})[0]).toBeInTheDocument();
      expect(within(editingInfosElm).getAllByText("Edit", {selector: 'button'})[0]).toBeInTheDocument();
      expect(within(editingInfosElm).getAllByText("Delete", {selector: 'button'})[0]).toBeInTheDocument();

      waitFor(()=>{
        expect(within(editingInfosElm).getByText(mockEvent.name, {selector: 'h3'})).toBeInTheDocument();
        expect(within(editingInfosElm).getByText(mockEvent.description, {selector: 'p'})).toBeInTheDocument();
      })
      
      const attendeesListElm = screen.getByTitle("Attendees' List");
      expect(attendeesListElm).toBeInTheDocument();
      expect(within(attendeesListElm).getByText("Attendees' List", {selector: 'h3'})).toBeInTheDocument();
      waitFor(()=> {
        expect(within(attendeesListElm).getByText(mockAttendeeList[0].name, {selector: 'li'})).toBeInTheDocument();
        expect(within(attendeesListElm).getByText(mockAttendeeList[0].other, {selector: 'text'})).toBeInTheDocument();
      })

      const bracketElm = screen.getByTitle("Bracket");
      expect(bracketElm).toBeInTheDocument();
      expect(within(bracketElm).getByText("Bracket", {selector: 'h3'})).toBeInTheDocument();
    })

    it("User can modify event informations", async () => {
      const payload = {
        id: 1,
        description: 'blablabla',
        name: "TestEvent1", // TODO make patch request send only modifed value
        start_date: '',
        end_date: '',
        attendees_nb: '',
        venue_fee: '',
        required_score: '',
        rules: '',
        schedule: '',
        status_id: undefined,
        location_id: '',
        sport_id: '',
        type_event_id: undefined
      }

      render( <Event /> ); 

      const editButton = screen.getAllByText('Edit', {selector: 'button'})[0];
      fireEvent.click(editButton);
      const editEventElm = await waitFor(() => screen.getByTitle('Editing information'))
      expect(editEventElm).toBeInTheDocument();
      expect(within(editEventElm).getByText('Editing information', {selector: 'h3'})).toBeInTheDocument();

      const nameInput = within(editEventElm).getByPlaceholderText('name', {selector: 'input'});
      fireEvent.change(nameInput, {target: {value: payload.name}});
      waitFor(() => {
        expect(hasInputValue(nameInput, payload.name)).toBe(true);
      })
      const descriptionInput = within(editEventElm).getByPlaceholderText('description', {selector: 'input'});
      fireEvent.change(descriptionInput, {target: {value: payload.description}});
      waitFor(() => {
        expect(hasInputValue(descriptionInput, payload.description)).toBe(true);
      })

      const saveButton = screen.getByText('Save', {selector: 'button'});
      fireEvent.click(saveButton);
      expect(axios.patch).toHaveBeenCalledWith(eventsApiUrl + '/1', {event: payload})
    })

    it("User can delete event", async () => {
      render( <Event /> ); 

      const deleteButton = screen.getAllByText('Delete', {selector: 'button'})[0];
      fireEvent.click(deleteButton);
      expect(axios.delete).toHaveBeenCalledWith(eventsApiUrl + '/1')
    })

    it("User can subscribe to an event", () => {
      render( <Event /> ); 

      fireEvent.click(screen.getAllByText('Subscribe', {selector: 'button'})[0])
      expect(axios.get).toHaveBeenCalledWith(eventsApiUrl + '/1/subscribe')
    })

    it("User can see an event attendees list", () => {
      render( <Event /> ); 
      const attendeeListElm = screen.getByTitle("Attendees' List");
      expect(attendeeListElm).toBeInTheDocument();
      expect(within(attendeeListElm).getByText("Attendees' List", {selector: 'h3'})).toBeInTheDocument();
      waitFor(()=> {
        expect(within(attendeeListElm).getByText('TestAttendee1', {selector: 'h3'})).toBeInTheDocument();
        expect(within(attendeeListElm).getByText('Some infos here', {selector: 'p'})).toBeInTheDocument();
        expect(within(attendeeListElm).getByText('TestAttendee2', {selector: 'h3'})).toBeInTheDocument();
        expect(within(attendeeListElm).getByText('Some others info here', {selector: 'p'})).toBeInTheDocument();
      })
    })

    it('User can see and generate an event bracket', async () => {
      render( <Event /> ); 
      fireEvent.click(screen.getByText('generate bracket', {selector: 'button'}))
      expect(axios.get).toHaveBeenCalledWith(eventsApiUrl + '/1/generate_tree_bracket')

      const BracketElm = screen.getByTitle("Bracket");
      expect(BracketElm).toBeInTheDocument();
      expect(within(BracketElm).getByText("Bracket", {selector: 'h3'})).toBeInTheDocument();
      await waitFor(()=> {
        expect(within(BracketElm).getByText('user1_name: bob', {selector: 'p'})).toBeInTheDocument();
        expect(within(BracketElm).getByText('user1_email: bob@email.com', {selector: 'p'})).toBeInTheDocument();
        expect(within(BracketElm).getByText('user1_name: ann', {selector: 'p'})).toBeInTheDocument();
        expect(within(BracketElm).getByText('user1_email: ann@email.com', {selector: 'p'})).toBeInTheDocument();
      })

      // fireEvent.click(screen.getAllByText('generate bracket', {selector: 'button'})[0])
      // expect(axios.get).toHaveBeenCalledWith(eventsApiUrl + '/1/generate_tree_bracket')
    })

    it('User can set a winner', async () => {
      render(<Event />);

      const BracketElm = screen.getByTitle("Bracket");
      expect(BracketElm).toBeInTheDocument();
      expect(within(BracketElm).getByText("Bracket", {selector: 'h3'})).toBeInTheDocument();
      await waitFor(()=> {
        expect(within(BracketElm).getByText('user1_name: bob', {selector: 'p'})).toBeInTheDocument();
        expect(within(BracketElm).getByText('user1_email: bob@email.com', {selector: 'p'})).toBeInTheDocument();
        expect(within(BracketElm).getByText('user1_name: ann', {selector: 'p'})).toBeInTheDocument();
        expect(within(BracketElm).getByText('user1_email: ann@email.com', {selector: 'p'})).toBeInTheDocument();
      })

      fireEvent.click(screen.getAllByText('Set as winner', {selector: 'button'})[0])
      expect(axios.patch).toHaveBeenCalledWith(matchesApiUrl + '/872915259/determine_winner', {
        match: {
          winner: 656437878
        }
      })
    })
  })
})