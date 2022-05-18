import React from 'react'
import SignUpForm from './SignUpForm'
import { connect } from "react-redux"
import * as flashActions from "../../action/flash"
import { bindActionCreators } from 'redux'

//在父级关联一次redux,后面的子元素都可以用

const SignUpPage = (props) => {
    return (
        <div className='row'>
            <div className='col-md-3'></div>
            <div className='col-md-6'><SignUpForm flashActions={props.flashActions} /></div>
            <div className='col-md-3'></div>
        </div>
    )
}
const mapDispatchToProps = (dispatch) => {
    return {
        flashActions: bindActionCreators(flashActions, dispatch)
    }
}

export default connect(null, mapDispatchToProps)(SignUpPage)
