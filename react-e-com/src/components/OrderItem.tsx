
import product1 from '../assets/product1.jpg';
import product2 from '../assets/product2.jpg';
import product3 from '../assets/product3.jpg';
import product4 from '../assets/product4.jpg';
import { Product } from '@/lib/Basket.type';
import { formatPrice } from '@/lib/utils';

interface OrderItemProps {
    product: Product
}
export default function OrderItem({product}:OrderItemProps) {
  return (
    <div>
                  <div className="space-y-3 py-2 ">
                  <div className="flex items-start justify-between gap-4">
                      <div className="flex items-center space-x-4">
                          <div className="relative aspect-square h-22 w-20 min-w-fit overflow-hidden rounded">
                          <img src={product.product_name == 'product1' ? product1 : product.product_name =='product2' ? product2 :product.product_name == 'product3' ? product3 : product.product_name == 'product4'? product4 : undefined } alt={product.product_name} className="absolute object-cover"/>
                    
                          </div>
                          <div className="flex flex-col self-start">   
                              <span className="line-clamp-1 text-lg font-medium mb-1">
                                  {product.product_name}
                              </span>
                              <span className="line-clamp-1 text-md capitalize text-muted-foreground">
                                {product.product_count}
                              </span>
                              <div className="mt-4 text-xs text-muted-foreground">
                              </div>
                          </div>
                      </div>
                      <div className="flex flex-col space-y-1 font-medium">
                          <span className="ml-auto line-clamp-1 text-lg">
                            {formatPrice(product.product_price)}
                            
                          </span>
                      </div>
                  </div>
                </div>
    </div>
  )
}
