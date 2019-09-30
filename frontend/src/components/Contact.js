import ListErrors from './ListErrors';
import React from 'react';
import agent from '../agent';
import axios from 'axios'
import { WithContext as ReactTags } from 'react-tag-input';
import '../css/style.css'; 
import '../css/inputtagstyle.css'; 
import { Table } from 'react-bootstrap';
import { ButtonToolbar } from 'react-bootstrap';
import { Button } from 'react-bootstrap';
import { Tabs } from 'react-bootstrap';
import { Tab } from 'react-bootstrap';
import { connect } from 'react-redux';
import {
  SETTINGS_SAVED,
  SETTINGS_PAGE_UNLOADED,
  LOGOUT
} from '../constants/actionTypes';

const mapStateToProps = state => ({
  ...state.settings,
  currentUser: state.common.currentUser
});

const mapDispatchToProps = dispatch => ({
  onClickLogout: () => dispatch({ type: LOGOUT }),
  onSubmitForm: user =>
    dispatch({ type: SETTINGS_SAVED, payload: agent.Auth.save(user) }),
  onUnload: () => dispatch({ type: SETTINGS_PAGE_UNLOADED })
});
const KeyCodes = {
  comma: 188,
  enter: 13,
};
 
const delimiters = [KeyCodes.comma, KeyCodes.enter];

class Inputtag extends React.Component {
    constructor(props) {
        super(props);
 
        this.state = {
            tags: [
                { id: "host", text: "HOST" },
                { id: "admin", text: "ADMIN" },
                { id: "tag", text: "TADG" }
             ],
        };
        this.handleDelete = this.handleDelete.bind(this);
        this.handleAddition = this.handleAddition.bind(this);
        this.handleDrag = this.handleDrag.bind(this);
    }
    
    handleDelete(i) {
        const { tags } = this.state;
        this.setState({
         tags: tags.filter((tag, index) => index !== i),
        });
    }
 
    handleAddition(tag) {
        this.setState(state => ({ tags: [...state.tags, tag] }));
    }
 
    handleDrag(tag, currPos, newPos) {
        const tags = [...this.state.tags];
        const newTags = tags.slice();
 
        newTags.splice(currPos, 1);
        newTags.splice(newPos, 0, tag);
 
        // re-render
        this.setState({ tags: newTags });
    }
 
    render() {
        const { tags, suggestions } = this.state;
        return (
            <div>
                <ReactTags tags={tags}
                    placeholder="Type tag"
                    suggestions={suggestions}
                    handleDelete={this.handleDelete}
                    handleAddition={this.handleAddition}
                    handleDrag={this.handleDrag}
                    delimiters={delimiters} />
            </div>
        )
    }
};
class Checkbox extends React.Component {
  render() {
    return (
      <input type="checkbox" onChange={this.handleCheck} defaultChecked={this.props.checked}/>
    );
  }
}
class Contactpanel extends React.Component {
  constructor() {
    super();
    this.state = { list: []};
  }

  render() {
    return (
      <div className="row">
          <div className="col-md-10 col-xs-12 sidefild">
                {this.props.userdata.edit && (
                  <div className="text-xs-center">
                      <p className="text-xs-center">{this.props.userdata.name}</p>
                      <p className="text-xs-center">{this.props.userdata.email}</p>
                      <Inputtag 
                          className="text-xs-center"
                      />
                      <ButtonToolbar className="text-xs-center button-tool">
                            <Button variant="outline-primary">Invite</Button>
                            <Button variant="outline-danger">Cancel</Button>
                            <Button variant="outline-danger">Delete</Button>
                      </ButtonToolbar>
                  </div>
                ) } 
                
                <Tabs className={"infotab"} defaultActiveKey="maininfor" id="uncontrolled-tab-example">
                      <Tab eventKey="maininfor" title="Main infor">
                            <div className="row use-info">
                                  <div className="col-md-6 col-xs-12 main-info">
                                          <div className={"tab-head-text"}>PHONE</div>
                                          <div>{this.props.userdata.phone}</div>
                                          <div className={"tab-head-text"}>COUNTRY</div>
                                          <div>{this.props.userdata.country}</div>
                                          <div className={"tab-head-text"}>LTV</div>
                                          <div>{this.props.userdata.ltv}</div>
                                  </div>
                                  <div className="col-md-6 col-xs-12 main-info">
                                          <div className={"tab-head-text"}>IP ADRESS</div>
                                          <div>{this.props.userdata.ip_add}</div>
                                          <div className={"tab-head-text"}>TIME ON WEBINAR</div>
                                          <div>{this.props.userdata.time}</div>
                                  </div>
                            </div>
                      </Tab>
                      <Tab eventKey="history" title="History">
                      </Tab>
                      <Tab eventKey="message2" title="Message2">
                      </Tab>
                </Tabs>
          </div>
      </div>
    );
  }
}
class Settings extends React.Component {
  constructor() {
    super();
    this.state = { userInfo:[] };
    this.state = { flag:'' };
    this.handleChangeCheck = (userInfor) => ev => { 
        this.setState({flag:1})
        this.setState({userInfo: userInfor});
    };
  }
  
  componentDidMount() {
    
    axios.get('/api/v1/contacts',{
      credentials: 'include',
      method: 'GET',
      headers: {    
        'Content-Type': "text/json",
        'X-Requested-With': 'XMLHttpRequest'
      }
    })
    .then(response => {
      this.setState({list: response.data})
    })
    .catch(error => console.log(error))
  }
 
  render() {
    let data=this.state.list
    return (
      <div className="settings-page">
        <div className="container page">
              <div className="row">
                    <div className="col-md-7 col-xs-12">
                      <ListErrors errors={this.props.errors}></ListErrors>
                      <Table style={{textAlign:"center"}} striped bordered hover size="sm">
                        <thead >
                          <tr>
                            <th style={{textAlign:"center"}}><Checkbox/></th>
                            <th style={{textAlign:"center"}}>Name</th>
                            <th style={{textAlign:"center"}}>Email</th>
                            <th style={{textAlign:"center"}}>COUNTRY</th>
                            <th style={{textAlign:"center"}}>PHONE</th>
                            <th style={{textAlign:"center"}}>IPADRESS</th>
                          </tr>
                        </thead>
                        {data &&(<tbody>
                          {
                            data.map((data,i) =>(
                              <tr id={i} onClick={this.handleChangeCheck(data)} key={i}>
                                <td><Checkbox 
                                  checked={data['ch']}
                                /></td>
                                <td>{data['name']}</td>
                                <td>{data['email']}</td>
                                <td>{data['country']}</td>
                                <td>{data['phone']}</td>
                                <td>{data['ip_add']}</td>
                              </tr>
                           ))
                          }
                        </tbody>)}
                      </Table>      
                    </div>
                    {this.state.flag && (
                      <div className="col-md-5 col-xs-12">
                            <Contactpanel
                              userdata={this.state.userInfo}
                            />
                      </div>
                    ) }  
                    
              </div>
        </div>
      </div>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Settings);
