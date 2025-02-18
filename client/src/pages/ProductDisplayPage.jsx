import React, { useEffect, useRef, useState } from 'react'
import { useParams } from 'react-router-dom'
import SummaryApi from '../common/SummaryApi'
import Axios from '../utils/Axios'
import AxiosToastError from '../utils/AxiosToastError'
import { FaAngleRight,FaAngleLeft } from "react-icons/fa6";
import { DisplayPriceInRupees } from '../utils/DisplayPriceInRupees'
import Divider from '../components/Divider'
import image1 from '../assets/minute_delivery.png'
import image2 from '../assets/Best_Prices_Offers.png'
import image3 from '../assets/Wide_Assortment.png'
import { pricewithDiscount } from '../utils/PriceWithDiscount'
import AddToCartButton from '../components/AddToCartButton'

const ProductDisplayPage = () => {
  const params = useParams()
  let productId = params?.product?.split("-")?.slice(-1)[0]
  const [data,setData] = useState({
    name : "",
    image : []
  })
  const [image,setImage] = useState(0)
  const [loading,setLoading] = useState(false)
  const imageContainer = useRef()

  const fetchProductDetails = async()=>{
    try {
        const response = await Axios({
          ...SummaryApi.getProductDetails,
          data : {
            productId : productId 
          }
        })

        const { data : responseData } = response

        if(responseData.success){
          setData(responseData.data)
        }
    } catch (error) {
      AxiosToastError(error)
    }finally{
      setLoading(false)
    }
  }

  useEffect(()=>{
    fetchProductDetails()
  },[params])
  
  const handleScrollRight = ()=>{
    imageContainer.current.scrollLeft += 100
  }
  const handleScrollLeft = ()=>{
    imageContainer.current.scrollLeft -= 100
  }
  console.log("product data",data)
  return (
    <section className='container mx-auto p-4 grid lg:grid-cols-2 '>
        <div className=''>
            <div className='bg-white lg:min-h-[65vh] lg:max-h-[65vh] rounded min-h-56 max-h-56 h-full w-full'>
                <img
                    src={data.image[image]}
                    className='w-full h-full object-scale-down'
                /> 
            </div>
            <div className='flex items-center justify-center gap-3 my-2'>
              {
                data.image.map((img,index)=>{
                  return(
                    <div key={img+index+"point"} className={`bg-slate-200 w-3 h-3 lg:w-5 lg:h-5 rounded-full ${index === image && "bg-slate-300"}`}></div>
                  )
                })
              }
            </div>
            <div className='grid relative'>
                <div ref={imageContainer} className='flex gap-4 z-10 relative w-full overflow-x-auto scrollbar-none'>
                      {
                        data.image.map((img,index)=>{
                          return(
                            <div className='w-20 h-20 min-h-20 min-w-20 scr cursor-pointer shadow-md' key={img+index}>
                              <img
                                  src={img}
                                  alt='min-product'
                                  onClick={()=>setImage(index)}
                                  className='w-full h-full object-scale-down' 
                              />
                            </div>
                          )
                        })
                      }
                </div>
                <div className='w-full -ml-3 h-full hidden lg:flex justify-between absolute  items-center'>
                    <button onClick={handleScrollLeft} className='z-10 bg-white relative p-1 rounded-full shadow-lg'>
                        <FaAngleLeft/>
                    </button>
                    <button onClick={handleScrollRight} className='z-10 bg-white relative p-1 rounded-full shadow-lg'>
                        <FaAngleRight/>
                    </button>
                </div>
            </div>
            <div>
            </div>

            <div className='my-4  hidden lg:grid gap-3 '>
                <div>
                    <p className='font-semibold'>Description</p>
                    <p className='text-base'>{data.description}</p>
                </div>
                <div>
                    <p className='font-semibold'>Unit</p>
                    <p className='text-base'>{data.unit}</p>
                </div>
                {
                  data?.more_details && Object.keys(data?.more_details).map((element,index)=>{
                    return(
                      <div>
                          <p className='font-semibold'>{element}</p>
                          <p className='text-base'>{data?.more_details[element]}</p>
                      </div>
                    )
                  })
                }
            </div>
        </div>


        <div className='p-4 lg:pl-7 text-base lg:text-lg'>
            <p className='bg-green-300 w-fit px-2 rounded-full'>10 Min</p>
            <h2 className='text-lg font-semibold lg:text-3xl'>{data.name}</h2>  
            <p className=''>{data.unit}</p> 
            <Divider/>
            <div>
              <p className=''>Price</p> 
              <div className='flex items-center gap-2 lg:gap-4'>
                <div className='border border-green-600 px-4 py-2 rounded bg-green-50 w-fit'>
                    <p className='font-semibold text-lg lg:text-xl'>{DisplayPriceInRupees(pricewithDiscount(data.price,data.discount))}</p>
                </div>
                {
                  data.discount && (
                    <p className='line-through'>{DisplayPriceInRupees(data.price)}</p>
                  )
                }
                {
                  data.discount && (
                    <p className="font-bold text-green-600 lg:text-2xl">{data.discount}% <span className='text-base text-neutral-500'>Discount</span></p>
                  )
                }
                
              </div>

            </div> 
              
              {
                data.stock === 0 ? (
                  <p className='text-lg text-red-500 my-2'>Out of Stock</p>
                ) 
                : (
                  // <button className='my-4 px-4 py-1 bg-green-600 hover:bg-green-700 text-white rounded'>Add</button>
                  <div className='my-4'>
                    <AddToCartButton data={data}/>
                  </div>
                )
              }
           

            <h2 className='font-semibold'>Why shop from binkeyit? </h2>
            <div>
                  <div className='flex  items-center gap-4 my-4'>
                      <img
                        src={image1}
                        alt='superfast delivery'
                        className='w-20 h-20'
                      />
                      <div className='text-sm'>
                        <div className='font-semibold'>Superfast Delivery</div>
                        <p>Get your orer delivered to your doorstep at the earliest from dark stores near you.</p>
                      </div>
                  </div>
                  <div className='flex  items-center gap-4 my-4'>
                      <img
                        src={image2}
                        alt='Best prices offers'
                        className='w-20 h-20'
                      />
                      <div className='text-sm'>
                        <div className='font-semibold'>Best Prices & Offers</div>
                        <p>Best price destination with offers directly from the nanufacturers.</p>
                      </div>
                  </div>
                  <div className='flex  items-center gap-4 my-4'>
                      <img
                        src={image3}
                        alt='Wide Assortment'
                        className='w-20 h-20'
                      />
                      <div className='text-sm'>
                        <div className='font-semibold'>Wide Assortment</div>
                        <p>Choose from 5000+ products across food personal care, household & other categories.</p>
                      </div>
                  </div>
            </div>

            {/****only mobile */}
            <div className='my-4 grid gap-3 '>
                <div>
                    <p className='font-semibold'>Description</p>
                    <p className='text-base'>{data.description}</p>
                </div>
                <div>
                    <p className='font-semibold'>Unit</p>
                    <p className='text-base'>{data.unit}</p>
                </div>
                {
                  data?.more_details && Object.keys(data?.more_details).map((element,index)=>{
                    return(
                      <div>
                          <p className='font-semibold'>{element}</p>
                          <p className='text-base'>{data?.more_details[element]}</p>
                      </div>
                    )
                  })
                }
            </div>
        </div>
    </section>
  )
}

