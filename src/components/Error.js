import React, { Component } from 'react';
import { history } from '../helpers/history';

class ErrorBoundary extends React.Component {
    constructor(props) {
        super(props);
        this.state = { error: null, errorInfo: null };
    }

    componentDidCatch(error, errorInfo) {
        let _dd = errorInfo ? ", errorInfo : " + JSON.stringify(errorInfo) : "";
        this.setState({
            error: error
        })
        this.state.error = error;
        this.state.errorInfo = _dd;
        let errodflg = localStorage.getItem('erromsg');        
        if (!errodflg || errodflg != error) {
            localStorage.setItem('erromsg', error);                        
            setTimeout(() => {
                window.location.reload(true);
            }, 3000);
        }
    }

    GotoHome = () => {
        history.push('/')
    }

    render() {
        const { t } = this.props;
        if (this.state.error) {

            return (
                <div style={{ textAlign: "center" }}>
                    <h2 style={{ color: "red" }} onClick={() => {this.GotoHome()}}>Please Try Again...</h2>
                </div>
            );
        }

        return this.props.children;
    }
}

export default ErrorBoundary;