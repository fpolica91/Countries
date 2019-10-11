import React, { Component } from 'react';


class UserLogin extends Component {

    render() {
        return (
            <div>
                <form onSubmit={(e) => this.props.onUserSubmit(e)}>
                    <label htmlFor="username">Username:</label>
                    <input
                        type="text" name="username"
                        value={this.props.username}
                        onChange={(e) => this.props.onHandleUserForm(e)}
                    />
                    <label htmlFor="password">Passoword:</label>
                    <input
                        type="text" name="password"
                        value={this.props.password}
                        onChange={(e) => this.props.onHandleUserForm(e)}
                    />
                    <button>Create Account</button>
                </form>

            </div>
        );
    }
}

export default UserLogin;