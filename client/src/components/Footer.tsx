import React from "react";

const Footer: React.FC = () => {
  return (
    <footer className="bg-black text-white py-12 mt-20">
      <div className="max-w-7xl mx-auto px-6 text-center text-sm">
        © {new Date().getFullYear()} PROTASK. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
