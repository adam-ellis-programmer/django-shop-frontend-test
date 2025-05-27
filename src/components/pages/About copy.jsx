import React from 'react'

const About = () => {
  return (
    <div className='align-element m-h'>
      <div className='font-sans bg-gray-50 text-gray-800'>
        {/* Hero section */}
        <header className='bg-[#74818C] text-white py-20'>
          <div className='container mx-auto px-6 text-center'>
            <h1 className='text-4xl md:text-5xl font-bold mb-4'>
              About Blaze Store
            </h1>
            <p className='text-xl max-w-3xl mx-auto'>
              Your complete shopping solution in one place.
            </p>
          </div>
        </header>

        {/* Main content */}
        <main className='container mx-auto px-6 py-12'>
          <section className='max-w-4xl mx-auto mb-16'>
            <p className='text-lg mb-8'>
              At Blaze Store, we believe shopping should be simple,
              comprehensive, and enjoyable. Founded in 2024, we set out to
              create the ultimate one-stop shopping destination where customers
              can find everything they need in a single, seamless experience.
            </p>

            <h2 className='text-3xl font-bold text-indigo-700 mb-6'>
              Our Mission
            </h2>
            <p className='text-lg mb-12'>
              We're on a mission to simplify your shopping journey by bringing
              together an extensive collection of products across all
              categories. From everyday essentials to specialty items, our
              carefully curated marketplace delivers quality, convenience, and
              value all in one place.
            </p>

            <h2 className='text-3xl font-bold text-indigo-700 mb-6'>
              What Sets Us Apart
            </h2>
            <div className='grid md:grid-cols-2 gap-8 mb-12'>
              <div className='bg-white p-6 rounded-lg shadow-md'>
                <h3 className='text-xl font-semibold mb-3 text-indigo-600'>
                  Endless Selection
                </h3>
                <p>
                  Browse through thousands of products spanning electronics,
                  home goods, fashion, beauty, fitness, and beyond—all
                  meticulously selected to meet our quality standards.
                </p>
              </div>
              <div className='bg-white p-6 rounded-lg shadow-md'>
                <h3 className='text-xl font-semibold mb-3 text-indigo-600'>
                  Seamless Experience
                </h3>
                <p>
                  Our intuitive platform makes finding exactly what you need
                  effortless, whether you're shopping from your desktop or
                  mobile device.
                </p>
              </div>
              <div className='bg-white p-6 rounded-lg shadow-md'>
                <h3 className='text-xl font-semibold mb-3 text-indigo-600'>
                  Customer-First Approach
                </h3>
                <p>
                  Your satisfaction drives everything we do. Our dedicated
                  support team is always ready to assist, and our hassle-free
                  return policy ensures shopping with confidence.
                </p>
              </div>
              <div className='bg-white p-6 rounded-lg shadow-md'>
                <h3 className='text-xl font-semibold mb-3 text-indigo-600'>
                  Competitive Pricing
                </h3>
                <p>
                  We work directly with manufacturers and suppliers to offer
                  fair prices without compromising on quality.
                </p>
              </div>
            </div>

            <h2 className='text-3xl font-bold text-indigo-700 mb-6'>
              Our Values
            </h2>
            <ul className='list-disc pl-6 mb-12 space-y-3'>
              <li className='text-lg'>
                <span className='font-medium text-indigo-600'>
                  Convenience:
                </span>{' '}
                Making your life easier through streamlined shopping
              </li>
              <li className='text-lg'>
                <span className='font-medium text-indigo-600'>Quality:</span>{' '}
                Curating products that meet our high standards
              </li>
              <li className='text-lg'>
                <span className='font-medium text-indigo-600'>
                  Transparency:
                </span>{' '}
                Being honest about our products, pricing, and policies
              </li>
              <li className='text-lg'>
                <span className='font-medium text-indigo-600'>Innovation:</span>{' '}
                Continuously improving our platform and offerings
              </li>
              <li className='text-lg'>
                <span className='font-medium text-indigo-600'>
                  Sustainability:
                </span>{' '}
                Committing to environmentally responsible practices
              </li>
            </ul>

            <h2 className='text-3xl font-bold text-indigo-700 mb-6'>
              Join Our Community
            </h2>
            <p className='text-lg mb-4'>
              When you shop with Blaze Store, you become part of a growing
              community of savvy shoppers who value quality, convenience, and
              excellent service. We're more than just a marketplace—we're your
              partner in finding everything you need.
            </p>
            <p className='text-lg font-medium'>
              Thank you for choosing Blaze Store. We look forward to being your
              complete shopping solution.
            </p>
          </section>
        </main>
      </div>
    </div>
  )
}

export default About
