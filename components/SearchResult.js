import moment from 'moment';
import styled from 'styled-components';

const ListItem = styled.div`
  margin-bottom: 2rem;
  border-radius: .5rem;
  box-shadow: 0 15px 30px 0 rgba(0, 0, 0, .11), 0 5px 15px 0 rgba(0, 0, 0, .08);
`;

const ListContent = styled.div`
  display: flex;
  flex-direction: row;
  flex-grow: 0;
  flex-shrink: 0;
  padding: 1rem;
  justify-content: space-between;

  table {
    width: 40rem;
  }
`;

const ListItemTitle = styled.div`
  font-size: 24px;
`;

const ListItem__DateContainer = styled.div`
  min-width: 34px;
  margin-top: 5px;
  margin-right: 20px;
  font-size: 20px;
  display: flex;
  flex-direction: column;
  line-height: 1em;

  div {
    display: flex;
    flex-direction: column;

    span {
      text-transform: uppercase;
      font-size: 12px;
    }
  }
`;

const ListItem__Departure = styled.div`
  margin-bottom: 1rem;
`;

const ListItem__Arrival = styled.div`
  color: rgb(155, 166, 178);
`;

const Footer = styled.div`
  display: flex;
  padding: 0 0 0 1rem;
  border-bottom-right-radius: .5rem;
  border-bottom-left-radius: .5rem;
  background-color: rgba(0, 0, 0, .11);
`;

const FlightDuration = ({ flight }) => {
  const duration = moment.duration(flight.node.duration, 'minutes');
  return <span>{Math.floor(duration.asHours())}h {duration.minutes()}m</span>;
};

const Leg = styled(({ airline, departure, arrival, className }) => {
  return (
    <tr className={className}>
      <td>
        <img src={airline.logoUrl} title={airline.name} />
      </td>
      <td>
        {departure.airport.name}
      </td>
      <td>
        {arrival.airport.name}
      </td>
    </tr>
  );
})`
  img {
    display: inline-block;
    margin-top: .5em;
    height: 2em;
  }

  td {
    padding-right: 1em;
  }

`;

export default ({ flight }) =>
  <ListItem>
    <ListContent>
      <ListItem__DateContainer>
        <ListItem__Departure>
          <span>departure</span>
          {moment(flight.node.departure.time).format('H:mm')}
          <span>{moment(flight.node.departure.time).format('D. M. YYYY')}</span>
        </ListItem__Departure>
        <ListItem__Arrival>
          <span>arrival</span>
          {moment(flight.node.arrival.time).format('H:mm')}
          <span>{moment(flight.node.arrival.time).format('D. M. YYYY')}</span>
        </ListItem__Arrival>
      </ListItem__DateContainer>
      <table>
        <tbody>
          {flight.node.legs.map(leg => <Leg key={leg.flightNumber} {...leg} />)}
        </tbody>
      </table>
      <ListItemTitle>
        {flight.node.price.amount} {flight.node.price.currency}
      </ListItemTitle>
    </ListContent>
    <Footer>
      <FlightDuration flight={flight} />
    </Footer>
  </ListItem>;
