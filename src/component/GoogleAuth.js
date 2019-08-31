import React, { Component } from 'react'
import { connect } from 'react-redux';
import { signIn, signOut } from '../actions';

class GoogleAuth extends Component {

    componentDidMount() {
        window.gapi.load('client:auth2', () => {
            window.gapi.client.init({
                clientId: '659176714794-r83g1km7k06iiros2q3ipp550o7ghcag.apps.googleusercontent.com',
                scope: 'email'
            }).then( () => {
                this.auth = window.gapi.auth2.getAuthInstance();
                this.onAuthChange(this.auth.isSignedIn.get());
                this.auth.isSignedIn.listen(this.onAuthChange)
            })
        });
    }

    onAuthChange = (isSignedIn) => {
        if (isSignedIn) {
            this.props.signIn();
        } else {
            this.props.signOut();
        }
    }

    onSignInClick = () => {
        this.auth.signIn();
    }

    onSignOutClick = () => {
        this.auth.signOut();
    }

    renderAuthButton() {
        if (this.props.isSignedIn === null) {
            return <div> I Don't know if we are signed in </div>
        } else if (this.props.isSignedIn) {
            return <button onClick={this.onSignOutClick} className='ui red google button'>
                <i className='google icon' />
                Sign Out
            </button>
        } else {
            return <button onClick={this.onSignInClick} className='ui red google button'>
                <i className= 'google icon' />
                Sign In With Google
            </button>
        }
    }

    render() {
        return (
            <div>
                {this.renderAuthButton()}
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return { isSignedIn: state.auth.isSignedIn };
}

export default connect(
    mapStateToProps,
    { signIn, signOut }
) (GoogleAuth)
