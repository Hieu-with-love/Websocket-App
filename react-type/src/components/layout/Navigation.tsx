import React, { useState } from "react";

interface NavigationProps {
  className?: string;
}

const Navigation: React.FC<NavigationProps> = ({ className = "" }) => {
  const [showDropdown, setShowDropdown] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);

  return (
    <nav
      className={`nav-area border-b border-slate-700 shadow-lg ${className}`}
    >
      <div className="max-w-full mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          {/* Logo và Brand */}
          <div className="flex items-center">
            <div className="flex-shrink-0 flex items-center">
              <img className="h-8 w-8" src="/chat.svg" alt="ChatApp" />
              <span className="ml-2 text-xl font-bold text-white">ChatApp</span>
            </div>
          </div>

          {/* Search Bar */}
          <div className="flex-1 flex items-center justify-center px-2 lg:ml-6 lg:justify-start max-w-lg">
            <div className="w-full">
              <label htmlFor="search" className="sr-only">
                Tìm kiếm
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <svg
                    className="h-5 w-5 text-slate-400"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                    />
                  </svg>
                </div>
                <input
                  id="search"
                  name="search"
                  className="block w-full pl-10 pr-3 py-2 border border-slate-600 rounded-md leading-5 bg-slate-700 text-white placeholder-slate-400 focus:outline-none focus:placeholder-slate-300 focus:ring-1 focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                  placeholder="Tìm kiếm tin nhắn, người dùng..."
                  type="search"
                />
              </div>
            </div>
          </div>

          {/* Right side items */}
          <div className="flex items-center space-x-4">
            {/* Notifications */}
            <div className="relative">
              <button
                onClick={() => setShowNotifications(!showNotifications)}
                className="p-2 text-slate-300 hover:text-white hover:bg-slate-600 rounded-full transition-colors duration-200"
              >
                <span className="sr-only">Thông báo</span>
                <svg
                  className="h-6 w-6"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M15 17h5l-5 5v-5zM12 2C9.239 2 7 4.239 7 7v8l-2 2v1h14v-1l-2-2V7c0-2.761-2.239-5-5-5z"
                  />
                </svg>
                {/* Notification badge */}
                <span className="absolute top-0 right-0 block h-3 w-3 rounded-full bg-red-500 ring-2 ring-white"></span>
              </button>

              {/* Notifications Dropdown */}
              {showNotifications && (
                <div className="absolute right-0 mt-2 w-80 bg-white rounded-md shadow-lg py-1 z-50 border border-blue-200">
                  <div className="px-4 py-3 border-b border-blue-100 bg-blue-50">
                    <h3 className="text-sm font-medium text-blue-900">
                      Thông báo
                    </h3>
                  </div>
                  <div className="max-h-96 overflow-y-auto">
                    <div className="px-4 py-3 hover:bg-blue-50 cursor-pointer border-l-4 border-transparent hover:border-blue-500">
                      <p className="text-sm text-gray-900">
                        Tin nhắn mới từ John Doe
                      </p>
                      <p className="text-xs text-blue-500">2 phút trước</p>
                    </div>
                    <div className="px-4 py-3 hover:bg-blue-50 cursor-pointer border-l-4 border-transparent hover:border-blue-500">
                      <p className="text-sm text-gray-900">
                        Jane Smith đã tham gia nhóm
                      </p>
                      <p className="text-xs text-blue-500">5 phút trước</p>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Profile dropdown */}
            <div className="relative">
              <button
                onClick={() => setShowDropdown(!showDropdown)}
                className="flex items-center space-x-3 text-sm rounded-full focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 hover:bg-slate-600 px-2 py-1 transition-colors duration-200"
              >
                <img
                  className="h-8 w-8 rounded-full ring-2 ring-slate-600"
                  src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                  alt="Profile"
                />
                <span className="hidden md:block text-white font-medium">
                  Nguyễn Văn A
                </span>
                <svg
                  className="h-4 w-4 text-slate-300"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M19 9l-7 7-7-7"
                  />
                </svg>
              </button>

              {/* Profile Dropdown Menu */}
              {showDropdown && (
                <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-50 border border-blue-200">
                  <a
                    href="#"
                    className="block px-4 py-2 text-sm text-blue-700 hover:bg-blue-50 hover:text-blue-900 transition-colors duration-200"
                  >
                    Hồ sơ của bạn
                  </a>
                  <a
                    href="#"
                    className="block px-4 py-2 text-sm text-blue-700 hover:bg-blue-50 hover:text-blue-900 transition-colors duration-200"
                  >
                    Cài đặt
                  </a>
                  <a
                    href="#"
                    className="block px-4 py-2 text-sm text-blue-700 hover:bg-blue-50 hover:text-blue-900 transition-colors duration-200"
                  >
                    Trợ giúp
                  </a>
                  <div className="border-t border-blue-100"></div>
                  <a
                    href="#"
                    className="block px-4 py-2 text-sm text-red-600 hover:bg-red-50 hover:text-red-800 transition-colors duration-200 font-medium"
                  >
                    Đăng xuất
                  </a>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navigation;
