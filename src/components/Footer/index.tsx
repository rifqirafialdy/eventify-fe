export default function Footer() {
  return (
    <footer className="bg-[#2B293D] text-white px-6 py-12">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-5 gap-8">
        {/* Company Info */}
        <div>
          <h3 className="text-xl font-semibold mb-4">Company Info</h3>
          <ul className="text-sm space-y-2 text-gray-400">
            <li><a href="#">About Us</a></li>
            <li><a href="#">Contact Us</a></li>
            <li><a href="#">Careers</a></li>
            <li><a href="#">FAQs</a></li>
            <li><a href="#">Terms of Service</a></li>
            <li><a href="#">Privacy Policy</a></li>
          </ul>
        </div>

        {/* Help */}
        <div>
          <h3 className="text-xl font-semibold mb-4">Help</h3>
          <ul className="text-sm space-y-2 text-gray-400">
            <li><a href="#">Account Support</a></li>
            <li><a href="#">Listing Events</a></li>
            <li><a href="#">Event Ticketing</a></li>
            <li><a href="#">Ticket Purchase Terms</a></li>
          </ul>
        </div>

        {/* Categories */}
        <div>
          <h3 className="text-xl font-semibold mb-4">Categories</h3>
          <ul className="text-sm space-y-2 text-gray-400">
            <li><a href="#">Concerts & Gigs</a></li>
            <li><a href="#">Festivals & Lifestyle</a></li>
            <li><a href="#">Business & Networking</a></li>
            <li><a href="#">Food & Drinks</a></li>
            <li><a href="#">Performing Arts</a></li>
            <li><a href="#">Sports & Outdoors</a></li>
            <li><a href="#">Exhibitions</a></li>
            <li><a href="#">Workshops & Classes</a></li>
          </ul>
        </div>

        {/* Follow Us */}
        <div>
          <h3 className="text-xl font-semibold mb-4">Follow Us</h3>
          <ul className="text-sm space-y-2 text-gray-400">
            <li><a href="#">Facebook</a></li>
            <li><a href="#">Instagram</a></li>
            <li><a href="#">Twitter</a></li>
            <li><a href="#">YouTube</a></li>
          </ul>
        </div>

        {/* Download the App */}
        <div>
          <h3 className="text-xl font-semibold mb-4">Download The App</h3>
          <div className="space-y-4">
            <a href="#" className="flex items-center space-x-3 border border-gray-600 rounded-lg p-2">
              <img src="/img/icon-google.png" alt="Google Play" className="w-6 h-6" />
              <div>
                <p className="text-xs">Get it on</p>
                <p className="text-base font-medium">Google Play</p>
              </div>
            </a>
            <a href="#" className="flex items-center space-x-3 border border-gray-600 rounded-lg p-2">
              <img src="/img/icon-apple.png" alt="App Store" className="w-6 h-6" />
              <div>
                <p className="text-xs">Download on the</p>
                <p className="text-base font-medium">App Store</p>
              </div>
            </a>
          </div>
        </div>
      </div>

      <div className="mt-10 border-t border-gray-700 pt-6 text-center text-sm text-gray-500">
        © 2025 Eventify. All rights reserved.
      </div>
    </footer>
  );
}
