import React from 'react';
import { connect } from 'react-redux';
import { fetchUsers, updateUserRole, forcePwReset, deleteUser } from '../store';

class AllUsers extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      userDropdowns: {},
    }
    this.onChange = this.onChange.bind(this);
    this.onUpdateUserRoleClick = this.onUpdateUserRoleClick.bind(this);
    this.onDeleteUserClick = this.onDeleteUserClick.bind(this);
    this.onForcePwResetClick = this.onForcePwResetClick.bind(this)
  }

  componentDidMount() {
    this.props.fetchUsers();
  }

  onChange(evt, userId) {
    let userDropdowns = this.state.userDropdowns;
    userDropdowns[userId] = evt.target.value;
    this.setState({ userDropdowns })
  }

  onUpdateUserRoleClick(evt, userId) {
    const isAdmin = this.state.userDropdowns[userId] === 'admin';
    this.props.updateUserRole(userId, { isAdmin });
  }

  onForcePwResetClick(evt, userId) {
    this.props.forcePwReset(userId)
  }

  onDeleteUserClick(evt, userId) {
    this.props.deleteUser(userId);
  }

  componentWillReceiveProps(nextProps) {
    let userDropdowns = {};
    nextProps.users.map(user => {
      if (user.isAdmin) { userDropdowns[user.id] = 'admin' }
      else { userDropdowns[user.id] = 'standard' }
    })
    this.setState({ userDropdowns });
  }

  render() {
    const { users } = this.props;
    return (
      <div className="container">
        <h3>Users</h3>
        <ul>
        {
          users.map(user => {
            return (
              <li className="row-container" key={user.id}>
                <span>{user.email}</span>
                <select name="isAdmin" value={this.state.userDropdowns[user.id]} onChange={(evt) => this.onChange(evt, user.id)}>
                  <option value="admin">Admin</option>
                  <option value="standard">Standard</option>
                </select>
                <button className="update-button" onClick={(evt) => this.onUpdateUserRoleClick(evt, user.id)}>UPDATE ROLE</button>
                <button className="update-button" onClick={(evt) => this.onForcePwResetClick(evt, user.id)}>RESET PW</button>
                <button className="update-button" onClick={(evt) => this.onDeleteUserClick(evt, user.id)}>DELETE</button>
              </li>
            )
          })
        }
        </ul>
      </div>
    )
  }
}
const mapStateToProps = ({ users, user }) => {
  const filteredUsers = users.filter(userFromDB => userFromDB.id !== user.id);
  return {
    users: filteredUsers,
  }
}

const mapDispatchToProps = dispatch => ({
  fetchUsers: () => dispatch(fetchUsers()),
  updateUserRole: (userId, isAdmin) => dispatch(updateUserRole(userId, isAdmin)),
  deleteUser: userId => dispatch(deleteUser(userId)),
  forcePwReset: userId => dispatch(forcePwReset(userId))
});

export default connect(mapStateToProps, mapDispatchToProps)(AllUsers);
