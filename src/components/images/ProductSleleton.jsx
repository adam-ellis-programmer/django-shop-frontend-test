const ProductSkeleton = () => (
  <div className='max-w-[90%] mx-auto'>
    <div className='flex justify-center mt-5 mb-5'>
      <div className='h-10 bg-gray-200 animate-pulse rounded w-[400px]'></div>
    </div>
    <div className='grid lg:grid-cols-[1fr_1fr] gap-5'>
      <div className='pr-5'>
        <div className='h-8 bg-gray-200 animate-pulse rounded w-2/3 mx-auto mb-5'></div>
        <div className='shadow-md p-5 rounded-lg animate-pulse'>
          <div className='h-[300px] bg-gray-200 rounded mb-5'></div>
          <div className='h-4 bg-gray-200 rounded mb-3 w-3/4'></div>
          <div className='h-4 bg-gray-200 rounded mb-3 w-1/2'></div>
        </div>
      </div>
      <div>
        <div className='h-8 bg-gray-200 animate-pulse rounded w-2/3 mx-auto mb-5'></div>
        <div className='grid gap-3'>
          {[1, 2, 3].map((i) => (
            <div
              key={i}
              className='h-[100px] bg-gray-200 animate-pulse rounded'
            ></div>
          ))}
        </div>
      </div>
    </div>
  </div>
)

export default ProductSkeleton
