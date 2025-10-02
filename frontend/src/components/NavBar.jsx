import { Disclosure, Menu } from "@headlessui/react";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";
import { Link, useLocation, useNavigate } from "react-router-dom"; // Import useLocation and useNavigate

const navigation = [
  { name: "Home", href: "/home" },
  { name: "Appointments", href: "/appointments" },
  { name: "Transaction History", href: "/user-payments" },
];

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

export default function NavBar() {
  const navigate = useNavigate();
  const location = useLocation(); // Get the current route

  const handleLogout = () => {
    localStorage.removeItem("token"); // Remove token from storage
    window.location.href = "/login";
  };

  const handleProfileClick = () => {
    navigate("/profile");
  };

  return (
    <Disclosure as="nav" className="fixed top-0 z-50 w-full border-b border-white/10 bg-slate-900/80 backdrop-blur supports-[backdrop-filter]:bg-slate-900/60 shadow-md">
      {({ open }) => (
        <>
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="relative flex h-16 items-center justify-between">
              <div className="flex flex-1 items-center justify-between sm:items-stretch sm:justify-between">
                <div className="flex items-center">
                  <Link to="/home" className="flex items-center focus:outline-none focus-visible:ring-2 focus-visible:ring-white/60 rounded-md">
                    <img
                      src="/assets/logo.jpeg"
                      alt="HealLink logo"
                      className="h-9 w-9 rounded-md object-cover shadow-sm ring-1 ring-white/10 hover:ring-white/30 transition"
                    />
                    <span className="ml-2 hidden sm:block text-white font-semibold tracking-wide">HealLink</span>
                  </Link>
                </div>

                <div className="hidden sm:flex sm:items-center sm:justify-center flex-1">
                  <div className="flex items-center justify-center gap-1">
                    {navigation.map((item) => (
                      <Link
                        key={item.name}
                        to={item.href}
                        className={classNames(
                          location.pathname === item.href
                            ? "text-white bg-white/10"
                            : "text-white/80 hover:text-white hover:bg-white/10",
                          "rounded-md px-3 py-2 text-sm font-medium transition-colors"
                        )}
                      >
                        {item.name}
                      </Link>
                    ))}
                  </div>
                </div>
              </div>

              <div className="flex items-center sm:hidden">
                {/* Mobile menu button */}
                <Disclosure.Button className="inline-flex items-center justify-center rounded-md p-2 text-white/80 hover:bg-white/10 hover:text-white focus:outline-none focus-visible:ring-2 focus-visible:ring-white/60">
                  <span className="sr-only">Toggle main menu</span>
                  {open ? (
                    <XMarkIcon className="block h-7 w-7" aria-hidden="true" />
                  ) : (
                    <Bars3Icon className="block h-7 w-7" aria-hidden="true" />
                  )}
                </Disclosure.Button>
              </div>

              <div className="hidden sm:flex sm:items-center sm:space-x-2">
                {/* Profile dropdown */}
                <Menu as="div" className="relative">
                  <div>
                    <Menu.Button aria-label="Open user menu" className="flex rounded-full bg-white/5 p-1 text-sm focus:outline-none focus-visible:ring-2 focus-visible:ring-white/60 ring-1 ring-white/10 hover:ring-white/30 transition">
                      <span className="sr-only">Open user menu</span>
                      <img
                        className="h-8 w-8 rounded-full object-cover"
                        src="https://i.pinimg.com/originals/c4/b7/5f/c4b75fb439096e44deb4d1e98480fa31.jpg"
                        alt="User avatar"
                      />
                    </Menu.Button>
                  </div>
                  <Menu.Items className="absolute right-0 z-10 mt-2 w-52 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black/10 focus:outline-none">
                    <Menu.Item>
                      {({ active }) => (
                        <Link
                          to="/profile"
                          className={classNames(
                            active ? "bg-gray-100" : "",
                            "block px-4 py-2 text-sm text-gray-700"
                          )}
                        >
                          Your Profile
                        </Link>
                      )}
                    </Menu.Item>
                    <Menu.Item>
                      {({ active }) => (
                        <button
                          type="button"
                          className={classNames(
                            active ? "bg-gray-100" : "",
                            "block w-full text-left px-4 py-2 text-sm text-gray-700"
                          )}
                        >
                          Settings
                        </button>
                      )}
                    </Menu.Item>
                    <Menu.Item>
                      {({ active }) => (
                        <button
                          type="button"
                          onClick={handleLogout}
                          className={classNames(
                            active ? "bg-gray-100" : "",
                            "block w-full text-left px-4 py-2 text-sm text-gray-700"
                          )}
                        >
                          Sign out
                        </button>
                      )}
                    </Menu.Item>
                  </Menu.Items>
                </Menu>
              </div>
            </div>
          </div>

          <Disclosure.Panel className="sm:hidden">
            <div className="space-y-1 px-2 pb-3 pt-2">
              {navigation.map((item) => (
                <Disclosure.Button
                  key={item.name}
                  as={Link}
                  to={item.href}
                  className={classNames(
                    location.pathname === item.href
                      ? "bg-white/10 text-white"
                      : "text-white/80 hover:bg-white/10 hover:text-white",
                    "block rounded-md px-3 py-2 text-base font-medium"
                  )}
                >
                  {item.name}
                </Disclosure.Button>
              ))}

              {/* Mobile Profile Options */}
              <div className="pt-4 pb-3 border-t border-white/10">
                <div className="space-y-1">
                  <Disclosure.Button
                    as={Link}
                    to="/profile"
                    className="block px-4 py-2 text-base font-medium text-white/80 hover:bg-white/10 hover:text-white rounded-md"
                  >
                    Your Profile
                  </Disclosure.Button>
                  <Disclosure.Button
                    as="button"
                    className="block w-full text-left px-4 py-2 text-base font-medium text-white/80 hover:bg-white/10 hover:text-white rounded-md"
                  >
                    Settings
                  </Disclosure.Button>
                  <Disclosure.Button
                    as="button"
                    onClick={handleLogout}
                    className="block w-full text-left px-4 py-2 text-base font-medium text-white/80 hover:bg-white/10 hover:text-white rounded-md"
                  >
                    Sign out
                  </Disclosure.Button>
                </div>
              </div>
            </div>
          </Disclosure.Panel>
        </>
      )}
    </Disclosure>
  );
}
