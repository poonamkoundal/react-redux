import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import _ from 'lodash';
import { AgGridReact } from "ag-grid-react";
import "ag-grid-enterprise";
import {addProduct,deleteProduct} from '../redux/todos';

//https://www.ag-grid.com/javascript-grid-header-rendering/
//import AgGridReact from 'ag-grid-react';
let productDetail=[];

//http://www.material-ui.com/#/components/text-field
class Product extends Component {
	constructor(props){
		super(props);
		this.state={
			product:[],
			nameError:'',
			priceError:'',
			stockError:'',
			name:'',
			price:'',
			stock:'',
			columnDefs: [
					{
					  headerName: "Name",
					  field: "name",
					  width: 300,
          			  editable: true,
					},
					{
					  headerName: "Price",
					  field: "price",
					  width: 300,
          			  editable: true,
					},
					{
					  headerName: "Stock",
					  field: "Stock",
					  width: 300,
          			  editable: true,
					},
				  
				  ],
				  rowData:[
					{name: "Toyota", stock: "Celica", price: 35000},
					{name: "Toyota", stock: "Celica", price: 35000},
					{name: "Toyota", stock: "Celica", price: 35000},]

     

		}
	}


	submit(event){
		event.preventDefault();
	if(event.target.txt.value.trim().length===0){
		this.setState({nameError:'Enter product Name'});
	}else if(event.target.price.value.trim().length===0){
		this.setState({priceError:'Enter product Price'});
	}else if(event.target.stock.value.trim().length===0){
		this.setState({stockError:'Enter product stock'});
	}else{
		let productData={
			name:this.state.name,
			price:this.state.price,
			stock:this.state.stock
		}
		let data=this.state.product.push(productData);
		this.props.addProduct(productData);
		//event.target.txt.value = '';
		console.log(this.state.product,'data');
		this.refs.form.reset();
		
	}
		
	}
	delete(data){
		this.props.deleteProduct(data);
		
	}
	update(data){
		this.setState({name:data.name,stock:data.stock,price:data.price});
		
	}
	table(){
			return this.props.todos.map((todo,index)=>
		 <tr key={index}>
		 <td width="100px">{todo.data.name}</td>
		 <td width="100px">{todo.data.price}</td>
		 <td width="100px">{todo.data.stock}</td>
		 <td><a onClick={()=>this.delete(todo.data)}>Delete</a></td>
		 <td><a onClick={()=>this.update(todo.data)}>Update</a></td>
		 </tr>
		);
	}
	
 onGridReady(params) {
    this.gridApi = params.api;
    this.gridColumnApi = params.columnApi;
    params.api.sizeColumnsToFit();
  }
  render() {
	 		console.log(this.state,'todo');
			let containerStyle = {
            height: 115
        };
    return (
     <div className="container">
		<form onSubmit={this.submit.bind(this)} ref='form'>
			<div className="form-group ">
				<div className="col-md-12">
					<h2>Product</h2>
					<div  className="col-md-6">
						<label >Product Name:</label>
						<input type="text" name="txt" className="form-control" onChange={(event)=>this.setState({nameError:'',name:event.target.value})} value={this.state.product.name}/>
						<div className="form-error">{this.state.nameError}</div>
					</div>	
					<div  className="col-md-6">
						<label >Price:</label>
						<input type="text" name="price" className="form-control" onChange={(event)=>this.setState({priceError:'',price:event.target.value})} value={this.state.product.price}/>
						<div className="form-error">{this.state.priceError}</div>
					</div>
					<div  className="col-md-6">
						<label >Stock:</label>
						<input type="text" name="stock" className="form-control" onChange={(event)=>this.setState({stockError:'',stock:event.target.value})} value={this.state.product.stock}/>
						<div className="form-error">{this.state.stockError}</div>
					</div>
					<div className="col-md-6">
						<input type="submit" name="sub" className="btn btn-success" style={{marginTop:'25'}} value="Submit"/>
					</div>
					</div>			
			</div>
		</form>
		 <div style={{ width: "100%", height: "100%" }}>
	        <div style={{ height: "100%", boxSizing: "border-box" }}>
	          <div
	            style={{
	              boxSizing: "border-box",
	              height: "100%",
	              width: "100%"
	            }}
	            className="ag-theme-fresh"
	          >
	            <AgGridReact
	              id="myGrid"
	              columnDefs={this.state.columnDefs}
	              rowData={this.state.rowData}
	              //frameworkComponents={this.state.frameworkComponents}
	              onGridReady={this.onGridReady.bind(this)}
	            />
	          </div>
	        </div>
        </div>
	 </div>
    );
  }
}

const mapSatetToProps = state => {
  return {
    todos:state.todos
  }
}

const mapDispatchToProps = dispatch => {
  return {
    addProduct:bindActionCreators(addProduct, dispatch),
	deleteProduct:bindActionCreators(deleteProduct, dispatch),

  }
}
export default Product = connect(
  mapSatetToProps,
  mapDispatchToProps
)(Product);



