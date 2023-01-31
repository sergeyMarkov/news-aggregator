import { Container } from "react-bootstrap";
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';

interface SearchProps {
  onTextBlur: any;
  searchDate: string;
  onDateBlur: any;
  onCategorySelect: any;
}
export const Search = (props: SearchProps) => {

  return (
	<Container>
    <Row>
      <Col>
        Search
        <input 
          className="search" 
          type="text" 
          onBlur={props.onTextBlur} 
          placeholder="Search by the title ..."/>
      </Col>
      <Col>
        Date
        <Form.Control
            type="date"
            name="datepic"
            placeholder="Date"
            value={props.searchDate}
            onChange={props.onDateBlur}
          />
      </Col>
      <Col>
        News source
        <Form.Select aria-label="Default select example">
          <option>Select news source</option>
          <optgroup label="NewsAPI">
            <option value="NewsAPI.source.abc-news-au">ABC News (AU)</option>
            <option value="NewsAPI.source.australian-financial-review">Australian Financial Review</option>
            <option value="NewsAPI.source.google-news-au">Google News (Australia)</option>
            <option value="NewsAPI.source.news-com-au">News.com.au</option>
          </optgroup>
          <optgroup label="NYTimes">
            <option value="NYTimes.source.The New York Times">The New York Times</option>
            <option value="NYTimes.source.AP">AP</option>
            <option value="NYTimes.source.Reuters">Reuters</option>
            <option value="NYTimes.source.International Herald Tribune">International Herald Tribune</option>
          </optgroup>
        </Form.Select>
      </Col>
      <Col>
        News category
        <Form.Select onChange={props.onCategorySelect}>
          <option>Select news category</option>
          <optgroup label="NewsAPI">
            <option value="NewsAPI.category.business">Business</option>
            <option value="NewsAPI.category.entertainment">Entertainment</option>
            <option value="NewsAPI.category.health">Health</option>
            <option value="NewsAPI.category.science">Science</option>
            <option value="NewsAPI.category.sports">Sports</option>
            <option value="NewsAPI.category.technology">Technology</option>
          </optgroup>
          <optgroup label="NYTimes">
            <option value="NYTimes.category.Foreign">Foreign</option>
            <option value="NYTimes.category.Sports">Sports</option>
          </optgroup>
          <optgroup label="Guardian">
            <option value="Guardian.category.australia-news">Australia news</option>
            <option value="Guardian.category.better-business">Better Business</option>
            <option value="Guardian.category.books">Books</option>
          </optgroup>
        </Form.Select>
      </Col>
    </Row>
    
	</Container>
  );
};