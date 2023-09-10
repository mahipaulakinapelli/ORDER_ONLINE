import React, { Fragment, useEffect, useState } from "react";
import Carousel from "react-material-ui-carousel";
import "./ProductDetails.css";
import {useSelector,useDispatch} from "react-redux";
import { clearErrors, getProductDetails } from "../../actions/productAction";
import { useParams } from "react-router-dom";
import Loader from "../layout/Loader/Loader.js";
import {useAlert} from "react-alert";
import MetaData from "../layout/MetaData";
import { addItemsToCart } from "../../actions/cartAction";


const ProductDetails = ({k}) => {
    const {id} = useParams();
    const dispatch = useDispatch();
    const alert = useAlert();
    
    const { product,loading,error} = useSelector(
        (state) => state.productDetails
    );

    useEffect(() => {
        if(error){
            alert.error(error);
            dispatch(clearErrors());
        }
        dispatch(getProductDetails(id));
    },[dispatch, id,error,alert]);

    

    const [ quantity , setQuantity ] = useState(1);

    const increaseQuantity = () =>{
        if(product.Stock <= quantity){
            return;
        }
        const qty = quantity + 1;
        setQuantity(qty);
    }

    const decreaseQuantity = () =>{

        if(quantity <= 1){
            return;
        }
        const qty = quantity - 1;
        setQuantity(qty);

    }

    const addToCartHandler = () =>{

        dispatch(addItemsToCart(id,quantity));
        alert.success("Item Added to Cart");

    };

    return(

        <Fragment>
            {loading ? <Loader /> : (
                <Fragment>
                    <MetaData title={`${product.name}`} /> 
                <div className="ProductDetails">
                    <div>
    
                    <Carousel>
                            {product.images && product.images.map((item, i) => (
                                <img
                                className="CarouselImage"
                                key={item.url}
                                src={item.url}
                                alt={`${i} Slide`}
                                />
                            ))}
                        </Carousel>
                    </div>
    
    
    
    
                    <div>
                        <div className="detailsBlock-1">
                            <h2>{product.name}</h2>
                            <p>Product # {product._id}</p>
                        </div>
    
                        <div  className="detailsBlock-3">
                            <h1>{`₹${product.price}`}</h1>
                            <div className="detailsBlock-3-1">
                                <div className="detailsBlock-3-1-1">
                                    <button onClick={decreaseQuantity}>-</button>
                                    <input readOnly type="number" value={quantity}/>
                                    <button onClick={increaseQuantity}>+</button>
                                </div>
                                <button disabled={product.Stock < 1 ? true : false}  onClick={addToCartHandler}>Add to Cart</button>
                            </div>
                            <p>
                                Status:
                                    <b className={product.Stock < 1 ? "redColor" : "greenColor"}>
                                    {product.Stock < 1 ? "OutOfStock" : "InStock"}
                                </b>
                            </p>
                            
                        </div>
    
                        <div className="detailsBlock-4">
                                Description : <p>{product.description}</p>
                        </div>
    
                    </div>
                </div>
                
            </Fragment>
            )}
        </Fragment>

    );

};
export default ProductDetails;