export default ProductDisplayPage










// import React, { useState } from 'react'
// import { DisplayPriceInRupees } from '../utils/DisplayPriceInRupees'
// import { valideURLConvert } from '../utils/valideURLConvert'
// import { pricewithDiscount } from '../utils/PriceWithDiscount'
// import AddToCartButton from '../components/AddToCartButton'

// const ProductDetailPage = ({ data }) => {
//   const url = `/product/${valideURLConvert(data.name)}-${data._id}`

//   // const [selectedVariant, setSelectedVariant] = useState({
//   //   name: data.variants[0]?.name,
//   //   price: data.variants[0]?.price,
//   //   discount: data.variants[0]?.discount,
//   //   quantity: data.variants[0]?.quantity,
//   // })

//   const [selectedVariant, setSelectedVariant] = useState(() => {
//     const firstVariant = data.variants?.[0] || {}; // Ensure a fallback object
//     return {
//       name: firstVariant.name || '', 
//       price: firstVariant.price || 0,
//       discount: firstVariant.discount || 0,
//       quantity: firstVariant.quantity || 0,
//     };
//   });
  

//   // Handle variant change (size/color)
//   // const handleVariantChange = (e, type) => {
//   //   const selectedValue = e.target.value
//   //   const updatedVariant = { ...selectedVariant }

//   //   if (type === 'name') {
//   //     updatedVariant.name = selectedValue
//   //   }

//   //   // Find the matching variant based on size and color
//   //   const variant = data.variants.find(variant =>
//   //     variant.name === updatedVariant.name 
//   //   )

//   //   // Update price and stock based on selected variant
//   //   if (variant) {
//   //     updatedVariant.price = variant.price
//   //     updatedVariant.discount = variant.discount
//   //     updatedVariant.quantity = variant.quantity
//   //   }

//   //   setSelectedVariant(updatedVariant)
//   // }

//   return (
//     <div className='container mx-auto py-6'>
//       <div className='grid grid-cols-1 lg:grid-cols-2 gap-8'>
//         {/* Product Image */}
//         <div className='min-h-20 w-full max-h-24 lg:max-h-32 rounded overflow-hidden'>
//           <img 
//             src={data.image[0]} 
//             className='w-full h-full object-scale-down lg:scale-125' 
//           />
//         </div>

//         {/* Product Details */}
//         <div>
//           <div className='font-medium text-2xl mb-2'>{data.name}</div>
//           <div className='text-sm text-gray-600 mb-2'>{data.unit}</div>

//           {/* Variant Selectors */}
//           <div className='mb-4'>
//             <div className='mb-2'>
//               <label className='text-sm font-semibold'>Select Type:</label>
//               <select
//                 value={selectedVariant.name}
//                 onChange={(e) => handleVariantChange(e, 'name')}
//                 className="bg-blue-50 p-1 border rounded"
//               >
//                   {data.variants?.map((variant, index) => (
//                     <option key={index} value={variant.name}>
//                       {variant.name}
//                     </option>
//                   ))}

                
//               </select>
//             </div>
//           </div>

//           {/* Price and Stock */}
//           <div className='flex items-center justify-between gap-1 lg:gap-3 text-xl font-semibold'>
//             <div>
//               {DisplayPriceInRupees(pricewithDiscount(selectedVariant.price, data.discount))}
//             </div>
//             {selectedVariant.stock === 0 ? (
//               <p className='text-red-500 text-sm'>Out of stock</p>
//             ) : (
//               <AddToCartButton data={data} selectedVariant={selectedVariant} />
//             )}
//           </div>

//           {/* Discount Badge */}
//           {Boolean(data.discount) && (
//             <p className='text-green-600 bg-green-100 px-2 w-fit text-xs rounded-full mt-2'>
//               {data.discount}% Discount
//             </p>
//           )}
//         </div>
//       </div>
//     </div>
//   )
// }

// export default ProductDetailPage
