import { genPageMetadata } from 'app/seo'
import ContactForm from './ContactForm'

export const metadata = genPageMetadata({
  title: 'Contact',
  description: 'Hubungi kami untuk pertanyaan dan kerja sama',
})

export default function ContactPage() {
  return (
    <div className="divide-y divide-gray-200 dark:divide-gray-700">
      <div className="space-y-2 pt-6 pb-8 md:space-y-5">
        <h1 className="text-3xl leading-9 font-extrabold tracking-tight text-gray-900 sm:text-4xl sm:leading-10 md:text-6xl md:leading-14 dark:text-gray-100">
          Contact
        </h1>
      </div>
      <div className="container py-12">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
          {/* Contact Information */}
          <div className="space-y-6">
            <div>
              <h2 className="mb-4 text-2xl font-bold text-gray-900 dark:text-gray-100">
                Ada pertanyaan, masukan, atau ingin bekerja sama?
              </h2>
              <p className="mb-6 text-gray-600 dark:text-gray-400">
                Tim Shopperqueries siap mendengarkan dan memberikan solusi terbaik untuk kebutuhan
                Anda. Jangan ragu untuk mengisi formulir kontak, mengirim email, atau menghubungi
                kami langsung melalui telepon.
              </p>
            </div>

            <div className="space-y-4">
              <div className="flex items-start space-x-3">
                <svg
                  className="mt-0.5 h-5 w-5 text-gray-500 dark:text-gray-400"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                  />
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                  />
                </svg>
                <div>
                  <p className="text-gray-600 dark:text-gray-400">West Sumatera, Indonesia</p>
                </div>
              </div>
              <div className="flex items-start space-x-3">
                <svg
                  className="mt-0.5 h-5 w-5 text-gray-500 dark:text-gray-400"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                  />
                </svg>
                <div>
                  <p className="text-gray-600 dark:text-gray-400">milanistie13@gmail.com</p>
                </div>
              </div>
              <div className="flex items-start space-x-3">
                <svg
                  className="mt-0.5 h-5 w-5 text-gray-500 dark:text-gray-400"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                  />
                </svg>
                <div>
                  <p className="text-gray-600 dark:text-gray-400">085321444412</p>
                </div>
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <ContactForm />
        </div>
      </div>
    </div>
  )
}
