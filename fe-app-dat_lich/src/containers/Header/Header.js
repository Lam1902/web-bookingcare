import React, { Component } from 'react';
import { connect } from 'react-redux';

import * as actions from "../../store/actions";
import Navigator from '../../components/Navigator';
import { adminMenu } from './menuApp';
import './Header.scss';
import {LANGUAGES} from "../../utils"
import { FormattedMessage } from "react-intl";


class Header extends Component {
    handleChangeLanguages = (languages) => {
        this.props.changeLanguageAppRedux(languages)
    }

    render() {

        const { processLogout , language, userInfo } = this.props;
        // console.log("check: ", userInfo)

        return (
            <div className="header-container">
                {/* thanh navigator */}
                <div className="header-tabs-container">
                    <Navigator menus={adminMenu} />
                </div>

         

                {/* nút logout */}
                <div className='languages'>
                    <span className='welcom' ><FormattedMessage id='homeheader.welcom' /> 
                    {userInfo.fistName ? userInfo
                    .fistName : "null"}</span>
                    <span className={language === LANGUAGES.VI ? "languages-vi active" : "languages-en" }
                    onClick={()=> this.handleChangeLanguages(LANGUAGES.VI)} >VN</span>
                    <span className={language === LANGUAGES.EN ? "languages-en active" : "languages-vi" }
                    onClick={()=> this.handleChangeLanguages(LANGUAGES.EN)} >EN</span>
                    <div className="btn btn-logout" 
                    onClick={processLogout} 
                    title='Logout'>
                    <i className="fas fa-sign-out-alt"></i>
                </div>
                </div>

               
            </div>
        );
    }

}

const mapStateToProps = state => {
    return {
        isLoggedIn: state.user.isLoggedIn,
            // lấy biến language từ redux
    language: state.app.language,
    userInfo: state.user.userInfo.userData
    };
};

const mapDispatchToProps = dispatch => {
    return {
        processLogout: () => dispatch(actions.processLogout()),
    changeLanguageAppRedux: (language) => dispatch(actions.changeLanguage(language))

    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Header);
