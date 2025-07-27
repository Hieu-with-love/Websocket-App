import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const Authenticate = () => {
  const navigate = useNavigate();
  const [token, setToken] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<boolean>(false);

  useEffect(() => {
    const authenticateUser = async () => {
      try {
        console.log(window.location.href);

        const code = new URLSearchParams(window.location.search).get("code");

        if (!code) {
          setError("Không tìm thấy mã xác thực. Vui lòng thử lại.");
          setLoading(false);
          return;
        }

        console.log(code);

        const response = await fetch(
          `http://localhost:8888/api/v1/identity/auth/outbound/authenticate?code=${code}`,
          { method: "POST" }
        );

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        console.log(data);

        if (data.result?.token) {
          setToken(data.result.token);
          setSuccess(true);

          // Lưu token vào localStorage
          localStorage.setItem("jwt", data.result.token);

          // Log token for debugging (remove in production)
          console.log("Authentication successful, token:", data.result.token);

          toast.success("Đăng nhập thành công!");
          // Redirect to home page after 2 seconds
          setTimeout(() => {
            navigate("/");
          }, 2000);
        } else {
          throw new Error("Không nhận được token từ server");
        }
      } catch (err) {
        toast.error("Đăng nhập thất bại. Vui lòng thử lại.");
        setError(
          err instanceof Error ? err.message : "Đã xảy ra lỗi không xác định"
        );
      } finally {
        setLoading(false);
      }
    };

    authenticateUser();
  }, []);

  // Loading spinner component
  const LoadingSpinner = () => (
    <div className="flex items-center justify-center">
      <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
    </div>
  );

  // Success animation component
  const SuccessIcon = () => (
    <div className="flex items-center justify-center">
      <div className="rounded-full bg-green-100 p-3 animate-bounce">
        <svg
          className="h-8 w-8 text-green-600"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M5 13l4 4L19 7"
          />
        </svg>
      </div>
    </div>
  );

  // Error icon component
  const ErrorIcon = () => (
    <div className="flex items-center justify-center">
      <div className="rounded-full bg-red-100 p-3">
        <svg
          className="h-8 w-8 text-red-600"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M6 18L18 6M6 6l12 12"
          />
        </svg>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 via-white to-green-50">
      <div className="max-w-md w-full mx-4">
        <div className="bg-white rounded-2xl shadow-xl p-8 border border-gray-100">
          {/* Header */}
          <div className="text-center mb-8">
            <img
              className="mx-auto h-12 w-auto mb-4"
              src="/chat.svg"
              alt="ChatApp"
            />
            <h2 className="text-2xl font-bold text-gray-900">Đang xác thực</h2>
            <p className="mt-2 text-sm text-gray-600">
              Vui lòng đợi trong giây lát...
            </p>
          </div>

          {/* Content */}
          <div className="space-y-6">
            {loading && (
              <div className="text-center space-y-4">
                <LoadingSpinner />
                <div className="space-y-2">
                  <p className="text-gray-700 font-medium">
                    Đang xử lý thông tin đăng nhập...
                  </p>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div
                      className="bg-blue-600 h-2 rounded-full animate-pulse"
                      style={{ width: "70%" }}
                    ></div>
                  </div>
                </div>
              </div>
            )}

            {success && !loading && (
              <div className="text-center space-y-4 opacity-0 animate-fade-in">
                <SuccessIcon />
                <div className="space-y-2">
                  <p className="text-green-700 font-semibold text-lg">
                    Đăng nhập thành công!
                  </p>
                  <p className="text-gray-600">
                    Đang chuyển hướng đến trang chủ...
                  </p>
                  {token && (
                    <p className="text-xs text-gray-500 font-mono bg-gray-50 p-2 rounded">
                      Token: {token.substring(0, 20)}...
                    </p>
                  )}
                  <div className="w-full bg-green-200 rounded-full h-2">
                    <div
                      className="bg-green-600 h-2 rounded-full animate-pulse"
                      style={{ width: "100%" }}
                    ></div>
                  </div>
                </div>
              </div>
            )}

            {error && !loading && (
              <div className="text-center space-y-4 opacity-0 animate-fade-in">
                <ErrorIcon />
                <div className="space-y-4">
                  <div>
                    <p className="text-red-700 font-semibold text-lg">
                      Đăng nhập thất bại
                    </p>
                    <p className="text-gray-600 mt-2">{error}</p>
                  </div>
                  <div className="space-y-3">
                    <button
                      onClick={() => navigate("/login")}
                      className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-2.5 px-4 rounded-lg transition-colors duration-200 transform hover:scale-105"
                    >
                      Quay lại đăng nhập
                    </button>
                    <button
                      onClick={() => window.location.reload()}
                      className="w-full bg-gray-100 hover:bg-gray-200 text-gray-700 font-medium py-2.5 px-4 rounded-lg transition-colors duration-200 transform hover:scale-105"
                    >
                      Thử lại
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Footer */}
          <div className="mt-8 text-center">
            <p className="text-xs text-gray-500">
              Được bảo mật bởi Google OAuth 2.0
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Authenticate;
