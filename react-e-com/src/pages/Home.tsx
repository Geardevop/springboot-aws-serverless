
import ProductReel from '@/components/product/ProductReel'
import { Button, buttonVariants } from '@/components/ui/button'
import { ArrowDownToLine, CheckCircle, Leaf } from 'lucide-react'
import { Link } from 'react-router-dom'
const perks = [
  {
    name: "Instant Delivery",
    Icon: ArrowDownToLine,
    descriptions: "Get assets derivered to you"
  },
  {
    name: "Gurrenty Quality",
    Icon: CheckCircle,
    descriptions: "Every assets on platforms is verified out team to ensure quality to your project."
  },
  {
    name: "For the planet",
    Icon: Leaf,
    descriptions: "We've pledged 1% sale to donation."
  }
]

export default function Home() {
  return (
    <>
    <div className='mx-auto w-full max-w-screen-xl px-2.5 py-20 md:px-20'>
      <div className='py-20 mx-auto text-center flex flex-col items-center mx-w-3xl bg-white'>
        <h1 className='text-4xl font-bold tracking-tigh text-grey-900 sm:text-6xl'>
          Your marketplace for hight-quality{' '}
          <span className='text-blue-600'>digital assets</span>
          .
        </h1>
        <p className='mt-6 text-lg max-w-prose text-muted-foreground'>
          Welcome to Digitalgear. Every asset on our platform will be good
        </p>
        <div className='flex flex-col sm:flex-row gap-4 mt-6'>
          <Link to="/product" className={buttonVariants()}> Browse Threading</Link>
          <Button variant='ghost'>Our quality promise &rarr;</Button>
        </div>
      </div>
      <ProductReel title='Bandnew'/>
      </div>
      <section className='border-t border-gray-200 bg-gray-50'>
      <div className='mx-auto w-full max-w-screen-xl px-2.5 py-20 md:px-20'>
        <div className='grid grid-cols-1 gap-y-12 sm:grid-cols-2 sm:gap-x-6 lg:grid-cols-3 lg:gap-x-8 lg:gap-y-0'>
            {perks.map((perk)=>(
              <div key={perk.name} className='text-center md:flex md:items-start md:text-left lg:block lg:text-center'>
                <div className='md:flex-shrink-0 flex justify-center'>
                  <div className='h-16 w-16 flex items-center justify-center rounded-full bg-blue-100 text-blue-900'>
                    {<perk.Icon className='w-1/3 h-13'/>}
                  </div>
                </div>
                <div className='mt-6 md:ml-4 md:mt-0 lg:ml-0 lg:mt-6'>
                  <h3 className='text-base font-medium text-grey-900'>
                    {perk.name}
                  </h3>
                  <p className='mt-3 text-sm text-muted-foreground'>
                    {perk.descriptions}
                  </p>
                </div>
              </div>
            ))}
          </div>
      </div>
      </section>
    </>
  )
}
