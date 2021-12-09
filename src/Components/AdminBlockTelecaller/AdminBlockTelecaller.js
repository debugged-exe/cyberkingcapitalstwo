import React, {Component} from 'react';
import './AdminBlockTelecaller.scss';
import AdminBlockedTelecallerTable from "./AdminBlockedTelecallerTable/AdminBlockedTelecallerTable";
import {ToastContainer, toast} from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

//redux
import {connect} from "react-redux";
import {selectAdminBlockTelecallerLanguage, selectAdminBlockTelecallerTable} from '../../redux/admin-panel/admin-block-telecaller/admin.block.telecaller.selectors';
import {createStructuredSelector} from "reselect";
import {setAdminBlockTelecallerLanguage, setAdminBlockTelecallerTable, toggleBlockField} from "../../redux/admin-panel/admin-block-telecaller/admin.block.telecaller.actions";

toast.configure();
class AdminBlockTelecaller extends Component {
   constructor(props) {
      super(props);
      this.state = {
        pages: [],
        perPage: 10
      }
   }

   componentDidMount() {
      const {admin_block_telecaller_language, setAdminBlockTelecallerTable} = this.props;
      fetch("https://aqueous-mesa-28052.herokuapp.com/admin/fetch_telecallers_count", {
         method: 'post',
         headers: {
            'Content-Type': 'application/json'
         },
         body: JSON.stringify({des: 'junior', language: admin_block_telecaller_language})
      }).then(response => response.json()).then(resp => {
         let arr = []
         for (let i = 1; i <= Math.ceil(resp.count / this.state.perPage); i++) {
            arr.push(i);
         }
         this.setState({
            pages: arr
         }, () => {
            console.log()
         })
      }).catch(err => {
         console.log(err);
         toast.warn(`${err}`, {
            position: toast.POSITION.TOP_CENTER,
            autoClose: 2500
         });
      });
      fetch("https://aqueous-mesa-28052.herokuapp.com/admin/fetch_telecallers", {
         method: 'post',
         headers: {
            'Content-Type': 'application/json'
         },
         body: JSON.stringify({pgNo: 0, des: 'junior', language: admin_block_telecaller_language})
      }).then(response => response.json()).then(resp => {
         setAdminBlockTelecallerTable(resp);
      }).catch(err => {
         console.log(err);
         toast.warn(`${err}`, {
            position: toast.POSITION.TOP_CENTER,
            autoClose: 2500
         });
      })
   }

   handleSubmit = (telecaller_id, index) => {
      const {toggleBlockField} = this.props;
      fetch('https://aqueous-mesa-28052.herokuapp.com/admin/block_telecaller', {
         method: 'post',
         headers: {
            'Content-Type': 'application/json'
         },
         body: JSON.stringify({telecaller_id: telecaller_id})
      }).then(response => response.json()).then(response => {
         if (response === "blocked") {
            toast.success("Successfully blocked", {
               position: toast.POSITION.TOP_CENTER,
               autoClose: 2500
            })
            toggleBlockField(index);
         } else if (response === "unblocked") {
            toast.error("Successfully unblocked", {
               position: toast.POSITION.TOP_CENTER,
               autoClose: 2500
            })
            toggleBlockField(index);
         }
      }).catch(err => {
         console.log(err);
         toast.warn(`${err}`, {
            position: toast.POSITION.TOP_CENTER,
            autoClose: 2500
         })
      })
   }
   fetchNewPage = pgNo => {
      const {admin_block_telecaller_language, setAdminBlockTelecallerTable} = this.props;
      fetch("https://aqueous-mesa-28052.herokuapp.com/admin/fetch_telecallers", {
         method: 'post',
         headers: {
            'Content-Type': 'application/json'
         },
         body: JSON.stringify({pgNo: pgNo, des: 'junior', language: admin_block_telecaller_language})
      }).then(response => response.json()).then(resp => {
         setAdminBlockTelecallerTable(resp);
      }).catch(err => {
         console.log(err);
         toast.warn(`${err}`, {
            position: toast.POSITION.TOP_CENTER,
            autoClose: 2500
         });
      })
   }

   handleChange = async (event) => {
      const {name, value} = event.target;
      const {setAdminBlockTelecallerLanguage} = this.props;
      this.resetPage(value);
      await setAdminBlockTelecallerLanguage(value);
   }

   resetPage = (language) => {
      // console.log("reset function call");
      const {setAdminBlockTelecallerTable} = this.props;
      fetch("https://aqueous-mesa-28052.herokuapp.com/admin/fetch_telecallers_count", {
         method: 'post',
         headers: {
            'Content-Type': 'application/json'
         },
         body: JSON.stringify({des: 'junior', language: language})
      }).then(response => response.json()).then(resp => {
         let arr = []
         for (let i = 1; i <= Math.ceil(resp.count / this.state.perPage); i++) {
            arr.push(i);
         }
         this.setState({
            pages: arr
         }, () => {
            console.log()
         })
      }).catch(err => {
         console.log(err);
         toast.warn(`${err}`, {
            position: toast.POSITION.TOP_CENTER,
            autoClose: 2500
         });
      });
      fetch("https://aqueous-mesa-28052.herokuapp.com/admin/fetch_telecallers", {
         method: 'post',
         headers: {
            'Content-Type': 'application/json'
         },
         body: JSON.stringify({pgNo: 0, des: 'junior', language: language})
      }).then(response => response.json()).then(resp => {
         setAdminBlockTelecallerTable(resp);
      }).catch(err => {
         console.log(err);
         toast.warn(`${err}`, {
            position: toast.POSITION.TOP_CENTER,
            autoClose: 2500
         });
      })
   }

   render() {
      const {pages} = this.state;
      return (<div className={'admin-block-section '}>
         <div className={'w-100 mb4'}>
            <div className={'flex flex-column justify-center items-center'}>
               <h1 style={{
                     marginTop: "1rem",
                     marginBottom: "1.8rem"
                  }}>Block Telecaller</h1>
               <div className="telecaller-analytics-select-container">
                  <label htmlFor="language" className="admin-block-date-label">Select Language:</label>
                  <select name="language" className="admin-block-select" onChange={this.handleChange}>
                     <option value="marathi">Marathi</option>
                     <option value="hindi">Hindi</option>
                  </select>
               </div>
            </div>
            <AdminBlockedTelecallerTable handleSubmit={this.handleSubmit}/>
         </div>
         <div className="admin-block-pagination-container pb4">
            <p>. .
            </p>
            {pages.map((number, index) => (<button key={index} onClick={() => this.fetchNewPage(number - 1)} className="admin-block-page-btn">{number}</button>))}
            <p>. .
            </p>
         </div>
      </div>);
   }
}

const mapStateToProps = createStructuredSelector({admin_block_telecaller_language: selectAdminBlockTelecallerLanguage, admin_block_telecaller_table: selectAdminBlockTelecallerTable})

const mapDispatchToProps = dispatch => ({
   setAdminBlockTelecallerLanguage: language => dispatch(setAdminBlockTelecallerLanguage(language)),
   setAdminBlockTelecallerTable: table => dispatch(setAdminBlockTelecallerTable(table)),
   toggleBlockField: index => dispatch(toggleBlockField(index))
})

export default connect(mapStateToProps, mapDispatchToProps)(AdminBlockTelecaller);
