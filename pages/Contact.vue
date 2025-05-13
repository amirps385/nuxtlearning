<template>
  <section class="px-6 md:px-12 lg:px-34 py-26 bg-white">
    <div class="grid grid-cols-1 lg:grid-cols-2 gap-12">
      <!-- Left Column: Heading and Paragraph -->
      <div>
        <p class="text-green-600 font-semibold mb-2">How can help you ?</p>
        <h2 class="text-4xl md:text-5xl font-extrabold text-gray-800 leading-tight mb-6">
          Let us know how<br />
          we can help you
        </h2>
        <p class="text-gray-600 mb-4">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut elit tellus, luctus nec ullamcorper mattis, pulvinar dapibus leo.
        </p>
        <p class="text-gray-600">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut elit tellus, luctus nec ullamcorper mattis, pulvinar dapibus leo.
        </p>
      </div>

      <!-- Right Column: Help Topics -->
      <div class="grid grid-cols-1 sm:grid-cols-2 gap-8 text-sm">
        <div>
          <h4 class="font-bold text-lg mb-1">01. Visit Feedback</h4>
          <p class="text-gray-600">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut elit tellus, luctus nec ullamcorper mattis, pulvinar dapibus leo.
          </p>
        </div>
        <div>
          <h4 class="font-bold text-lg mb-1">02. Employer Services</h4>
          <p class="text-gray-600">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut elit tellus, luctus nec ullamcorper mattis, pulvinar dapibus leo.
          </p>
        </div>
        <div>
          <h4 class="font-bold text-lg text-green-600 mb-1">03. Billing Inquiries</h4>
          <p class="text-gray-600">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut elit tellus, luctus nec ullamcorper mattis, pulvinar dapibus leo.
          </p>
        </div>
        <div>
          <h4 class="font-bold text-lg mb-1">04. General Inquiries</h4>
          <p class="text-gray-600">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut elit tellus, luctus nec ullamcorper mattis, pulvinar dapibus leo.
          </p>
        </div>
      </div>
    </div>
  </section>



    <section class="px-6 md:px-12 lg:px-24 py-16 bg-white">
  <!-- Office / Studio / Shop Info -->
  <div class="grid grid-cols-1 md:grid-cols-3 gap-8 text-center mb-16">
    <div>
      <h3 class="text-green-600 text-xl font-bold mb-2">Office</h3>
      <p>205 North Michigan Avenue, Suite 810<br />Chicago, 60601, USA</p>
      <p><a href="tel:1234567890" class="text-green-600 underline">Phone: (123) 456-7890</a></p>
      <p><a href="mailto:contact@evara.com" class="text-green-600 underline">Email: contact@Evara.com</a></p>
      <button class="mt-4 px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700">View map</button>
    </div>

    <div>
      <h3 class="text-green-600 text-xl font-bold mb-2">Studio</h3>
      <p>205 North Michigan Avenue, Suite 810<br />Chicago, 60601, USA</p>
      <p><a href="tel:1234567890" class="text-green-600 underline">Phone: (123) 456-7890</a></p>
      <p><a href="mailto:contact@evara.com" class="text-green-600 underline">Email: contact@Evara.com</a></p>
      <button class="mt-4 px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700">View map</button>
    </div>

    <div>
      <h3 class="text-green-600 text-xl font-bold mb-2">Shop</h3>
      <p>205 North Michigan Avenue, Suite 810<br />Chicago, 60601, USA</p>
      <p><a href="tel:1234567890" class="text-green-600 underline">Phone: (123) 456-7890</a></p>
      <p><a href="mailto:contact@evara.com" class="text-green-600 underline">Email: contact@Evara.com</a></p>
      <button class="mt-4 px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700">View map</button>
    </div>
  </div>

  <!-- Contact Form -->
  <div class="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
    <!-- Form -->
    <div>
      <p class="text-green-600 font-semibold mb-2">Contact form</p>
      <h2 class="text-3xl font-extrabold text-gray-800 mb-4">Drop Us a Line</h2>
      <p class="text-gray-500 mb-6">Your email address will not be published. Required fields are marked *</p>

      <form class="space-y-4">
        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
          <input type="text" placeholder="First Name" class="border p-3 rounded w-full" />
          <input type="email" placeholder="Your Email" class="border p-3 rounded w-full" />
        </div>
        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
          <input type="text" placeholder="Your Phone" class="border p-3 rounded w-full" />
          <input type="text" placeholder="Subject" class="border p-3 rounded w-full" />
        </div>
        <textarea rows="5" placeholder="Message" class="border p-3 rounded w-full"></textarea>
        <button type="submit" class="bg-gray-800 text-white px-6 py-2 rounded hover:bg-gray-900">Send message</button>
      </form>
    </div>

    <!-- Image -->
    <div class="lg:block hidden">
      <img src="/public/img/about/g3.png" alt="Contact" class="rounded-lg max-w-[250px] object-cover shadow-md h-90 sm:invisible md:visible" />
    </div>
  </div>
</section>

</template>