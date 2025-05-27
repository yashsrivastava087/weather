const Footer = () => {
  return (
    <footer className="bg-black w-full mt-20 py-12 px-4 border-t border-gray-800">
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <h4 className="font-semibold text-gray-300 mb-4">WeatherApp</h4>
            <p className="text-sm text-gray-400">
              best weather app for global live weather updates.
            </p>
          </div>
          
          <div>
            <h4 className="font-semibold text-gray-300 mb-4">Contact</h4>
            <ul className="space-y-2">
              <li><a href="#" className="text-sm text-gray-400 hover:text-blue-400 transition-colors">Contact Us</a></li>
              <li><a href="#" className="text-sm text-gray-400 hover:text-blue-400 transition-colors">Support</a></li>
              <li><span className="text-sm text-gray-400">Email: support@weatherapp.com</span></li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold text-gray-300 mb-4">Legal</h4>
            <ul className="space-y-2">
              <li><a href="#" className="text-sm text-gray-400 hover:text-blue-400 transition-colors">Terms of Service</a></li>
              <li><a href="#" className="text-sm text-gray-400 hover:text-blue-400 transition-colors">Privacy Policy</a></li>
              <li><a href="#" className="text-sm text-gray-400 hover:text-blue-400 transition-colors">Cookie Policy</a></li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold text-gray-300 mb-4">Resources</h4>
            <ul className="space-y-2">
              <li><a href="#" className="text-sm text-gray-400 hover:text-blue-400 transition-colors">Help?</a></li>
              <li><a href="#" className="text-sm text-gray-400 hover:text-blue-400 transition-colors">FAQ</a></li>
              <li><a href="#" className="text-sm text-gray-400 hover:text-blue-400 transition-colors">Developer Tools</a></li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-8 pt-6 text-center">
          <p className="text-sm text-gray-400">
            © {new Date().getFullYear()} WeatherApp. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};
export default Footer;