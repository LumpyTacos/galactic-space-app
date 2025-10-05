import { Disclosure, DisclosureButton, DisclosurePanel } from '@headlessui/react'
import { MagnifyingGlassIcon } from '@heroicons/react/20/solid'
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline'

export default function Header() {
  return (
    <Disclosure
      as="nav"
      className="relative bg-white/95 shadow-sm after:pointer-events-none after:absolute after:inset-x-0 after:bottom-0 after:h-px after:bg-gray-200"
    >
      <div className="w-full px-2 sm:px-4 lg:px-8">
        <div className="relative flex h-16 items-center justify-between">
          <div className="flex items-center px-2 lg:px-0">
            <div className="shrink-0">
              <img
                alt="Your Company"
                src="https://tailwindcss.com/plus-assets/img/logos/mark.svg?color=indigo&shade=500"
                className="h-8 w-auto"
              />
            </div>
            <div className="hidden lg:ml-6 lg:block">
              <div className="bg-gray-100 rounded-xl p-1 flex space-x-1">
                <a href="#" className="rounded-lg bg-white px-4 py-2 text-sm font-medium text-gray-900 shadow-sm">
                  Main Dashboard
                </a>
                <a
                  href="#"
                  className="rounded-lg px-4 py-2 text-sm font-medium text-gray-600 hover:text-gray-900 hover:bg-white/50"
                >
                  Publication Explorer
                </a>
                <a
                  href="#"
                  className="rounded-lg px-4 py-2 text-sm font-medium text-gray-600 hover:text-gray-900 hover:bg-white/50"
                >
                  Physiology Hub
                </a>
                <a
                  href="#"
                  className="rounded-lg px-4 py-2 text-sm font-medium text-gray-600 hover:text-gray-900 hover:bg-white/50"
                >
                  Astro-Botany
                </a>
              </div>
            </div>
          </div>
          <div className="flex flex-1 justify-center px-2 lg:ml-6 lg:justify-end">
            <div className="grid w-full max-w-lg grid-cols-1 lg:max-w-xs">
              <input
                name="search"
                placeholder="Search"
                aria-label="Search"
                className="col-start-1 row-start-1 block w-full rounded-md bg-gray-100 py-1.5 pr-3 pl-10 text-base text-gray-900 outline -outline-offset-1 outline-gray-300 placeholder:text-gray-500 focus:text-gray-900 focus:outline-2 focus:outline-blue-500 sm:text-sm/6"
              />
              <MagnifyingGlassIcon
                aria-hidden="true"
                className="pointer-events-none col-start-1 row-start-1 ml-3 size-5 self-center text-gray-500"
              />
            </div>
          </div>
          <div className="flex lg:hidden">
            {/* Mobile menu button */}
            <DisclosureButton className="group relative inline-flex items-center justify-center rounded-md p-2 text-gray-600 hover:bg-gray-100 hover:text-gray-900 focus:outline-2 focus:outline-blue-500">
              <span className="absolute -inset-0.5" />
              <span className="sr-only">Open main menu</span>
              <Bars3Icon aria-hidden="true" className="block size-6 group-data-open:hidden" />
              <XMarkIcon aria-hidden="true" className="hidden size-6 group-data-open:block" />
            </DisclosureButton>
          </div>

        </div>
      </div>

      <DisclosurePanel className="lg:hidden">
        <div className="space-y-1 px-2 pt-2 pb-3">
          <DisclosureButton
            as="a"
            href="#"
            className="block rounded-md bg-blue-100 px-3 py-2 text-base font-medium text-blue-700"
          >
            Main Dashboard
          </DisclosureButton>
          <DisclosureButton
            as="a"
            href="#"
            className="block rounded-md px-3 py-2 text-base font-medium text-gray-700 hover:bg-gray-100 hover:text-gray-900"
          >
            Publication Explorer
          </DisclosureButton>
          <DisclosureButton
            as="a"
            href="#"
            className="block rounded-md px-3 py-2 text-base font-medium text-gray-700 hover:bg-gray-100 hover:text-gray-900"
          >
            Physiology Hub
          </DisclosureButton>
          <DisclosureButton
            as="a"
            href="#"
            className="block rounded-md px-3 py-2 text-base font-medium text-gray-700 hover:bg-gray-100 hover:text-gray-900"
          >
            Astro-Botany
          </DisclosureButton>
        </div>
      </DisclosurePanel>
    </Disclosure>
  )
}
