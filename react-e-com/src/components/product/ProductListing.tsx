
import { Link } from 'react-router-dom'
import ImageSlider from '../ImageSlider'
import { formatPrice } from '@/lib/utils'

interface ProductListingProps {
    productId : string,
    productName :string,
    productDetails : string,
    productPrice : number,
    productUrlPircture:string
 }
const ProductListing = ({productId, productDetails, productName, productPrice, productUrlPircture}:ProductListingProps) =>{
  return (
    <div>
        
      <Link to={`/product/${productId}`}>
        <div className='flex flex-col w-full'>
            <ImageSlider urls={productUrlPircture}/>
            <h3 className="mt-4 font-medium text-sm text-gray-700">
                {productName}
            </h3>
            <p className="mt-1 text-sm text-gray-500">
                {productDetails}
            </p>
            <p className="mt-1 font-medium text-sm text-gray-900">{formatPrice(productPrice)}</p>
        </div>
      </Link>
    </div>
  )
}
export default ProductListing
