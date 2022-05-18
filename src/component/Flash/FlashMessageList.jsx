import React from 'react'
import FlashMessage from './FlashMessage'
import { connect } from 'react-redux'

const FlashMessageList = (props) => {
    return (
        <div>
            {
                props.flashs.map((ele, index) => { //这里的flashs就是19行的flashs
                    return <FlashMessage item={ele} key={index} />
                })
            }
        </div>
    )
}

const mapStateToProps = (state) => {
    return {
        flashs: state.flash
    }
}
export default connect(mapStateToProps)(FlashMessageList) //这两个捆绑，Fl...里拿到的props就是map...里返回的flashs 

//用class方式写的
// class FlashMessageList extends Component {
//     render() {
//         return (
//             <div>
//                 {
//                     this.props.flashs.map((ele, index) => {
//                         return <FlashMessage item={ele} key={index} />
//                     })
//                 }
//             </div>
//         )
//     }
// }

// const mapStateToProps = (state) => {
//     return {
//         flashs: state.flash
//     }
// }

// export default connect(mapStateToProps)(FlashMessageList)