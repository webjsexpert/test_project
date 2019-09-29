import ListErrors from './ListErrors';
import React from 'react';
import agent from '../agent';
import axios from 'axios'
import { Table } from 'react-bootstrap';
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
            <div className="col-md-6 offset-md-3 col-xs-12">
              <p className="text-xs-center">{this.props.userdata.name}</p>
              <p className="text-xs-center">{this.props.userdata.email}</p>
            </div>
          </div>
    );
  }
}
class Settings extends React.Component {
  constructor() {
    super();
    this.state = { userInfo:[] };
    this.handleChangeCheck = (userInfor) => ev => { 
        this.setState({userInfo: userInfor});
    };
  }
  
  componentDidMount() {
    
    axios.get('/api/v1/contacts',{
      credentials: 'include',
      method: 'GET',
      headers: {    
        // 'Content-Type': "origin",
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
                    <div className="col-md-6 col-xs-12">
                      <ListErrors errors={this.props.errors}></ListErrors>
                      <Table style={{textAlign:"center"}} striped bordered hover size="sm">
                        <thead >
                          <tr>
                            <th style={{textAlign:"center"}}><Checkbox/></th>
                            <th style={{textAlign:"center"}}>Name</th>
                            <th style={{textAlign:"center"}}>Email</th>
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
                              </tr>
                           ))
                          }
                        </tbody>)}
                      </Table>      
                    </div>
                    <div className="col-md-6 col-xs-12">
                          <Contactpanel
                            userdata={this.state.userInfo}
                          />
                    </div>
              </div>
        </div>
      </div>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Settings);
