import { Facebook, Twitter, Linkedin, Mail, Phone } from 'lucide-react';

function UserDashboardFooter() {
  return (
    <footer className="bg-white text-black px-4 py-6">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-6">
        {/* Company Info */}
        <div>
          <h3 className="text-lg font-bold mb-2">Insurance Hub</h3>
          <p className="text-sm text-gray-600">
            Secure your future with our reliable and affordable insurance policies.
          </p>
        </div>

        {/* Quick Links */}
        <div>
          <h4 className="text-md font-semibold mb-2">Quick Links</h4>
          <ul className="space-y-1 text-sm text-gray-600">
            <li><a href="/about" className="hover:text-blue-500">About Us</a></li>
            <li><a href="/policies" className="hover:text-blue-500">Policies</a></li>
            <li><a href="/claims" className="hover:text-blue-500">File a Claim</a></li>
            <li><a href="/contact" className="hover:text-blue-500">Contact</a></li>
          </ul>
        </div>

        {/* Contact Info */}
        <div>
          <h4 className="text-md font-semibold mb-2">Contact</h4>
          <ul className="space-y-1 text-sm text-gray-600">
            <li className="flex items-center gap-2"><Mail size={16} /> support@insurancehub.com</li>
            <li className="flex items-center gap-2"><Phone size={16} /> +91-9876543210</li>
            <li>Mon – Fri: 9:00 AM – 6:00 PM</li>
          </ul>
        </div>

        {/* Social Media */}
        <div>
          <h4 className="text-md font-semibold mb-2">Follow Us</h4>
          <div className="flex space-x-3">
            <a href="#" className="hover:text-blue-500"><Facebook /></a>
            <a href="#" className="hover:text-blue-500"><Twitter /></a>
            <a href="#" className="hover:text-blue-500"><Linkedin /></a>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-gray-300 mt-4 pt-4 text-center text-xs text-gray-500">
        © {new Date().getFullYear()} Insurance Hub. All rights reserved.
      </div>
    </footer>
  );
}

export default UserDashboardFooter;