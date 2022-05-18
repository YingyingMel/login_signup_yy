import React from 'react'
import classnames from "classnames"
import { connect } from 'react-redux'
import * as flashActions from "../../action/flash" //该文件里获取所有的action并取名为flashActions
import { bindActionCreators } from 'redux'


const FlashMessage = (props) => {
    const removeClick = () => {
        props.flashActions.delFlashMessage(props.item.id)
    }
    return (
        <div className={classnames('alert', {
            "alert-danger": props.item.type === 'danger',
            "alert-success": props.item.type === 'success',
        })}>
            {props.item.msg}
            <button type="button" className="btn-close" data-bs-dismiss="alert" aria-label="Close" onClick={removeClick}></button>
        </div>
    )
}

const mapDispatchToProps = (dispatch) => {
    return {
        flashActions: bindActionCreators(flashActions, dispatch)
    }
}

export default connect(null, mapDispatchToProps)(FlashMessage)