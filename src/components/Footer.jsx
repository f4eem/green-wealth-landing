import React from 'react';

function Footer() {
  return (
    <footer className="bg-gray-900 text-white py-12 px-4">
      <div className="max-w-7xl mx-auto grid md:grid-cols-4 gap-8">
        <div>
          <div className="text-2xl font-bold mb-4">Green Wealth</div>
          <p className="text-gray-400">Clinically proven hair growth from within.</p>
        </div>
        <div>
          <h4 className="font-semibold mb-4">Products</h4>
          <div className="space-y-2 text-gray-400">
            <div>Women</div>
            <div>Men</div>
            <div>Postpartum</div>
            <div>Plant-Based</div>
          </div>
        </div>
        <div>
          <h4 className="font-semibold mb-4">Company</h4>
          <div className="space-y-2 text-gray-400">
            <div>About Us</div>
            <div>Science</div>
            <div>Reviews</div>
            <div>Contact</div>
          </div>
        </div>
        <div>
          <h4 className="font-semibold mb-4">Support</h4>
          <div className="space-y-2 text-gray-400">
            <div>FAQ</div>
            <div>Shipping</div>
            <div>Returns</div>
            <div>Privacy Policy</div>
          </div>
        </div>
      </div>
      <div className="max-w-7xl mx-auto mt-12 pt-8 border-t border-gray-800 text-center text-gray-400">
        <p>© 2025 Green Wealth. All rights reserved.</p>
      </div>
    </footer>
  );
}

export default Footer;