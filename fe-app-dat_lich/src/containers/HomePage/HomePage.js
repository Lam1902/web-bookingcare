import React, { Component } from 'react';
import { connect } from 'react-redux';
import HomeHeader from './HomeHeader';
import Specialty from './Section/Specialty';
import MedicalFacility from './Section/MedicalFacility';
import OutstandingDoctor from './Section/OutstandingDoctor';
import HandleBook from './Section/HandleBook';
import About from './Section/About';
import HomeFooter from './HomeFooter';


class HomePage extends Component {


    render() {
        let settings = {
            dots: false, // Ẩn chấm chấm điều hướng
            infinite: false, // Cho phép lặp vô hạn giữa các slide
            speed: 500, // Tốc độ trượt slide (milliseconds)
            slidesToShow: 4, // Số lượng slide hiển thị cùng một lúc
            slidesToScroll: 4, // Số lượng slide cuộn mỗi lần
         
          };
      
        return (
            <div>
                <HomeHeader  isShowBanner = {true} />
                <Specialty 
                settings={settings}
                />
                <MedicalFacility 
                settings={settings}
                />
                 <OutstandingDoctor 
                settings={settings}
                />
                <HandleBook
                 settings={settings}
                />
                <About />
                <HomeFooter/>
             
            </div>
        );
    }

}

const mapStateToProps = state => {
    return {
        isLoggedIn: state.user.isLoggedIn
    };
};

const mapDispatchToProps = dispatch => {
    return {
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(HomePage);
