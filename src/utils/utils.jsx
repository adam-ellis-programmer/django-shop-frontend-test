export const renderField = (field, product = null) => {
  const { name, type, options, defaultCase, id } = field
  // had to add the ? why...
  const labelText = name?.replace(/([A-Z])/g, ' $1').trim()

  // Get the current value from product if it exists
  const currentValue = product ? product[name] : undefined

  // Determine if we're in edit mode - if we have a product then we are  in edit mode
  const isEditMode = product !== null

  switch (type) {
    case 'select':
      return (
        <div key={id} className='new-product-form-control'>
          <label htmlFor={name} className='label block'>
            <span className='label-text capitalize'>{labelText}</span>
          </label>
          <select
            defaultValue={currentValue || ''}
            className='select select-secondary w-full'
            id={name}
            name={name}
          >
            <option value=''>Select {labelText}</option>
            {options?.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>
        </div>
      )

    case 'textarea':
      return (
        <div key={id} className='new-product-form-control'>
          <label htmlFor={name} className='label block'>
            <span className='label-text capitalize'>{labelText}</span>
          </label>
          <textarea
            placeholder='Secondary'
            className='textarea textarea-secondary w-full'
            id={name}
            name={name}
            defaultValue={currentValue || ''}
          ></textarea>
        </div>
      )

    case 'boolean':
      return (
        <div key={id} className='new-product-form-control'>
          <label htmlFor={name} className='label block '>
            <span className='label-text capitalize'>{name}</span>
          </label>
          <input
            type='checkbox'
            defaultChecked={
              currentValue !== undefined ? currentValue : defaultCase
            }
            className='checkbox checkbox-secondary'
            id={name}
            name={name}
          />
        </div>
      )

    case 'file':
      // Different rendering logic for Add vs Edit mode
      if (isEditMode) {
        // Edit mode - show existing images and replacement instructions
        return (
          <div key={id} className='new-product-form-control'>
            <label htmlFor={name} className='label block '>
              <span className='label-text capitalize'>{name}</span>
            </label>

            {/* Only show in edit mode */}
            {product.images && product.images.length > 0 && (
              <div className='mb-2 flex flex-wrap gap-2'>
                {product.images.map((img, idx) => (
                  <div key={idx} className='relative'>
                    <img
                      src={img.image_url}
                      alt={`Product ${idx}`}
                      className='h-16 w-16 object-cover rounded'
                    />
                  </div>
                ))}
              </div>
            )}

            <input
              type='file'
              className='file-input file-input-secondary w-full'
              name={name}
              multiple
            />

            {/* Only show in edit mode */}
            {product.images && product.images.length > 0 && (
              <p className='text-xs mt-1'>
                Upload new images only if you want to replace existing ones
              </p>
            )}
          </div>
        )
      } else {
        // Add mode - simple file input without extra elements
        return (
          <div key={id} className='new-product-form-control'>
            <label htmlFor={name} className='label block '>
              <span className='label-text capitalize'>{name}</span>
            </label>
            <input
              type='file'
              className='file-input file-input-secondary w-full'
              name={name}
              multiple
            />
          </div>
        )
      }

    default:
      return (
        <div key={id} className='new-product-form-control'>
          <label htmlFor={name} className='label block'>
            <span className='label-text capitalize'>{labelText}</span>
          </label>
          <input
            type='text'
            placeholder={labelText}
            className='input input-secondary w-full'
            id={name}
            name={name}
            defaultValue={currentValue || ''}
          />
        </div>
      )
  }
}
