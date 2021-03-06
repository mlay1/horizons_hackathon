import React, {Component} from 'react';
import Video from './Video.js';
import { Column, Row } from 'simple-flexbox';
import longAudio from '../../backend/CloudApi/longaudio';
import { Search, Form } from 'semantic-ui-react';


class SearchPage extends Component {
  state = {
    searchKey: '',
    seekTime: null,
    searchStrings: [],
    searchResults: [], //array of indices of the search results
    wordArr: [ 'my',
    'mother',
    'died',
    'of',
    'cancer',
    'in',
    '53',
    'and',
    'those',
    'last',
    'paying',
    'for',
    'months',
    'she',
    'was',
    'more',
    'worried',
    'about',
    'paying',
    'her',
    'medical',
    'bills',
    'and',
    'getting',
    'well',
    'I',
    'hear',
    'stories',
    'like',
    'hers',
    'every',
    'day',
    'for',
    '20',
    'years',
    'Washington\'s',
    'talked',
    'about',
    'Healthcare',
    'reform',
    'and',
    'reformed',
    'nothing',
    'I\'ve',
    'got',
    'a',
    'plan',
    'to',
    'cut',
    'costs',
    'and',
    'cover',
    'everyone',
    'but',
    'unless',
    'we',
    'stop',
    'the',
    'bickering',
    'in',
    'the',
    'lobbyists',
    'will',
    'be',
    'in',
    'the',
    'same',
    'place',
    '20',
    'years',
    'from',
    'now',
    'I\'m',
    'Barack',
    'Obama',
    'and',
    'I',
    'approve',
    'this',
    'message',
    'because',
    'to',
    'fix',
    'Healthcare',
    'we',
    'have',
    'to',
    'fix',
    'Washington' ],
    startTimeArr: [ 0,
      0,
      0,
      1,
      1,
      1,
      1,
      2,
      3,
      3,
      3,
      4,
      4,
      4,
      4,
      5,
      5,
      5,
      5,
      6,
      6,
      6,
      7,
      7,
      7,
      8,
      9,
      9,
      9,
      9,
      10,
      10,
      10,
      11,
      11,
      11,
      12,
      13,
      13,
      13,
      13,
      14,
      15,
      15,
      16,
      16,
      16,
      16,
      16,
      17,
      17,
      17,
      17,
      18,
      19,
      19,
      19,
      19,
      19,
      20,
      20,
      20,
      21,
      21,
      21,
      21,
      21,
      22,
      22,
      22,
      22,
      23,
      23,
      24,
      24,
      24,
      25,
      25,
      26,
      26,
      26,
      27,
      27,
      27,
      28,
      28,
      28,
      28,
      29 ]

    }

    componentDidMount () {
      fetch ('http://localhost:3000/words')
      .then((response) => response.json())
      .then((json) => {
        this.setState({
          startTimeArr: json.startTimeArr,
          wordArr: json.wordArr,
        })
      })
    }

    handleSearchEnter = (e) => {
      var searchResults = [];
      var searchStrings = [];
      var searchArr = e.target.value.trim().split(' ');

      if (searchArr.length > 1) {
        this.state.wordArr.forEach((word, j) => {
          var count = 0;
          var string = "";
          var beforeStr = "";
          var afterStr = "";
          if(word.toLowerCase().indexOf(searchArr[0].toLowerCase()) > -1){
            count++
            string = word;
            if(j-2 >= 0){
              beforeStr = this.state.wordArr[j-2] + " " + this.state.wordArr[j-1] + " ";
            } else if (j - 1 === 0){
              beforeStr = this.state.wordArr[j-1] + " "
            }
            for(var i = 1; i < searchArr.length; i++){
              if(this.state.wordArr[j+i] && this.state.wordArr[j+i].toLowerCase().indexOf(searchArr[i].toLowerCase()) > -1){
                count ++
                string = string + " " + this.state.wordArr[j+i];
                if(j+i+2 < this.state.wordArr.length){
                  afterStr = " " + this.state.wordArr[j+i+1] + " " + this.state.wordArr[j+i+2];
                } else if (j+i+1 < this.state.wordArr.length){
                  afterStr = " " + this.state.wordArr[j+i+1]
                }

              }
            }
          }
          return count === searchArr.length ? (searchResults.push(j), searchStrings.push([string, beforeStr, afterStr])) : null
        })
      } else {
        this.state.wordArr.forEach((word, i) => {
          var beforeStr =  (i - 1 >= 0 ? (i - 2 >= 0 ? this.state.wordArr[i-2] + " " + this.state.wordArr[i-1] + " " : this.state.wordArr[i-1] + " ") : null);
          var afterStr = (i + 1 < this.state.wordArr.length ? (i + 2 < this.state.wordArr.length ? " " + this.state.wordArr[i+1] + " " + this.state.wordArr[i+2] : " " + this.state.wordArr[i+1]) : null);
          var index = word.toLowerCase().indexOf(e.target.value.toLowerCase());
          return index > -1 ? (searchResults.push(i), searchStrings.push([word, beforeStr, afterStr])) : null
        })
      }
      console.log(searchResults, searchStrings)
      this.setState({
        searchResults: searchResults,
        searchStrings: searchStrings
      })
    }

    handleSearchChange = (e) => {
      this.setState({
        searchKey: e.target.value,
        searchResults: [],
        seekTime: null,
      });
      this.handleSearchEnter(e)
    };

    setSeekTime(time) {
      this.setState({seekTime: time});
    }

    clearSeekTime() {
      this.setState({seekTime: null});
    }

    render() {
      return (
        <body id="search_body">
          <div id='searchPage'>
            <Column flexGrow={1}>
              <Row horizontal="center" id="title">
                <h1 id="search_header" onClick={() => this.props.handleClick()}>VidSearch</h1>
              </Row>
              <br /><br />
              <Row horizontal="center" id="content_row">
                <Column flexGrow={5} id="video_column">
                  <Video seekTime={this.state.seekTime} clearSeekTime={() => this.clearSeekTime()}/>
                </Column>
                <Column flexGrow={0.1} />
                <Column flexGrow={1} id="search_column">
                  <Row id='extend'>
                    <Form>
                      <Form.Field>
                        <input placeholder='Enter a word/phrase to search...' id = 'search_bar' value={this.state.searchKey}
                        onChange={this.handleSearchChange}
                        // onKeyDown={(e) => e.keyCode === 13 ? this.handleSearchEnter() : null}
                      />
                    </Form.Field>
                  </Form>
                </Row>
                <div class="ui inverted segment" id='inverted_segment'>
                  <Row vertical='center' id='results_header'>
                    <Column flexGrow={1} id='results_header_1' horizontal='start'>
                      Time stamp
                    </Column>
                    <Column flexGrow={1} id='results_header_2' horizontal='end'>
                      Phrase
                    </Column>
                  </Row>
                  <hr />
                  <div class="ui inverted relaxed divided list" id='inverted_list'>
                    {this.state.searchResults.map((index, i) =>
                      (<div>
                        <Row onClick={() => this.setSeekTime(this.state.startTimeArr[index])} vertical="center" id="timestampCards">
                          <Column flexGrow={1} horizontal='start' class="timestamp">{this.state.startTimeArr[index]} sec.</Column>
                          <Column flexGrow={1} horizontal='end' class="phrase">{this.state.searchStrings[i][1]}<b>{this.state.searchStrings[i][0]}</b>{this.state.searchStrings[i][2]}</Column>
                        </Row>
                        <hr />
                      </div>)
                    )}
                  </div>
                </div>
              </Column>
            </Row>
          </Column>
        </div>
      </body>
    );
  }
}

export default SearchPage;
